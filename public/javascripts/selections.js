$(document).ready(function() {
  const selected = $('#selected.data-table').DataTable({
    'paging': false,
    'searching': false,
    'select': true
  });
  const available = $('#available.data-table').DataTable({
    'dom': '<"pull-left"f><"pull-right"l>tip',
    'paging': false,
    'select': true
  });

  // remove teams on click and add to opposite table
  $('#selected.data-table').on('click', 'tr', function () {
    const data = selected.row(this).data();
    available.row.add(data).draw( false );
    selected.row(this).remove().draw( false );
  });
  $('#available.data-table').on('click', 'tr', function () {
    const data = available.row(this).data();
    selected.row.add(data).draw( false );
    available.row(this).remove().draw( false );
  });

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
