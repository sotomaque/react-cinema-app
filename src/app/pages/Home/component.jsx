import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';

import Header from '../../components/Header';
import Main from '../../components/Main';
import { useRefreshMovies } from '../../services/movies';
import { NUMBER_OF_USERS_QUERY } from '../../gql/queries';
import { AuthContext } from '../../../auth';

// TODO: ADD LOADING SPINNER COMPONENT
const HomePage = ({ hardwareReducers }) => {
  const { authState } = React.useContext(AuthContext);
  console.log('authState,', authState);
  const { loading } = hardwareReducers;
  useRefreshMovies();

  const { data: queryData, loading: queryLoading, error } = useQuery(NUMBER_OF_USERS_QUERY);
  if (loading || queryLoading) return (<div>Loading..</div>);
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
