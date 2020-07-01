$(document).ready(function() {
  // save season budget cap on page load
  const seasonBudgetCap = parseInt($('#remaining-budget').text().substring(1));
  // remove flexbox from div if screen gets too small to support layout
  $(window).resize(function() {
    if ($(this).width() <= 860) {
      $('#calculated-stats').removeClass('d-flex justify-content-between');
    } else {
      $('div[id="calculated-stats"][class=""]').addClass('d-flex justify-content-between');
    };
  });

  const selected = $('#selected.data-table').DataTable({
    'paging': false,
    'searching': false,
    'select': true,
    'footerCallback': function ( row, data, start, end, display ) {
      var api = this.api(), data;
      // Remove the formatting to get integer data for summation
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
      $(api.column(2).footer()).html('$'+total);
    }
  });
  const available = $('#available.data-table').DataTable({
    'dom': '<"pull-left"f><"pull-right"l>tip',
    'paging': false,
    'select': true
  });

  // remove teams on click and add to opposite table
  $('#selected.data-table').on('click', 'tr', function () {
    if (!$(this).hasClass('disabled')) {
      const data = selected.row(this).data();
      available.row.add(data).draw( false );
      selected.row(this).remove().draw( false );
    };
  });
  $('#available.data-table').on('click', 'tr', function () {
    if (!$(this).hasClass('disabled')) {
      const data = available.row(this).data();
      selected.row.add(data).draw( false );
      available.row(this).remove().draw( false );
    };
  });

  $('.data-table').on('click', 'tr', function () {
    updateRemainingCounter();
    updateRemainingBudget();
    updateRowsBasedOnCounter();
    updateRowsBasedOnBudget();
  });

  updateRemainingCounter = () => {
    const selectedRows = $('table#selected tr.odd, table#selected tr.even').length;
    const updatedValue = 5 - selectedRows;
    $('#remaining-selections-count').text(updatedValue);
  };

  updateRemainingBudget = () => {
    const totalSpent = parseInt($('#total-spent').text().substring(1));
    const updatedBudget = seasonBudgetCap - totalSpent;
    $('#remaining-budget').text('$'+updatedBudget);
  };

  updateRowsBasedOnCounter = () => {
    counterValue = parseInt($('#remaining-selections-count').text());
    if (counterValue > 0) {
      $('table#available tr.odd, table#available tr.even').addClass('disabled');
    } else {
      $('table#available tr.odd, table#available tr.even').removeClass('disabled')
    };
  };

  updateRowsBasedOnBudget = () => {
    const currentRemainingBudget = parseInt($('#remaining-budget').text().substring(1));
    $('table#available tr.odd, table#available tr.even').each(function() {
      const teamValue = parseInt($(this).find('td.value').text());
      if (teamValue > currentRemainingBudget) {
        $(this).addClass('disabled');
      } else {
        $(this).removeClass('disabled')
      };
    });
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
});
