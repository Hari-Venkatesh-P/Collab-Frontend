import React , {useEffect, useState}from 'react';
import Timeline ,{SidebarHeader,TimelineHeaders,DateHeader}from 'react-calendar-timeline'
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'


function Calendertimeline(props) {

useEffect(()=>{
  console.log("Caleder Render")
})

var groups = []

var items = []

  if(props.viewByToggle == "MEMBERS" && props.getMembers && props.getMembers.length !=0){
    items = []
    groups = []
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
              onDoubleClick: () => { alert("This is Project " + project.title) },
              className: 'weekend',
              style: {
                background: ((project.status === "DELAYED") ? "#d45568" :(project.status === "COMPLETED") ? "#849650": "#e0d15a" ),
                color:"black"
              }
            }
        })
      })
    })
  }

  if(props.viewByToggle == "TEAMS" && props.getTeams && props.getTeams.length !=0){
    items = []
    groups = []
    props.getTeams.map((team)=>{
      groups.push({ id: team._id, title: team.name })
      team.assigned_projects.map((project)=>{
        items.push(  {
          id: project._id,
          group: team._id,
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
                background: ((project.status === "DELAYED") ? "#d45568" :(project.status === "COMPLETED") ? "#849650": "#e0d15a" ),
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
              return <div {...getRootProps()}><h6 style={{color:"white"}}>PROJECTS</h6></div>;
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
