import React from 'react';
import Timeline ,{SidebarHeader,TimelineHeaders,
    DateHeader}from 'react-calendar-timeline'
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'
import { colors } from '@material-ui/core';

function Calendertimeline(props) {

// const groups = [{ id: 1, title: 'Hari' }, { id: 2, title: 'Venkatesh' }]

var groups = []

var items = []

// const items = [
//   {
//     id: 1,
//     group: 1,
//     title: 'Test task One',
//     start_time: moment(),
//     end_time: moment().add(1, 'hour'),
//     itemProps: {
//         // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
//         'data-custom-attribute': 'Random content',
//         'aria-hidden': true,
//         onDoubleClick: () => { alert("Task Clicked") },
//         className: 'weekend',
//         style: {
//           background: 'fuchsia'
//         }
//       }
//   },
//   {
//     id: 2,
//     group: 2,
//     title: 'Test task two',
//     start_time: moment().add(-0.5, 'hour'),
//     end_time: moment().add(0.5, 'hour'),
//     itemProps: {
//         // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
//         'data-custom-attribute': 'Random content',
//         'aria-hidden': true,
//         onDoubleClick: () => { alert("Task Clicked") },
//         className: 'weekend',
//         style: {
//           background: 'fuchsia'
//         }
//       }
//   },
  // {
  //   id: 3,
  //   group: 1,
  //   title: 'Test task three',
  //   start_time: moment().add(2, 'hour'),
  //   end_time: moment().add(3, 'hour'),
  //   itemProps: {
  //       // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
  //       'data-custom-attribute': 'Random content',
  //       'aria-hidden': true,
  //       onDoubleClick: () => { alert("Task Clicked") },
  //       className: 'weekend',
  //       style: {
  //         background: 'fuchsia'
  //       }
  //     }
  // }
// ]

  if(props.getMembers && props.getMembers.length !=0){
    props.getMembers.map((member)=>{
      groups.push({ id: member._id, title: member.name })
      member.assigned_projects.map((project)=>{
        items.push(  {
          id: project._id,
          group: member._id,
          title: project.title,
          start_time: moment({ year:new Date(project.start_date).getFullYear(), month: new Date(project.start_date).getMonth(), day: new Date(project.start_date).getDay(), hour: 15, minute: 10, second: 3, millisecond: 123}),
          end_time: moment({ year:new Date(project.end_date).getFullYear(), month: new Date(project.end_date).getMonth(), day: new Date(project.end_date).getDay(), hour: 15, minute: 10, second: 3, millisecond: 123}),
          itemProps: {
              // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
              'data-custom-attribute': 'Random content',
              'aria-hidden': true,
              onDoubleClick: () => { alert(project._id) },
              className: 'weekend',
              style: {
                background: '#d45568',
                color:"black"
              }
            }
        })
      })
    })
    
  }


  return (
    <div>
       <Timeline
      groups={groups}
      items={items}
      defaultTimeStart={moment().add(-12, 'hour')}
      defaultTimeEnd={moment().add(12, 'hour')}
    >
    <TimelineHeaders className="sticky">
          <SidebarHeader>
            {({ getRootProps }) => {
              return <div {...getRootProps()}><h3 style={{color:"white"}}>Tasks</h3></div>;
            }}
          </SidebarHeader>
          <DateHeader unit="primaryHeader" />
          <DateHeader />
        </TimelineHeaders>
          </Timeline>
    </div>
  );
}

export default Calendertimeline;
