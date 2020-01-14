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
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from '@material-ui/icons/Edit'
import DoneIcon from '@material-ui/icons/Done';
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
    return (<>
            <Grid item xs={8}>
                <TextField fullWidth onChange={e => setName(e.target.value)} value={name} label={'Table Name'}/>
            </Grid>
            <Grid item xs={8}>
                <Button fullWidth variant='contained' color='primary' onClick={addTable}>Add Table</Button>
            </Grid>
            <Grid item xs={8}>
                <Button fullWidth onClick={() => props.setAdding(false)}>Cancel</Button>
            </Grid>

        </>
    )
}
const columns = [
    {title: 'Name of workout', field:'name'},
    {title: 'Weight', field:'weight'},
    {title: 'Sets', field:'sets'},
    {title: 'Reps', field:'reps'},
    {title: 'Muscle Group', field:'groupString'}
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
    React.useEffect(() => {
        props.setWorkouts(workouts)
    }, [workouts])

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
            <Grid item xs={12}><Typography variant={'h4'} align='center' color={'primary'}>Workouts</Typography>
            </Grid>



            {workouts && workouts.map((workout,index) => {
               return (
                       <WorkoutTable key={index} deleteTable={deleteTable} editing={edit} title={workout.title} lifts={workout.lifts} columns={columns} index={index} setTitle={setWorkoutTitle} setLifts={setLifts}/>
                   )
            })}
            <Grid item xs={12} container spacing={'2'} justify={'center'}>
                {adding ?
                    < Grid item container xs={12} spacing={1} justify={'center'}>
                        <TableForm lifts={workouts} setLifts={setWorkouts} setAdding={setAdding}/>
                    </Grid>
                    :
                    <Grid xs={1} item container justify={'center'}>
                        <Tooltip title={'Add Table'}>
                            <Fab color={'primary'} onClick={() => setAdding(true)}>
                                <AddIcon/>
                            </Fab>
                        </Tooltip>
                    </Grid>
                }
                <Grid item container xs={1} justify={'center'}>
                    {edit ?
                        <Tooltip title={'Done'}>
                            <Fab color={'secondary'} onClick={() => setEdit(false)}>
                                <DoneIcon/>
                            </Fab>
                        </Tooltip>
                        :
                        <Tooltip title={'Edit'}>
                            <Fab color={'primary'} onClick={() => setEdit(true)}>
                                <EditIcon/>
                            </Fab>
                        </Tooltip>
                    }
                </Grid>
            </Grid>
        </Grid>
    )

}
