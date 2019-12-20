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
                            <Fab color={'secondary'} onClick={() => props.onWorkoutClick}>
                                    <AddIcon/>
                            </Fab>
                    </Tooltip>
                    <FullCalendar defaultView="dayGridMonth" plugins={[ dayGridPlugin ]} />

            </>
        )
}