// highlight current active page in navbar
$(document).ready(function() {
  var pathname = window.location.pathname;
  $('nav li > a[href="'+pathname+'"]').parent().addClass('fh5co-active');
})