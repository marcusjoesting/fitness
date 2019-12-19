import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from "@material-ui/core/Typography/Typography";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Button from '@material-ui/core/Button';

class AboutDialog extends Component {
  render() {
    // Dialog Properties
    const { dialogProps } = this.props;

    // Custom Properties
    const { user } = this.props;

    return (
      <Dialog {...dialogProps}>
        <DialogTitle>{process.env.REACT_APP_TITLE}</DialogTitle>

        <DialogContent>
            <Typography>This is a fitness app to use if you want to stay...fit</Typography>
        </DialogContent>

        <DialogActions>
          <Button color="primary" onClick={dialogProps.onClose}>OK</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

AboutDialog.propTypes = {
  // Dialog Properties
  dialogProps: PropTypes.object.isRequired,

  // Custom Properties
  user: PropTypes.object,
};

export default AboutDialog;
