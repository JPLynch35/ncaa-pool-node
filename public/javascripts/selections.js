$(document).ready(function() {
  $('.teams-table table').DataTable({
    'paging': false,
    'searching': false,
  });

  function resizeTables(sharedSize) {
    const tableArr = $('table[data-ss='+sharedSize+']');
    var cellWidths = new Array();
    $(tableArr).each(function() {
      for (i = 0; i < $(this)[0].rows[0].cells.length; i++) {
        var cell = $(this)[0].rows[0].cells[i];
        if(!cellWidths[i] || cellWidths[i] < cell.clientWidth) cellWidths[i] = cell.clientWidth;
      };
    });
    var rowHeight = $(tableArr[0].rows[0]).height();
    $(tableArr).each(function() {
      for (i = 0; i < $(this)[0].rows[0].cells.length; i++) {
        $(this)[0].rows[0].cells[i].style.width = cellWidths[i]+'px';
      };
      for (i = 0; i < $(this)[0].rows.length; i++) {
        $($(this)[0].rows[i]).height(rowHeight);
      };
    });
  };

  resizeTables('1');
});
