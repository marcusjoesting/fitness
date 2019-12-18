import React, {useState} from 'react'
import MaterialTable from 'material-table'
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core";
import WorkoutTable from './WorkoutTable'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles(theme=> ({
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(2)
    },
    edit: {
        '&:hover': {
            textDecoration: 'underline',
            color: 'blue',
            cursor: 'pointer'
        }
    }

}))

const TableForm = props => {
    const [name, setName] = useState('')
    const addTable = () => {
        console.log('adding table with name ', name)
        let holder = [...props.lifts]
        let newTable = {title: name, lifts:[]}
        holder.push(newTable)
        props.setLifts(holder)
        setName('')
        props.setAdding(false)
    }
    return (
        <div>
            <TextField onChange={e => setName(e.target.value)} value={name} label={'Table Name'}/>
            <Button variant='contained' color='primary' onClick={addTable}>Add Table</Button>
        </div>
    )
}
const columns = [
    {title: 'Name of workout', field:'name'},
    {title: 'Sets', field:'sets'},
    {title: 'Reps', field:'reps'},
    {title: 'Weight', field:'weight'},
    {title: 'Muscle Group', field:'muscleGroup'}
]


export default function Workouts(props) {
    const [workouts, setWorkouts] = useState([{title:'Legs', lifts: [{name: 'Squats',sets:3,reps:8, weight: 175, muscleGroup:'legs'}]},{title: 'Pull', lifts: []}])
    const [adding, setAdding] = useState(false)
    const [edit, setEdit] = useState(false)
    const classes = useStyles()

    const setWorkoutTitle = (index, value) => {
        let holder = [...workouts]
        holder[index].title = value
        setWorkouts(holder)
    }


    const setLifts = (index,lifts) => {
        let holder = [...workouts]
        holder[index].lifts = lifts
        setWorkouts(holder)
    }
    React.useEffect(() => {
        const lifts = localStorage.getItem('workouts')
        lifts ? setWorkouts(JSON.parse(lifts)) : console.log('does this work')
    },[])


    const deleteTable = index => {
        let holder = [...workouts]
        holder.splice(index, 1)
        setWorkouts(holder)
    }

    React.useEffect(() => {
        localStorage.setItem('workouts', JSON.stringify(workouts))
    },[workouts])
    return (
        <Grid container justify={'center'} spacing={5}>
            <Grid item xs={12}><Typography variant={'h4'} color={'primary'}>Workouts</Typography></Grid>

            {workouts && workouts.map((workout,index) => {
               return (
                       <WorkoutTable key={workout.name} deleteTable={deleteTable} title={workout.title} lifts={workout.lifts} columns={columns} index={index} setTitle={setWorkoutTitle} setLifts={setLifts}/>
                   )
            })}

            <Grid item xs={10}>
            </Grid>
            <Grid item xs={2}>
                {adding ? <TableForm lifts={workouts} setLifts={setWorkouts} setAdding={setAdding}/>
                :
                <Fab color={'primary'} onClick={() => setAdding(true)}>
                    <AddIcon/>
                </Fab>
                }
            </Grid>


        </Grid>
    )

}
