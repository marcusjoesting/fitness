import React, {useState} from 'react'
import MaterialTable from 'material-table'
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import WorkoutForm from "./WorkoutForm";
import {makeStyles, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
const useStyles = makeStyles(theme=> ({
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(2)
    },
    form: {
        padding: theme.spacing(2),
        margin: theme.spacing(15)
    },
    button: {
        marginBottom:theme.spacing(2)
    },
    delete: {
        '&:hover': {
            fontWeight: 'bold',
            cursor: 'pointer'
        }
    }

}))



export default function WorkoutTable(props) {
    const [addLift, setAddLift] = useState(false)
    const classes = useStyles()
    return (
        <Grid item container justify='center' spacing={2} xs={12} sm={12} md={6}>


                <Grid item xs={12}>
                    <MaterialTable columns={props.columns}
                                                  data={props.lifts}
                                                  title={props.title}
                                                  options={{actionsColumnIndex: 5,}}
                                                   editable={{
                                                       onRowUpdate: (newData, oldData) =>
                                                           new Promise((resolve, reject) => {
                                                               setTimeout(() => {
                                                                   {
                                                                       const data = [...props.lifts];
                                                                       const index = data.indexOf(oldData);
                                                                       data[index] = newData;
                                                                       props.setLifts(props.index, data);
                                                                   }
                                                                   resolve()
                                                               }, 1000)
                                                           }),
                                                       onRowDelete: oldData =>
                                                           new Promise((resolve, reject) => {
                                                               setTimeout(() => {
                                                                   {
                                                                       let data = [...props.lifts];
                                                                       const index = data.indexOf(oldData);
                                                                       data.splice(index, 1);
                                                                       props.setLifts(props.index, data);
                                                                   }
                                                                   resolve()
                                                               }, 1000)
                                                           }),
                                                   }}
                />
                </Grid>
            {addLift ?
                <Paper className={classes.paper}>
                    <WorkoutForm setAddLift={setAddLift} className={classes.form} setLifts={props.setLifts} title={props.title} index={props.index} lifts={props.lifts}/>
                </Paper>
                :
                <Grid item xs={4}><Button fullWidth className={classes.button} variant='contained' color={'secondary'} onClick={() => setAddLift(true)}>+ Add new {props.title} workout +</Button></Grid>
            }
{/*            <Grid item xs={1}>
                <Tooltip title={'Delete Table'}>
                    <Typography onClick={() => props.deleteTable(props.index)} className={classes.delete} variant={'h5'}>X</Typography>
                </Tooltip>
            </Grid>*/}
        </Grid>
    )
}

