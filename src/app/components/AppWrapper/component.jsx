import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';

import {
  grey,
  lightBlue,
} from '@material-ui/core/colors';
import {
  createMuiTheme,
  fade,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AppBar from '@material-ui/core/AppBar';
// import Badge from '@material-ui/core/Badge';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HelpIcon from '@material-ui/icons/Help';
import IconButton from '@material-ui/core/IconButton';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import InputBase from '@material-ui/core/InputBase';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import MovieIcon from '@material-ui/icons/Movie';
// import NotificationsIcon from '@material-ui/icons/Notifications';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonIcon from '@material-ui/icons/Person';
import SchoolIcon from '@material-ui/icons/School';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import SlideshowIcon from '@material-ui/icons/Slideshow';
import Switch from '@material-ui/core/Switch';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { AuthContext } from 'auth';
import { SET_LOADING, SET_THEME } from 'app/actions/types';
import SimpleDialogDemo from '../Dialog';

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
    marginTop: 50,
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
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const AppWrapper = ({ children, hardwareReducers }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { authState, signOut } = React.useContext(AuthContext);
  const LOGGED_IN = authState?.status === 'in';
  const { theme } = hardwareReducers;

  // Drawer / Theme state
  const [open, setOpen] = useState(false);
  const [darkState, setDarkState] = useState(theme === 'dark');
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

  // DRAWER PRIMARY LIST ITEMS
  const mainListItems = (
    <>
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
    </>
  );

  // DRAWER SECONDARY LIST ITEMS
  const secondaryListItems = (
    <>
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
    </>
  );

  const handleLogoutClicked = () => {
    dispatch({ type: SET_LOADING, payload: true });
    setTimeout(() => {
      signOut();
      dispatch({ type: SET_LOADING, payload: false });
      history.push('/login');
    }, 1000);
  };
  const SHOW_MORE_MENU = true;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const moreMenuOpen = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSetLanguage = () => {
    handleClose();
  };
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
            {/* TOGGLE DRAWER ICON BUTTON */}
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
            {/* Title */}
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}>
              React Cinema
            </Typography>
            {/* Search */}
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            {/* Theme Switch */}
            <Switch
              checked={darkState}
              onChange={handleThemeChange}
            />
            {/* Notifications */}
            {/* <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
            {SHOW_MORE_MENU && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={moreMenuOpen}
                onClose={handleClose}
              >
                <MenuItem onClick={handleSetLanguage}>
                  <SimpleDialogDemo />
                </MenuItem>
              </Menu>
            </div>
            )}
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
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
};

AppWrapper.propTypes = {
  children: PropTypes.any.isRequired,
  hardwareReducers: PropTypes.object.isRequired,
};

export default AppWrapper;
