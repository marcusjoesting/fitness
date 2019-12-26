import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import TodayIcon from '@material-ui/icons/Today';
export default function MenuList(props) {
    return (
        <div>
            <ListItem button onClick={() => window.location.href = '/'}>
                <ListItemIcon>
                    <FitnessCenterIcon/>
                </ListItemIcon>
                <ListItemText primary="Workouts"/>
            </ListItem>
            <ListItem button onClick={() => window.location.href = '/calendar/'}>
                <ListItemIcon>
                    <TodayIcon/>
                </ListItemIcon>
                <ListItemText primary="Workout Schedule"/>
            </ListItem>
            <ListItem button onClick={() => window.location.href = '/custom/'}>
                <ListItemIcon>
                    <PeopleIcon/>
                </ListItemIcon>
                <ListItemText primary="Workout Schedule 2"/>
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <BarChartIcon/>
                </ListItemIcon>
                <ListItemText primary="Reports"/>
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <LayersIcon/>
                </ListItemIcon>
                <ListItemText primary="Integrations"/>
            </ListItem>
        </div>
    );
}