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

import { AuthContext } from '../../../auth';
import { SET_PAGE } from '../../actions/types';
import Error from '../../components/Error';
import Copyright from '../../components/Copyright';

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

const LoginPage = ({ pageReducers }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { page } = pageReducers;
  const { loginWithEmailAndPassword } = React.useContext(AuthContext);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);
  const [error, setError] = React.useState('');

  const handleError = (error) => {
    if (error?.message?.includes('users_username_key')) {
      setError('Username already taken');
    } else if (error?.code?.includes('auth')) {
      setError(error?.message);
    } else {
      setError(`Unknown Error, ${error}`);
    }
  };

  const handleSubmit = async ({ email, password }) => {
    try {
      setError('');
      await loginWithEmailAndPassword(email, password);
      history.push('/');
    } catch (err) {
      handleError(err);
      console.error(err);
    };
  };

  React.useEffect(() => {
    page !== 'login' && dispatch({ type: SET_PAGE, payload: 'login' });
  }, []);

  React.useEffect(() => {
    if (email.trim() !== '' && password.trim() !== '') {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [email, password]);

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
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={(event) => {
            event.preventDefault();
            handleSubmit({ email, password });
          }}>
            <TextField
              autoComplete='off'
              autoFocus
              fullWidth
              id="email"
              label="Email"
              margin="normal"
              name="email"
              onChange={(event) => setEmail(event.target.value)}
              required
              type="email"
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
            {
              error && <Error error={error} />
            }
            <Button
              className={classes.submit}
              color="primary"
              disabled={isButtonDisabled}
              fullWidth
              type="submit"
              variant="contained"
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <a href="#" variant="body2" style={{ color: 'inherit' }}>
                  Forgot password?
                </a>
              </Grid>
              <Grid item>
                <Link to='/register' variant="body2">
                  {"Don't have an account? Sign Up"}
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

LoginPage.propTypes = {
  pageReducers: PropTypes.object.isRequired,
};

export default LoginPage;
