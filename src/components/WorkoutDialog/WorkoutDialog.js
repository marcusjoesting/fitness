import React, { Component } from 'react';
import EditIcon from '@material-ui/icons/Edit'
import { makeStyles } from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from "@material-ui/core/Typography";
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import AuthProviderList from '../AuthProviderList';
import Select from 'react-select'
import Paper from "@material-ui/core/Paper";
const useStyles = makeStyles(theme => ({
    icon: {
        marginRight: theme.spacing(0.5)
    },
    divider: {
        margin: 'auto'
    },
    grid: {
        marginBottom: theme.spacing(2),
    },
    header: {
        fontWeight: 'bold',
        textDecoration: 'underline'
    },
    select: {

    }
}))



export default function WorkoutDialog(props) {
    const [options, setOptions] = React.useState([])
    const [workout, setWorkout] = React.useState({})
    const classes = useStyles()
    React.useEffect(() => {
        let holder = []
        if (props.workouts) {
            props.workouts.forEach(workout => {
                holder.push({value: workout, label: workout.title})
            })
        }
        setOptions(holder)
    }, [props.workouts])
    React.useEffect(() => {
        console.log(workout)
    }, [workout])
    const dialogProps = props.dialogProps

    const handleSelect = selectedWorkout => {
        setWorkout(selectedWorkout)
    }
        return (
            <Dialog fullWidth maxWidth="md" {...dialogProps}>
                <DialogTitle>
                    Schedule a workout
                </DialogTitle>

                <DialogContent>
                    <Hidden xsDown>
                        <Grid className={classes.grid} container direction="row" spacing={3}>
                            <Grid item sm={6}>
                                <Select options={options} value={workout} onChange={handleSelect} placeholder={'Select Workout'}/>
                            </Grid>
                            <Grid item sm={6}>
                                <TextField helperText='Date' fullWidth type={'date'}/>
                            </Grid>
                            {workout.value && workout.value.lifts &&
                            <>
                                <Grid item xs={4}>
                                    <Typography className={classes.header} variant={'h6'}>Name</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography className={classes.header}>Sets X Reps</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography className={classes.header}>Weight</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography className={classes.header}>Edit</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider/>
                                </Grid>
                            </>
                            }
                            {workout.value && workout.value.lifts && workout.value.lifts.map(lift => {
                                return (<>
                                        <Grid item xs={4}>
                                            <Typography variant={'h5'}>{lift.name}</Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography>{lift.sets} X {lift.reps}</Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography>Weight: {lift.weight}</Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <IconButton color={'primary'}>
                                                <EditIcon/>
                                            </IconButton>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Divider/>
                                        </Grid>


                                    </>
                                )
                            })}

                        </Grid>

                    </Hidden>

                    <Hidden smUp>

                        <Grid container direction="column" spacing={2}>

                        </Grid>
                    </Hidden>
                </DialogContent>

                <DialogActions>
                    <Button fullWidth variant={'contained'} color={'primary'}>Schedule Workout</Button>
                    <Button fullWidth color="primary" onClick={() => props.dialogProps.onClose()}>Cancel</Button>
                </DialogActions>
            </Dialog>
        );
}


