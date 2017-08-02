import React from 'react';
import {render} from 'react-dom';

let issues_list = [
  {issue_date:'19-07-2016',
    issues: [{title: 'Page changes', state: 'closed'}, {title: 'Review of last issues', state: 'closed'} ]},
  {issue_date:'18-07-2016',
    issues: [{title: 'Visual UI Update Review', state: 'open'}, {title: 'Sidebar changes', state: 'open'} ]},
  {issue_date:'15-07-2016',
    issues: [{title: 'Crash update', state: 'open'}, {title: 'Page visual UI Update Review', state: 'closed'}, {title: 'Sidebar update', state: 'open'} ]},
  {issue_date:'14-07-2016',
    issues: [{title: 'Crash update', state: 'closed'}, {title: 'Page visual UI Update Review', state: 'closed'}, {title: 'Sidebar changes', state: 'closed'}, {title: 'Review of last issues', state: 'closed'}, {title: 'Page changes', state: 'closed'} ]},
];

export class Issues extends React.Component {
  render() {
    return (
      <div>
        {issues_list.map((issue, i) =>
          <ul className="issue-group" key={i}>
            <li className="issue-group__date">{issue.issue_date}</li>
            {issue.issues.map((single_issue, i) =>
              <li className="issue-group__single" data-status={single_issue.state} key={i}>{single_issue.title}</li>
            )}
        </ul>)}
      </div>

    )
  }
}
