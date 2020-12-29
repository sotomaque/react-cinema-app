import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useQuery } from '@apollo/react-hooks';

import { useRefreshMovies } from '../../services/movies';
import { NUMBER_OF_USERS_QUERY } from '../../gql/queries';
import Header from '../../components/Header';
import Main from '../../components/Main';
import { AuthContext } from '../../../auth';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '15em',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

// TODO: ADD LOADING SPINNER COMPONENT
const HomePage = ({ hardwareReducers }) => {
  const classes = useStyles();
  const { authState } = React.useContext(AuthContext);
  console.log('authState', authState);
  const { loading } = hardwareReducers;
  useRefreshMovies();

  const { data: queryData, loading: queryLoading, error } = useQuery(NUMBER_OF_USERS_QUERY);

  if (loading || queryLoading) {
    return (
      <div className={classes.root}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (<div>Error....</div>);
  };
  if (queryData) console.log('queryData', queryData);

  return (
    <>
      <Header />
      <Main />
    </>
  );
};

HomePage.propTypes = {
  hardwareReducers: PropTypes.object.isRequired,
};

export default HomePage;
