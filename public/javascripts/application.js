$(document).ready(function() {
  // loading animation for Adminator
  window.addEventListener('load', function load() {
    const loader = document.getElementById('loader');
    setTimeout(function() {
      loader.classList.add('fadeOut');
    }, 300);
  });

  $('#logout-shell').click((e) => {
    $('$logout').click();
  });
});
