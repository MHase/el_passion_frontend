import React  from 'react';
import {render} from 'react-dom';

import {Issues} from './components/issues';



class App extends React.Component {
  render() {
    return (
    <div>
      <Issues/>
    </div>
    );
  }
}

render(<App/>, document.getElementById('react-issues'));






import '../scss/master.scss';
import '../img/star_full.png';
import '../img/star_empty.png';

$(document).ready(() => {
  count_issues();

  //adding star images to issues
  $('.issue-group__single[data-status="closed"]').each(function() {
    $(this).append('<img class="issue-star" src="img/star_full.png" alt="">');
  });
  $('.issue-group__single[data-status="open"]').each(function() {
    $(this).append('<img class="issue-star" src="img/star_empty.png" alt="">');
  });

  //changing state of issue open | closed
  $('.issue-star').on('click', function() {
    var single_issue_status = $(this).parent().attr('data-status');
    //if issue status is open then star is empty, when closed - star is full
    if (single_issue_status == 'open') {
      $(this).parent().attr('data-status', 'closed');
      $(this).attr('src', 'img/star_full.png');
    } else {
      $(this).parent().attr('data-status', 'open');
      $(this).attr('src', 'img/star_empty.png');
    }
    //count issues on sidebar and refresh filtering to move issue with changed state
    count_issues();
    filter($('.sidebar__filter--selected'));
  });

  //trigger filter
  $('.sidebar__filter').on('click', function() {
    //trigger filtering in app
    filter(this, $('.sidebar__filter--selected').attr('data-filter-type'));
    //remove class --selected from every filter and add it only to clicked one
    $('.sidebar__filter').each(function() {
      $(this).removeClass('sidebar__filter--selected');
    });
    $(this).addClass('sidebar__filter--selected');
  })
})

//counting open and closed issued
function count_issues() {
  let open_issues = $('.issue-group__single[data-status="open"]').length;
  let closed_issues = $('.issue-group__single[data-status="closed"]').length;
  //with counted values we can update them
  $('.filter__count.all').html(open_issues + closed_issues);
  $('.filter__count.open').html(open_issues);
  $('.filter__count.closed').html(closed_issues);
}

//filter showing only open, closed issues or all together
function filter(clicked_filter, selected_filter = null) {
  //if we clicked 'all' -> show every issue
  if ($(clicked_filter).attr('data-filter-type') == 'all') {

    $('.issue-group__single').css('display', 'block');

  //if we clicked 'open' -> show only open issues and hide closed ones
  } else if ($(clicked_filter).attr('data-filter-type') == 'open') {

    $('.issue-group__single').css('display', 'block');
    $('.issue-group__single[data-status="closed"]').css('display', 'none');

  //if we clicked 'closed' -> show only closed issues and hide open ones
  } else if ($(clicked_filter).attr('data-filter-type') == 'closed') {

    $('.issue-group__single').css('display', 'block');
    $('.issue-group__single[data-status="open"]').css('display', 'none');
  }


  //remove all issues containers where there's no issues
  $('.issue-group').each(function() {
    $(this).css('display', 'block');
    //if container of issues contain only date of issues - hide it
    if($(this).children(':visible').length == 1)
      $(this).css('display', 'none');
  });

}
