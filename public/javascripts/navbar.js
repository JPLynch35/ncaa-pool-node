// highlight current active page in navbar
$(document).ready(function() {
  identifyCurrentPage = () => {
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
