import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import './main.scss'
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";

export default function Calendar(props) {
        const [events, setEvents] = React.useState([{title:'Push Workout', date:'2019-12-26', start  : '2019-12-26', end: '2019-12-28', allDay: false}])
        const handleDateClick = (arg) => {
           /* // eslint-disable-next-line no-restricted-globals
            if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
                setEvents({  // add new event data
                    calendarEvents: events.concat({ // creates a new array
                        title: 'New Event',
                        start: arg.date,
                        allDay: arg.allDay
                    })
                })
            }*/
           props.openWorkout(arg)
        }
        return (<>
{/*                    <Tooltip title={'Add Workout'}>
                            <Fab color={'secondary'} onClick={() => props.openWorkout()}>
                                    <AddIcon/>
                            </Fab>
                    </Tooltip>*/}
                    <FullCalendar defaultView="dayGridMonth"
                                  header={{
                                      left: 'prev,next today',
                                      center: 'title',
                                      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                                  }} events={events} defaultView="dayGridMonth" plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]} dateClick={handleDateClick} />

            </>
        )
}