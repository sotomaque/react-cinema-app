import React from 'react';

import SlideShow from '../SlideShow';
import Paginated from '../../Paginated';
import './styles.scss';

const MainContent = () => {
  const images = [
    {
      url: 'https://static.boredpanda.com/blog/wp-content/uploads/2017/12/funny-weird-wtf-stock-photos-4-5a391635d4441__700.jpg'
    },
    {
      url: 'https://static.boredpanda.com/blog/wp-content/uploads/2017/12/funny-weird-wtf-stock-photos-29-5a3bbf6b34a98__700.jpg'
    },
    {
      url: 'https://static.boredpanda.com/blog/wp-content/uploads/2017/12/funny-weird-wtf-stock-photos-3-5a3914a3873e1__700.jpg'
    }
  ];

  const [currentPage, setCurrentPage] = React.useState(1);

  const paginate = (type) => {
    if (type === 'prev') {
      currentPage > 1
        ? setCurrentPage(prev => prev - 1)
        : setCurrentPage(10);
    } else {
      currentPage < 10
        ? setCurrentPage(prev => prev + 1)
        : setCurrentPage(1);
    }
  };

  return (
    <div className="main-content">
      {/* Slideshow Components */}
      <SlideShow
        images={images}
        auto
        arrows
      />
      <div className="grid-movie-title">
        <div className="movieType">Now Playing</div>
        <div className="paginate">
          <Paginated
            currentPage={currentPage}
            paginate={paginate}
            totalPages={10}
          />
        </div>
      </div>
      {/* Grid Components */}

    </div>
  );
};

export default MainContent;
