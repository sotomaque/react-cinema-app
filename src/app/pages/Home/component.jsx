import React from 'react';
import { format } from 'date-fns';

import Header from '../../components/Header';
import Main from '../../components/Main';

import { usePopularMoviesFetch } from '../../hooks/usePopularMoviesFetch';

const HomePage = () => {
  const [today] = React.useState(new Date());

  const [date, setDate] = React.useState('');
  const currentHour = today?.getHours();
  const [greeting, setGreeting] = React.useState('');

  const [{ state: { movies } }] = usePopularMoviesFetch();

  if (movies) console.log('movies', movies);

  React.useEffect(() => {
    setDate(format(today, 'cccc, LLLL do'));
  }, [today]);

  React.useEffect(() => {
    if (currentHour < 12) {
      setGreeting('Good Morning');
    } else if (currentHour < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  }, [currentHour]);

  return (
    <>
      <Header />
      <Main />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}>
          <p
            style={{ color: 'white', textAlign: 'center' }}>
            {date}
          </p>
          <p
            style={{ color: 'white', textAlign: 'center' }}>
            {greeting}
          </p>
          <div>
            <ul style={{ listStyle: 'none' }}>
              <li style={{ color: 'white' }}>
                ✅ Set up React Redux
              </li>
              <li style={{ marginTop: 10, color: 'white' }}>
                Set up React Redux
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
