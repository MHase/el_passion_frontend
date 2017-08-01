import '../scss/master.scss';
import '../img/star_full.png';
import '../img/star_empty.png';

$(document).ready(() => {
  count_issues();

  //adding star images to issues
  $('div.issue__single[data-status="closed"]').each(function() {
    $(this).append('<img class="issue-star" src="img/star_full.png" alt="">');
  });
  $('div.issue__single[data-status="open"]').each(function() {
    $(this).append('<img class="issue-star" src="img/star_empty.png" alt="">');
  });

  //changing state of issue open | closed
  $('.issue-star').on('click', function() {
    var single_issue_status = $(this).parent().attr('data-status');
    if (single_issue_status == 'open') {
      $(this).parent().attr('data-status', 'closed');
      $(this).attr('src', 'img/star_full.png');
    } else {
      $(this).parent().attr('data-status', 'open');
      $(this).attr('src', 'img/star_empty.png');
    }
    count_issues();
    filter($('.sidebar__filter.sidebar__filter--selected'));
  });

  //trigger filter
  $('.sidebar__filter').on('click', function() {
    $('.sidebar__filter').each(function() {
      $(this).removeClass('sidebar__filter--selected');
    });
    $(this).addClass('sidebar__filter--selected');
    filter(this);
  })
})

//counting open and closed issued
function count_issues() {
  let open_issues = $('div.issue__single[data-status="open"]').length;
  let closed_issues = $('div.issue__single[data-status="closed"]').length;
  $('.filter__count.all').html(open_issues + closed_issues);
  $('.filter__count.open').html(open_issues);
  $('.filter__count.closed').html(closed_issues);
}

//filter showing only open, closed issues or all together
function filter(clicked_filter) {
  if ($(clicked_filter).attr('data-filter-type') == 'all') {
    $('div.issue__single').css('display', 'block');
  } else if ($(clicked_filter).attr('data-filter-type') == 'open') {
    $('div.issue__single').css('display', 'block');
    $('div.issue__single[data-status="closed"]').css('display', 'none');
  } else if ($(clicked_filter).attr('data-filter-type') == 'closed') {
    $('div.issue__single').css('display', 'block');
    $('div.issue__single[data-status="open"]').css('display', 'none');
  }
  //remove all issues containers where there's no issues 
  $('.issue').each(function() {
    $(this).css('display', 'block');
    if($(this).children(':visible').length == 1)
      $(this).css('display', 'none');
  });

}
