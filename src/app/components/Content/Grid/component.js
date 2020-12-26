import React from 'react';
import PropTypes from 'prop-types';

import Rating from '../Rating';
import './styles.scss';

const Grid = ({ images }) => {
  return (
    <div className="grid">
      {images.map((image, index) => (
        <div key={index}>
          <div
            className="grid-cell"
            style={{
              backgroundImage: `url(${image.url})`,
            }}>
            {/* Read More Button */}
            <div className="grid-read-more">
              <button className="grid-cell-button">
                Read More
              </button>
            </div>
            {/* Details */}
            <div>
              <div className="grid-detail">
                <span className="grid-detail-title">
                  Mission Impossible
                </span>
                <div className="grid-detail-rating">
                  <Rating
                    rating={image.rating}
                    totalStars={10}
                  />
                  &nbsp;&nbsp;
                  <div className="grid-vote-average">
                    {image.rating}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

Grid.propTypes = {
  images: PropTypes.array.isRequired,
};

export default Grid;
