import React, { Component } from 'react';

import PropTypes from 'prop-types';


import { makeStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import AuthProviderList from '../AuthProviderList';
import Select from 'react-select'

const useStyles = makeStyles(theme => ({
    icon: {
        marginRight: theme.spacing(0.5)
    },
    divider: {
        margin: 'auto'
    },
    grid: {
        marginBottom: theme.spacing(2)
    }
}))



export default function WorkoutDialog(props) {



    const [open, setOpen] = React.useState(true)
    console.log(props.workouts)

    const dialogProps = {open: open}
    const performingAction = true

        return (
            <Dialog fullWidth maxWidth="sm" {...dialogProps} >
                <DialogTitle>
                    Schedule a workout
                </DialogTitle>

                <DialogContent>
                    <Hidden xsDown>
                        <Grid container direction="row" spacing={3}>
                            <Grid item sm={6}>
                                <Select placeholder={'Select Workout'}>

                                </Select>
                            </Grid>
                            <Grid item sm={6}>
                                <TextField helperText='Date' type={'date'}/>
                            </Grid>

                        </Grid>
                    </Hidden>

                    <Hidden smUp>

                        <Grid container direction="column" spacing={2}>

                        </Grid>
                    </Hidden>
                </DialogContent>

                <DialogActions>
                    <Button color="primary" onClick={() => setOpen(false)}>Cancel</Button>
                </DialogActions>
            </Dialog>
        );
}


