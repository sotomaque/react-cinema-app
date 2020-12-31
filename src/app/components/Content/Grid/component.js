import React from 'react';
import PropTypes from 'prop-types';

import { LazyImage, Rating } from 'app/components';
import './styles.scss';

const Grid = ({ gridMovies = [] }) => {
  return (
    <div className="grid">
      {gridMovies.map((movie, index) => {
        const { url: backgroundImageUrl = '' } = movie;
        return (
          <LazyImage
            key={index}
            className="grid-cell"
            src={`${backgroundImageUrl}`}
            alt="placeholder">
            {/* See More Button */}
            <div className="grid-read-more">
              <button className="grid-cell-button">
                See More
              </button>
            </div>
            {/* Details */}
            <div>
              <div className="grid-detail">
                <span className="grid-detail-title">
                  {movie.title}
                </span>
                <div className="grid-detail-rating">
                  <Rating
                    rating={
                      movie.vote_average
                        ? movie.vote_average
                        : 1
                    }
                    totalStars={10}
                  />
                  &nbsp;&nbsp;
                  <div className="grid-vote-average">
                    {movie.vote_average
                      ? movie.vote_average
                      : 1}
                  </div>
                </div>
              </div>
            </div>
          </LazyImage>
        );
      })}
    </div>
  );
};

Grid.propTypes = {
  gridMovies: PropTypes.array.isRequired,
};

export default Grid;
