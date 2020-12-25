import React from 'react';

import Paginated from '../../Paginated';
import './styles.scss';

const MainContent = () => {
  return (
    <div className="main-content">
      {/* Slideshow Components */}
      <div className="grid-movie-title">
        <div className="movieType">Now Playing</div>
        <div className="paginate">
          <Paginated />
        </div>
      </div>
      {/* Grid Components */}

    </div>
  );
};

export default MainContent;
