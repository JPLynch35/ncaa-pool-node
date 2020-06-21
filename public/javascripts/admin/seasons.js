$(document).ready(function() {
  $('.seasons #year').on('change', () => {
    const url = '/api/admin/current_season';
    var data = {};
    data.seasonYear = $('.seasons #year').val();
    $.get(url, data).done(season => {
      loadSeasonData(season);
    })
      .fail(() => {
        alert('error');
      });
  });

  loadSeasonData = (season) => {
    formattedStartDate = season.start_date.split('T')[0];
    formattedEndDate = season.end_date.split('T')[0];
    $('.seasons #spending-cap').val(season.spending_cap);
    $('.seasons #start-date').val(formattedStartDate);
    $('.seasons #end-date').val(formattedEndDate);
  };
});
