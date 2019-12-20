import React, { Component } from 'react';
import readingTime from 'reading-time';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { auth, firestore } from '../../firebase';
import authentication from '../../services/authentication';
import theming from '../../services/theming';
import ErrorBoundary from '../ErrorBoundary';
import LaunchScreen from '../LaunchScreen';
import Bar from '../Bar';
import Router from '../Router';
import DialogHost from '../DialogHost';
import Container from "@material-ui/core/Container";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from '@material-ui/core/List';
import MenuList from "../MenuList";
const initialState = {
  ready: false,
  performingAction: false,

  theme: theming.defaultTheme,

  user: null,
  userData: null,

  aboutDialog: {
    open: false
  },

  signUpDialog: {
    open: false
  },

  signInDialog: {
    open: false
  },

  settingsDialog: {
    open: false
  },

  deleteAccountDialog: {
    open: false
  },

  signOutDialog: {
    open: false
  },

  snackbar: {
    autoHideDuration: 0,
    message: '',
    open: false
  },
  workoutDialog: {
    open: false
  },
  menu: {
    open: false
  },
  workouts: []

};


class App extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  resetState = (callback) => {
    this.setState({
      ready: true,

      theme: theming.defaultTheme,

      user: null,
      userData: null
    }, callback);
  };

  handleDrawerClose = () => {

  }

  setTheme = (theme, callback) => {
    if (!theme) {
      this.setState({
        theme: theming.defaultTheme
      }, callback);

      return;
    }

    this.setState({
      theme: theming.createTheme(theme)
    }, callback);
  };

  openDialog = (dialogId, callback) => {
    const dialog = this.state[dialogId];

    if (!dialog || dialog.open === undefined || null) {
      return;
    }

    dialog.open = true;

    this.setState({ dialog }, callback);
  };

  closeDialog = (dialogId, callback) => {
    const dialog = this.state[dialogId];

    if (!dialog || dialog.open === undefined || null) {
      return;
    }

    dialog.open = false;

    this.setState({ dialog }, callback);
  };

  closeAllDialogs = (callback) => {
    this.setState({
      aboutDialog: {
        open: false
      },

      signUpDialog: {
        open: false
      },

      signInDialog: {
        open: false
      },

      settingsDialog: {
        open: false
      },

      deleteAccountDialog: {
        open: false
      },

      signOutDialog: {
        open: false
      },
      workoutDialog: {
        open: false
      },
      workouts: this.state.workouts
    }, callback);
  };

  deleteAccount = () => {
    this.setState({
      performingAction: true
    }, () => {
      authentication.deleteAccount().then(() => {
        this.closeAllDialogs(() => {
          this.openSnackbar('Deleted account');
        });
      }).catch((reason) => {
        const code = reason.code;
        const message = reason.message;

        switch (code) {
          default:
            this.openSnackbar(message);
            return;
        }
      }).finally(() => {
        this.setState({
          performingAction: false
        });
      });
    });
  };

  signOut = () => {
    this.setState({
      performingAction: true
    }, () => {
      authentication.signOut().then(() => {
        this.closeAllDialogs(() => {
          this.openSnackbar('Signed out');
        });
      }).catch((reason) => {
        const code = reason.code;
        const message = reason.message;

        switch (code) {
          default:
            this.openSnackbar(message);
            return;
        }
      }).finally(() => {
        this.setState({
          performingAction: false
        });
      });
    });
  };

  openSnackbar = (message, autoHideDuration = 2, callback) => {
    this.setState({
      snackbar: {
        autoHideDuration: readingTime(message).time * autoHideDuration,
        message,
        open: true
      }
    }, () => {
      if (callback && typeof callback === 'function') {
        callback();
      }
    });
  };

  closeSnackbar = (clearMessage = false) => {
    const { snackbar } = this.state;

    this.setState({
      snackbar: {
        message: clearMessage ? '' : snackbar.message,
        open: false
      }
    });
  };
  toggleDrawer = (side, open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    this.setState({ ...this.state, menu: {open: open} });
  };
  setWorkouts = (workouts) => {
    this.setState({...this.state, workouts:workouts})
  }
  render() {
    const {
      user,
      userData,
      theme,
      ready,
      performingAction,
      workouts,
    } = this.state;

    const {
      aboutDialog,
      signUpDialog,
      signInDialog,
      settingsDialog,
      deleteAccountDialog,
      signOutDialog,
      workoutDialog
    } = this.state;

    const { snackbar } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />

        <ErrorBoundary>
          {!ready &&
          <LaunchScreen/>
          }

          {ready &&
            <>
              <Bar
                performingAction={performingAction}
                user={user}
                userData={userData}
                toggleMenu={this.toggleDrawer('left',true)}
                onSignUpClick={() => this.openDialog('signUpDialog')}
                onSignInClick={() => this.openDialog('signInDialog')}

                onAboutClick={() => this.openDialog('aboutDialog')}
                onSettingsClick={() => this.openDialog('settingsDialog')}
                onSignOutClick={() => this.openDialog('signOutDialog')}
              />
              <Container style={{paddingTop: 30}} maxWidth={'xl'}>
                <Router user={user} setWorkouts={this.setWorkouts} onWorkoutClick={() => this.openDialog('workoutDialog')} openSnackbar={this.openSnackbar}/>
              </Container>
              <DialogHost
                user={user}
                dialogs={
                  {
                    aboutDialog: {
                      dialogProps: {
                        open: aboutDialog.open,

                        onClose: () => this.closeDialog('aboutDialog')
                      },

                      props: {
                        user: user
                      }
                    },

                    signUpDialog: {
                      dialogProps: {
                        open: signUpDialog.open,

                        onClose: (callback) => {
                          this.closeDialog('signUpDialog');

                          if (callback && typeof callback === 'function') {
                            callback();
                          }
                        }
                      },

                      props: {
                        performingAction: performingAction,

                        openSnackbar: this.openSnackbar
                      }
                    },

                    signInDialog: {
                      dialogProps: {
                        open: signInDialog.open,

                        onClose: (callback) => {
                          this.closeDialog('signInDialog');

                          if (callback && typeof callback === 'function') {
                            callback();
                          }
                        }
                      },

                      props: {
                        performingAction: performingAction,

                        openSnackbar: this.openSnackbar
                      }
                    },

                    settingsDialog: {
                      dialogProps: {
                        open: settingsDialog.open,

                        onClose: () => this.closeDialog('settingsDialog')
                      },

                      props: {
                        user: user,
                        userData: userData,
                        theme: theme,

                        openSnackbar: this.openSnackbar,

                        onDeleteAccountClick: () => this.openDialog('deleteAccountDialog')
                      }
                    },

                    deleteAccountDialog: {
                      dialogProps: {
                        open: deleteAccountDialog.open,

                        onClose: () => this.closeDialog('deleteAccountDialog')
                      },

                      props: {
                        performingAction: performingAction,
                        userData: userData,

                        deleteAccount: this.deleteAccount
                      }
                    },
                    workoutDialog: {
                      dialogProps: {
                        performingAction: performingAction,
                        onClose: () => this.closeDialog('workoutDialog')
                      },
                      props: {
                          workouts: workouts
                      }
                    },
                    signOutDialog: {
                      dialogProps: {
                        open: signOutDialog.open,

                        onClose: () => this.closeDialog('signOutDialog')
                      },

                      props: {
                        title: 'Sign out?',
                        contentText: 'While signed out you are unable to manage your profile and conduct other activities that require you to be signed in.',
                        dismissiveAction: <Button color="primary" onClick={() => this.closeDialog('signOutDialog')}>Cancel</Button>,
                        confirmingAction: <Button color="primary" disabled={performingAction} variant="contained" onClick={this.signOut}>Sign Out</Button>
                      }
                    }
                  }
                }
              />
              <SwipeableDrawer
                  open={this.state.menu.open}
                  onClose={this.toggleDrawer('left', false)}
                  onOpen={this.toggleDrawer('left', true)}
              >
                <div
                    style={{width:250}}
                    role="presentation"
                    onClick={this.toggleDrawer('left', false)}
                    onKeyDown={this.toggleDrawer('left', false)}
                >
                  <List>
                   <MenuList/>
                  </List>
                </div>
              </SwipeableDrawer>
              <Snackbar
                autoHideDuration={snackbar.autoHideDuration}
                message={snackbar.message}
                open={snackbar.open}
                onClose={this.closeSnackbar}
              />
            </>
          }
        </ErrorBoundary>
      </MuiThemeProvider>
    );
  }

  componentDidMount() {
    this.onAuthStateChangedObserver = auth.onAuthStateChanged((user) => {
      // The user is not signed in or doesn’t have a user ID.
      if (!user || !user.uid) {
        if (this.userDocumentSnapshotListener) {
          this.userDocumentSnapshotListener();
        }

        this.resetState();

        return;
      }

      // The user is signed in, begin retrieval of external user data.
      this.userDocumentSnapshotListener = firestore.collection('users').doc(user.uid).onSnapshot((snapshot) => {
        const data = snapshot.data();

        // The user doesn’t have a data point, equivalent to not signed in.
        if (!snapshot.exists || !data) {
          if (this.userDocumentSnapshotListener) {
            this.userDocumentSnapshotListener();
          }

          this.resetState();

          return;
        }

        this.setTheme(data.theme, () => {
          this.setState({
            ready: true,

            user: user,
            userData: data
          });
        });
      }, (error) => {
        this.resetState(() => {
          const code = error.code;
          const message = error.message;

          switch (code) {
            default:
              this.openSnackbar(message);
              return;
          }
        });
      });
    }, (error) => {
      this.resetState(() => {
        const code = error.code;
        const message = error.message;

        switch (code) {
          default:
            this.openSnackbar(message);
            return;
        }
      });
    });
  }

  componentWillUnmount() {
    if (this.onAuthStateChangedObserver) {
      this.onAuthStateChangedObserver();
    }

    if (this.userDocumentSnapshotListener) {
      this.userDocumentSnapshotListener();
    }
  }
}

export default App;
