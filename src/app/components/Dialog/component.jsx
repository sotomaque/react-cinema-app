import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import { blue } from '@material-ui/core/colors';

import I18n from 'app/locales';

const languages = ['Spanish', 'English'];
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">{I18n.translate('SET_PRIMARY_LANGUAGE')}</DialogTitle>
      <List>

        <ListItem button onClick={() => handleListItemClick('spanish')}>
          <ListItemAvatar>
            <Avatar className={classes.avatar}>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={I18n.translate('SPANISH')} />
        </ListItem>
        <ListItem button onClick={() => handleListItemClick('english')}>
          <ListItemAvatar>
            <Avatar className={classes.avatar}>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={I18n.translate('ENGLISH')} />
        </ListItem>
        <ListItem autoFocus button onClick={() => handleListItemClick('cancel')}>
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={I18n.translate('CANCEL')} />
        </ListItem>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(languages[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        {I18n.translate('SET_PRIMARY_LANGUAGE')}
      </Button>
      <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
    </>
  );
};
