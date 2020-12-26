import React from 'react';
import MainContent from '../Content/MainContent';

import './styles.scss';

const Main = () => {
  const list = [];
  return (
    <div className="main">
      <MainContent list={list} />
    </div>
  );
};

export default Main;
