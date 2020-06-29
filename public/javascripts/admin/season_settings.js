$(document).ready(function() {
  $('#year').on('change', () => {
    const url = '/api/admin/current_season';
    var data = {};
    data.seasonYear = $('#year').val();
    $.get(url, data).done(season => {
      loadSeasonData(season);
    })
      .fail(() => {
        alert('Error loading season data');
      });
  });

  loadSeasonData = (season) => {
    formattedStartDate = season.start_date.split('T')[0];
    formattedEndDate = season.end_date.split('T')[0];
    $('#spending-cap').val(season.spending_cap);
    $('#start-date').val(formattedStartDate);
    $('#end-date').val(formattedEndDate);
  };
});
