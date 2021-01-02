import React from 'react';
import PropTypes from 'prop-types';

import { blue } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import AndroidIcon from '@material-ui/icons/Android';
import AppleIcon from '@material-ui/icons/Apple';
import Avatar from '@material-ui/core/Avatar';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import I18n from 'app/locales';
import { LOCALES } from 'app/const';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

function SimpleDialog({ languageReducers, onClose, open, setLanguage }) {
  const classes = useStyles();
  const { language } = languageReducers;

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
        {/* SPANISH */}
        <ListItem
          button
          disabled={language === 'es'}
          selected={language === 'es'}
          onClick={() => handleListItemClick('es')}
        >
          <ListItemAvatar>
            <Avatar className={classes.avatar}>
              <AndroidIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={I18n.translate(LOCALES.SPANISH)} />
        </ListItem>
        {/* ENGLISH */}
        <ListItem
          button
          disabled={language === 'en'}
          selected={language === 'en'}
          onClick={() => handleListItemClick('en')}
        >
          <ListItemAvatar>
            <Avatar className={classes.avatar}>
              <AppleIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={I18n.translate(LOCALES.ENGLISH)} />
        </ListItem>
        {/* CLOSE */}
        <ListItem autoFocus button onClick={() => handleClose()}>
          <ListItemAvatar>
            <Avatar>
              <CloseIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={I18n.translate(LOCALES.CANCEL)} />
        </ListItem>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  languageReducers: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  setLanguage: PropTypes.func.isRequired,
};

// DIALOG WRAPPER (Includes Button and State for opening & closing Dialoag)
function SetLanguageDialog({ languageReducers, setLanguage }) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Typography onClick={() => setOpen(true)}>
        {I18n.translate(LOCALES.SET_PRIMARY_LANGUAGE)}
      </Typography>
      <SimpleDialog
        languageReducers={languageReducers}
        onClose={() => setOpen(false)}
        open={open}
        setLanguage={setLanguage}
      />
    </>
  );
};

SetLanguageDialog.propTypes = {
  languageReducers: PropTypes.object.isRequired,
  setLanguage: PropTypes.func.isRequired
};

export default SetLanguageDialog;
