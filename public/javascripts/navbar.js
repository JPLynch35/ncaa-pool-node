$(document).ready(function() {
  // highlight current active page in navbar
  identifyCurrentPage = () => {
    debugger;
    var pathname = window.location.pathname;
    $('nav li > a[href="'+pathname+'"]').parent().addClass('fh5co-active');
  };
  identifyCurrentPage();

  logoutUser = () => {
    $("#logout").click(function(e) {
      e.preventDefault();
      $("#logout-button").click();
    });
  };
  logoutUser();
});
