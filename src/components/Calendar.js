import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import './main.scss'
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";

export default function Calendar(props) {
        return (<>
                    <Tooltip title={'Add Workout'}>
                            <Fab color={'secondary'} onClick={() => props.openWorkout()}>
                                    <AddIcon/>
                            </Fab>
                    </Tooltip>
                    <FullCalendar events={[{title:'Push Workout', date:'2019-12-21', allDay: true}]} defaultView="dayGridMonth" plugins={[ dayGridPlugin ]} />

            </>
        )
}