import React from 'react'
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {Typography} from "@material-ui/core";
export default function WorkoutForm(props) {
    const [name,setName] = React.useState('')
    const [reps,setReps] = React.useState(0)
    const [sets,setSets] = React.useState(0)
    const [weight,setWeight] = React.useState(0)
    const [muscleGroup, setMuscleGroup] = React.useState('')



    function addLift() {
        let lift = {name, sets, reps, weight, muscleGroup}
        let workouts = [...props.lifts]
        workouts.push(lift)
        props.setLifts(props.index, workouts)
        props.setAddLift(false)

    }
    return(
        <Grid item xs={12}container spacing={2} justify={'center'}>
            <Typography variant={'h5'} color={'primary'}>Add workout</Typography>
            <Grid item xs={12}>
                <TextField fullWidth onChange={(e) => setName(e.target.value)} value={name} label="Name"/>
            </Grid>
            <Grid item xs={4}>
                <TextField fullWidth onChange={(e) => setSets(e.target.value)} value={sets} label="Sets"/>
            </Grid>
            <Grid item xs={4}>
                <TextField fullWidth onChange={(e) => setReps(e.target.value)} value={reps} label="Reps"/>
            </Grid>
            <Grid item xs={4}>
               <TextField fullWidth onChange={(e) => setWeight(e.target.value)} value={weight} label="Weight"/>
            </Grid>
            <Grid item xs={12}>
                <TextField fullWidth onChange={(e) => setMuscleGroup(e.target.value)} value={muscleGroup} label="Muscle Group"/>
            </Grid>
            <Grid item xs={6}>
                <Button variant={'contained'} color={'primary'} onClick={addLift} fullWidth>Add {props.title} workout</Button>
                <Button varaint={'outlined'} onClick={()=> props.setAddLift(false)}>Cancel</Button>
            </Grid>

        </Grid>
    )
}