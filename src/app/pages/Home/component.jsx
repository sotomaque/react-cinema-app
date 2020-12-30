
/* eslint-disable */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HelpIcon from '@material-ui/icons/Help';
import IconButton from '@material-ui/core/IconButton';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import MovieIcon from '@material-ui/icons/Movie';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonIcon from '@material-ui/icons/Person';
import SchoolIcon from '@material-ui/icons/School';
import SettingsIcon from '@material-ui/icons/Settings';
import SlideshowIcon from '@material-ui/icons/Slideshow';
import Switch from '@material-ui/core/Switch';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {
  grey,
  lightBlue,
} from '@material-ui/core/colors';

import MainContent from '../../components/Content/MainContent';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useRefreshMovies } from '../../services/movies';
import { AuthContext } from '../../../auth';
import { SET_THEME } from '../../actions/types';
import { useDispatch } from 'react-redux';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  spinner: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '15em',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(
      ['width', 'margin'],
      {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      },
    ),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(
      ['width', 'margin'],
      {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      },
    ),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    textAlign: 'center',
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

// TODO: ADD LOADING SPINNER COMPONENT
const HomePage = ({ hardwareReducers, getMovies }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { authState, signOut } = React.useContext(AuthContext);
  const LOGGED_IN = authState?.status === 'in';
  // console.log('authState', authState);
  const { loading } = hardwareReducers;
  const [LOCAL_LOADING_STATE, setLoading] = React.useState();
  // API HOOK CALL 
  // TODO: REPLACE WITH GETMOVIES ACTION
  useRefreshMovies();
  // Drawer / Theme state
  const [open, setOpen] = useState(true);
  const [darkState, setDarkState] = useState(false);
  const palletType = darkState ? 'dark' : 'light';
  const mainPrimaryColor = darkState
    ? grey[900]
    : lightBlue[500];
  const mainSecondaryColor = darkState
    ? grey[200]
    : grey[900];
  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        main: mainPrimaryColor,
      },
      secondary: {
        main: mainSecondaryColor,
      },
    },
  });
  const handleThemeChange = () => {
    const payload = darkState ? 'light' : 'dark';
    dispatch({ type: SET_THEME, payload });
    setDarkState(!darkState);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await getMovies('popular');
  //     console.log('res', res);
  //   };
  //   fetchData();
  // }, []);

  const handleLogoutClicked = () => {
    setLoading(true);
    setTimeout(() => {
      signOut();
      setLoading(false);
      history.push('/login');
    }, 1000);
  };

  // DRAWER PRIMARY LIST ITEMS
  const mainListItems = (
    <div>
      { LOGGED_IN
        ? (
            <ListItem button>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
          )
        : (
            <>
              <ListItem button onClick={() => history.push('/login')}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItem>
              <ListItem button onClick={() => history.push('/register')}>
                <ListItemIcon>
                  <PersonAddIcon />
                </ListItemIcon>
                <ListItemText primary="Sign Up" />
              </ListItem>
            </>
          )
      }
      <hr />
      <ListItem button selected>
        <ListItemIcon>
          <MovieIcon />
        </ListItemIcon>
        <ListItemText primary="Movies" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <SlideshowIcon />
        </ListItemIcon>
        <ListItemText primary="Shows" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <ImportContactsIcon />
        </ListItemIcon>
        <ListItemText primary="Books" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <SchoolIcon />
        </ListItemIcon>
        <ListItemText primary="MOOCs" />
      </ListItem>
    </div>
  );

  // DRAWER SECONDARY LIST ITEMS
  const secondaryListItems = (
    <div>
      <ListItem button>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Settings and Privacy" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <HelpIcon />
        </ListItemIcon>
        <ListItemText primary="Help Center" />
      </ListItem>
      <ListItem button onClick={() => handleLogoutClicked()}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </div>
  );

  if (loading || LOCAL_LOADING_STATE) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={clsx(
            classes.appBar,
            open && classes.appBarShift,
          )}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden,
              )}>
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}>
              React Cinema
            </Typography>
            <Switch
              checked={darkState}
              onChange={handleThemeChange}
            />
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          classes={{
            paper: clsx(
              classes.drawerPaper,
              !open && classes.drawerPaperClose,
            ),
          }}
          open={open}>
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>{mainListItems}</List>
          <div style={{ position: 'absolute', bottom: 0 }}>
            <Divider />
            {
              LOGGED_IN && (<List>{secondaryListItems}</List>)
            }
          </div>
        </Drawer>
        <main className={classes.content}>
          <MainContent />
        </main>
      </div>
    </ThemeProvider>
  );
};

HomePage.propTypes = {
  hardwareReducers: PropTypes.object.isRequired,
  getMovies: PropTypes.func.isRequired,
};

export default HomePage;
