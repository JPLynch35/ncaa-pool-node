import './vendor/masonry/masonry-4.2.0.pkgd.min.js';
// import './vendor/charts/index.js';
// import './vendor/popover/index.js';
import './vendor/scrollbar/perfect-scrollbar-1.1.0.min.js';
// import './vendor/search/index.js';
import './vendor/adminator/sidebar.js';
// import './vendor/skycons/skycons-1.0.0.js';
// import './vendor/chat/index.js';
import './vendor/datatables/datatables-1.10.21.js';
// import './vendor/datepicker/index.js';
// import './vendor/email/index.js';
// import './vendor/fullcalendar/index.js';
import './vendor/adminator/utils.js';

$(document).ready(function() {
  // masonry-layout
  if ($('.masonry').length > 0) {
    new Masonry('.masonry', {
      itemSelector: '.masonry-item',
      columnWidth: '.masonry-sizer',
      percentPosition: true,
    });
  };

  // popover
  $('[data-toggle="popover"]').popover();
  $('[data-toggle="tooltip"]').tooltip();

  // perfect-scrollbar
  const scrollables = $('.scrollable');
  if (scrollables.length > 0) {
    scrollables.each((index, el) => {
      new PerfectScrollbar(el);
    });
  };
});