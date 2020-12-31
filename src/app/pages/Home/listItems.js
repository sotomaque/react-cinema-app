import React from 'react';
import HelpIcon from '@material-ui/icons/Help';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MovieIcon from '@material-ui/icons/Movie';
import PersonIcon from '@material-ui/icons/Person';
import SchoolIcon from '@material-ui/icons/School';
import SettingsIcon from '@material-ui/icons/Settings';
import SlideshowIcon from '@material-ui/icons/Slideshow';

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItem>
    <hr />
    <ListItem button>
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

export const secondaryListItems = (
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
  </div>
);
