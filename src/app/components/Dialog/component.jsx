import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import { blue } from '@material-ui/core/colors';

import I18n from 'app/locales';
import { Typography } from '@material-ui/core';
import { LOCALES } from 'app/const';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, setLanguage, open } = props;

  const handleClose = () => {
    onClose();
  };

  // LANGUAGE ITEM CLICK HANDLER
  const handleListItemClick = (value) => {
    // UPDATE REDUX & I18n
    setLanguage(`${value}`);
    // CLOSE MODAL
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">{I18n.translate(LOCALES.SET_PRIMARY_LANGUAGE)}</DialogTitle>
      <List>
        <ListItem button onClick={() => handleListItemClick('es')}>
          <ListItemAvatar>
            <Avatar className={classes.avatar}>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={I18n.translate(LOCALES.SPANISH)} />
        </ListItem>
        <ListItem button onClick={() => handleListItemClick('en')}>
          <ListItemAvatar>
            <Avatar className={classes.avatar}>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={I18n.translate(LOCALES.ENGLISH)} />
        </ListItem>
        <ListItem autoFocus button onClick={() => handleClose()}>
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={I18n.translate(LOCALES.CANCEL)} />
        </ListItem>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  setLanguage: PropTypes.func.isRequired
};

// DIALOG WRAPPER (Includes Button and State for opening & closing Dialoag)
function SetLanguageDialog({ setLanguage }) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Typography onClick={() => setOpen(true)}>
        {I18n.translate(LOCALES.SET_PRIMARY_LANGUAGE)}
      </Typography>
      <SimpleDialog
        onClose={() => setOpen(false)}
        open={open}
        setLanguage={setLanguage}
      />
    </>
  );
};

SetLanguageDialog.propTypes = {
  setLanguage: PropTypes.func.isRequired
};

export default SetLanguageDialog;
