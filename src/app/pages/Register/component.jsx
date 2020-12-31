import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { AuthContext } from 'auth';
import { SET_PAGE } from 'app/actions/types';
import { PAGES } from 'app/const';
import { Copyright } from 'app/components';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/featured/?movies)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const RegistrationPage = ({ pageReducers }) => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { signUpWithEmailAndPassword } = React.useContext(AuthContext);
  const { page } = pageReducers;
  const [username, setUsername] = React.useState('');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await signUpWithEmailAndPassword({
      email,
      name,
      username,
      password
    });
    history.push('/');
  };

  React.useEffect(() => {
    page !== PAGES.REGISTER && dispatch({ type: SET_PAGE, payload: PAGES.REGISTER });
  }, []);

  React.useEffect(() => {
    if (username.trim() !== '' && email.trim() !== '' && password.trim() !== '' && name.trim() !== '') {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [username, name, email, password]);

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
            <form className={classes.form} noValidate onSubmit={(event) => handleSubmit(event)}>
              <TextField
                autoComplete='off'
                autoFocus
                fullWidth
                id="name"
                label="Name"
                margin="normal"
                name="name"
                onChange={(event) => setName(event.target.value)}
                required
                value={name}
                variant="outlined"
              />
              <TextField
                autoComplete='off'
                autoFocus
                fullWidth
                id="username"
                label="Username"
                margin="normal"
                name="username"
                onChange={(event) => setUsername(event.target.value)}
                required
                value={username}
                variant="outlined"
              />
              <TextField
                autoComplete="email"
                autoFocus
                fullWidth
                id="email"
                label="Email Address"
                margin="normal"
                name="email"
                onChange={(event) => setEmail(event.target.value)}
                required
                value={email}
                variant="outlined"
              />
              <TextField
                autoComplete="current-password"
                fullWidth
                id="password"
                label="Password"
                margin="normal"
                name="password"
                onChange={(event) => setPassword(event.target.value)}
                required
                type="password"
                value={password}
                variant="outlined"
              />
              <Button
                className={classes.submit}
                color="primary"
                disabled={isButtonDisabled}
                fullWidth
                type="submit"
                variant="contained"
              >
                Register
              </Button>
              <Grid container style={{ display: 'flex', justifyContent: 'center' }}>
              <Grid item>
                <Link to='/login' variant="body2">
                {'Already have an account? Sign In'}
                </Link>
              </Grid>
              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
        </div>
      </Grid>
    </Grid>
  );
};

RegistrationPage.propTypes = {
  pageReducers: PropTypes.object.isRequired,
};

export default RegistrationPage;
