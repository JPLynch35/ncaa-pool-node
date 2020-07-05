$(document).ready(function() {
  const seasonBudgetCap = convertCurrencyToNumber($('#remaining-budget').text());

  // remove flexbox from div if screen gets too small to support layout
  $(window).resize(function() {
    if ($(this).width() <= 860) {
      $('#calculated-stats').removeClass('d-flex justify-content-between');
    } else {
      $('div[id="calculated-stats"][class=""]').addClass('d-flex justify-content-between');
    };
  });

  const selectedDataTable = $('#selected.data-table').DataTable({
    'paging': false,
    'searching': false,
    'select': true,
    // add hidden team id to table
    'columnDefs': [
      {
        'targets': [ 3 ],
        'visible': false,
        'searchable': false
      }
    ],
    // adds total to bottom of table
    'footerCallback': function () {
      var api = this.api(), data;
      var intVal = function ( i ) {
        return typeof i === 'string' ?
          i.replace(/[\$,]/g, '')*1 :
          typeof i === 'number' ?
            i : 0;
      };
      // Total over all pages
      total = api
        .column( 2 )
        .data()
        .reduce( function (a, b) {
          return intVal(a) + intVal(b);
        }, 0 );
      // Update footer
      $(api.column(2).footer()).html(convertNumberToCurrency(total));
    }
  });

  const availableDataTable = $('#available.data-table').DataTable({
    'dom': '<"pull-left"f><"pull-right"l>tip',
    'paging': false,
    'select': true,
    // add hidden team id to table
    'columnDefs': [
      {
        'targets': [ 3 ],
        'visible': false,
        'searchable': false
      }
    ]
  });

  // remove team row on click and add to opposite table
  $('#selected.data-table').on('click', 'tbody tr', function () {
    if (!$(this).hasClass('disabled')) {
      const data = selectedDataTable.row(this).data();
      availableDataTable.row.add(data).draw(false);
      selectedDataTable.row(this).remove().draw(false);
    };
  });
  $('#available.data-table').on('click', 'tbody tr', function () {
    if (!$(this).hasClass('disabled')) {
      const data = availableDataTable.row(this).data();
      selectedDataTable.row.add(data).draw(false);
      availableDataTable.row(this).remove().draw(false);
    };
  });

  $('.data-table').on('click', 'tbody tr', function () {
    updateRemainingCounter();
    updateRemainingBudget();
    updateAvailableRows();
  });

  function updateRemainingCounter() {
    const selectedRows = selectedDataTable.rows().data().length;
    const updatedValue = 5 - selectedRows;
    $('#remaining-selections-count').text(updatedValue);
  };

  function updateRemainingBudget() {
    const totalSpent = convertCurrencyToNumber(selectedDataTable.column(2).footer().textContent);
    const updatedBudget = seasonBudgetCap - totalSpent;
    $('#remaining-budget').text(convertNumberToCurrency(updatedBudget));
  };

  function updateAvailableRows() {
    counterValue = parseInt($('#remaining-selections-count').text());
    if (counterValue > 0) {
      updateRowsBasedOnBudget();
    } else {
      $('table#available tr.odd, table#available tr.even').addClass('disabled');
    };
  };

  function updateRowsBasedOnBudget() {
    const currentRemainingBudget = convertCurrencyToNumber($('#remaining-budget').text());
    availableDataTable.rows().every(function() {
        const teamData = this.data();
        const teamValue = convertCurrencyToNumber(teamData[2]);
        if (teamValue > currentRemainingBudget) {
          $(this.node()).addClass('disabled');
        } else {
          $(this.node()).removeClass('disabled');
        };
    });
  };

  function convertNumberToCurrency(number) {
    return '$' + Intl.NumberFormat().format(number);
  };

  function convertCurrencyToNumber(currency) {
    const parsedCurrency =  currency.replace(/[^\d\.\-]/g, "");
    return parseInt(parsedCurrency);
  };

  // set table widths to be equal on load
  // function resizeTables(sharedSize) {
  //   // reverse so that first table matches columns of second table
  //   var tableArr = $('table[data-ss='+sharedSize+']');
  //   var reversedTableArry = tableArr.get().reverse();
  //   var cellWidths = new Array();
  //   $(reversedTableArry).each(function() {
  //     for (i = 0; i < $(this)[0].rows[0].cells.length; i++) {
  //       var cell = $(this)[0].rows[0].cells[i];
  //       if(!cellWidths[i] || cellWidths[i] < cell.clientWidth) cellWidths[i] = cell.clientWidth;
  //     };
  //   });
  //   var rowHeight = $(reversedTableArry[0].rows[0]).height();
  //   $(reversedTableArry).each(function() {
  //     for (i = 0; i < $(this)[0].rows[0].cells.length; i++) {
  //       $(this)[0].rows[0].cells[i].style.width = cellWidths[i]+'px';
  //     };
  //     for (i = 0; i < $(this)[0].rows.length; i++) {
  //       $($(this)[0].rows[i]).height(rowHeight);
  //     };
  //   });
  // };
  // resizeTables('1');

  updateRemainingBudget();
  updateAvailableRows();

  $('#entriesSubmit').on('click', function(e){
    e.preventDefault();
    const entryTeamIds = selectedDataTable.column(3).data().toArray();
    const data = {entryTeamIds: entryTeamIds}
    $.ajax({
      url: "selections",
      type: "POST",
      data: data,
      success:function (data){
        window.location.href="/entries";
      },
      error: function() {
        alert('Something went wrong, did not save selections.');
      }
    });
  //   $.post('selections', data).done(function() {
  //     window.location.href="/entries";
  //  });
 });
});
