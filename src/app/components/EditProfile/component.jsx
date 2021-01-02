import React from 'react';
import PropTypes from 'prop-types';
import { Button, Hidden, Slide, Snackbar, TextField, Typography } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';
import isURL from 'validator/lib/isURL';
import { useEditProfilePageStyles } from './styles';

function EditProfile() {
  // hooks
  const classes = useEditProfilePageStyles();
  const user = {
    name: 'Enrique',
    username: 'goon',
    website: 'google.com',
    email: 'j@google.com',
    phone_number: '1'
  };

  return (
    <section className={classes.section}>
      <main>
        <EditUserInfo user={user} />
      </main>
    </section>
  );
};

const DEFAULT_ERROR = { type: '', message: '' };

/**
 * Component displayed to the right of the drawer when Edit Profile is selected
 *  Allows users to update their name, username, website, bio, email,
 *  phone number, and profile picture
 *
 * @param {*} param0
 */
function EditUserInfo({ user }) {
  // hooks
  const classes = useEditProfilePageStyles();
  const { register, handleSubmit } = useForm({ mode: 'onBlur' });

  // context

  // state
  const [error, setError] = React.useState(DEFAULT_ERROR);
  const [open, setOpen] = React.useState(false);

  /**
   * Async function for submitting form
   *  function is passed in to handleSubmit function from useForm hook
   *  function attempts to update email on firebase first, as we dont want to
   *  persist changes to postgress (heroku) if firebase fails;
   *  if firebase update succeeds, function calls editUser query passing in variables
   *  from the form + the user.id as an object
   *  function then displays a message notifying user their profile has been updated
   *
   * @param {Object} inputObject - inputObject comes from HOC and contains input
   *                               and password attributes from form
   */
  async function onSubmit(data) {
    try {
      setError(DEFAULT_ERROR);
    } catch (err) {
      console.error('Error updating profile', err);
      handleError(err);
    }
  };

  /**
   * Function for setting error message from submitting form
   *  Cleans up Firebase errors for presentation to the user
   *  Within the corresponding section item
   *
   * @param {Object} error - error object from loginWithEmailAndPassword
  */
  function handleError(error) {
    if (error.message.includes('users_username_key')) {
      setError({ type: 'username', message: 'This username already taken' });
    } else if (error.code?.includes('auth')) {
      setError({ type: 'email', message: error.message });
    } else {
      console.error('FAILED TO CATCH ERROR', error);
      setError({ type: 'other', message: 'Error' });
    }
  };

  return (
    <section className={classes.container}>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <SectionItem
          text='Name'
          formItem={user.name}
          name='name'
          inputRef={register({
            required: true,
            minLength: 5,
            maxLength: 20
          })}
        />
        <SectionItem
          text='Username'
          formItem={user.username}
          name='username'
          error={error}
          inputRef={register({
            required: true,
            pattern: /^[a-zA-Z0-9_.]*$/,
            minLength: 5,
            maxLength: 20
          })}
        />
        <SectionItem
          text='Website'
          formItem={user.website}
          name='website'
          inputRef={register({
            validate: input => input
              ? isURL(input,
                  {
                    protocols: ['http', 'https'],
                    require_protocol: true
                  })
              : true
          })}
        />
        <div className={classes.sectionItem}>
          <aside>
            <Typography className={classes.bio}>Bio</Typography>
          </aside>
          <TextField
            name='bio'
            inputRef={register({
              maxLength: 120
            })}
            variant='outlined'
            multiline
            rowsMax={3}
            rows={3}
            fullWidth
            defaultValue={user.bio}
          />
        </div>

        <div className={classes.sectionItem}>
          <div />
          <Typography color='textSecondary' className={classes.justifySelfStart}>Personal Information</Typography>
        </div>

        <SectionItem
          text='Email'
          formItem={user.email}
          type='email'
          name='email'
          error={error}
          inputRef={register({
            required: true,
            validate: input => isEmail(input)
          })}
        />
        <SectionItem
          text='Phone Number'
          formItem={user.phone_number}
          name='phoneNumber'
          inputRef={register({
            validate: input => input ? isMobilePhone(input) : true
          })}
        />
        <div className={classes.sectionItem}>
          <div />
          <Button variant='contained' color='primary' type='submit' className={classes.justifySelfStart}>Submit</Button>
        </div>
      </form>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        TransitionComponent={Slide}
        onClose={() => setOpen(false)}
        message={'Profile Updated!'}
      />
    </section>
  );
};

EditUserInfo.propTypes = {
  user: PropTypes.object.isRequired,
};

/**
 * Component used to display label to the left of the input textfield
 *
 * @param {type, text, formItem, inputRef, name, error}
 */
function SectionItem({ error, formItem, inputRef, name, text, type = 'text' }) {
  const classes = useEditProfilePageStyles();

  return (
    <div className={classes.sectionItemWrapper}>
      <aside>
        <Hidden xsDown>
          <Typography className={classes.typography} align='right'>{text}</Typography>
        </Hidden>
        <Hidden smUp>
          <Typography className={classes.typography}>{text}</Typography>
        </Hidden>
      </aside>

      <TextField
        name={name}
        inputRef={inputRef}
        helperText={error?.type === name && error.message }
        variant='outlined'
        fullWidth
        defaultValue={formItem}
        type={type}
        className={classes.textField}
        inputProps={{
          className: classes.textFieldInput
        }}
      />
    </div>
  );
};

SectionItem.propTypes = {
  error: PropTypes.object,
  formItem: PropTypes.string,
  inputRef: PropTypes.func,
  name: PropTypes.string,
  text: PropTypes.string,
  type: PropTypes.string,
};

export default EditProfile;
