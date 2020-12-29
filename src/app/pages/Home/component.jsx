import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useQuery } from '@apollo/react-hooks';

import { AuthContext } from '../../../auth';
import { useRefreshMovies } from '../../services/movies';
import { NUMBER_OF_USERS_QUERY } from '../../gql/queries';
import Header from '../../components/Header';
import Main from '../../components/Main';

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
    console.log(error);
    return (<div>Error....</div>);
  };
  console.log('queryData', queryData);

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
