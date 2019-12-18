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
        <Grid item container justify='flex-start' spacing={0} xs={6}>


                <Grid item xs={12}>
                    <MaterialTable columns={props.columns}
                                                  data={props.lifts}
                                                  title={props.title}
                                                  options={{actionsColumnIndex: 5,}}
                                                  actions={[
                                                      {icon: 'delete', tootltip: 'Delete Lift', onClick: (event, rowData) => alert("You deleted " + rowData.name)},
                                                      {icon: 'edit', tooltip: 'Edit Lift', onClick: (event, rowData) => alert("You are trying to edit " + rowData.name)}
                                                      ]}
                />
                </Grid>
            <Grid item xs={1}>
                <Tooltip title={'Delete Table'}>
                <Typography onClick={() => props.deleteTable(props.index)} className={classes.delete} variant={'h5'}>X</Typography>
                </Tooltip>
            </Grid>
            {addLift ?
            <WorkoutForm setAddLift={setAddLift} className={classes.form} setLifts={props.setLifts} title={props.title} index={props.index} lifts={props.lifts}/>
                :
                <Grid item xs={10}><Button className={classes.button} variant='contained' color='primary' onClick={() => setAddLift(true)}>Add new {props.title} lift</Button></Grid>
            }
        </Grid>
    )
}

