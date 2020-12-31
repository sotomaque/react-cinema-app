import React, {
  Fragment,
  useEffect,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const Rating = ({ className = '', rating, totalStars }) => {
  const [numberOfStars, setNumberOfStars] = useState();
  const ratingRef = useRef();

  useEffect(() => {
    setNumberOfStars(
      [...Array(totalStars).keys()].map(
        (index) => index + 1,
      ),
    );
    const percentage = (rating / totalStars) * 100;
    const starPercentage = `${Math.floor(percentage)}%`;
    ratingRef.current.style.width = starPercentage;
  }, [rating, totalStars]);

  return (
    <div className="star-rating">
      <div className={`back-stars ${className}`}>
        {/* unfilled stars */}
        {numberOfStars &&
          numberOfStars.map((i) => (
            <Fragment key={i}>
              <i
                className="fa fa-star"
                aria-hidden="true"
              />
            </Fragment>
          ))}
        {/* filled stars */}
        <div
          className={`front-stars ${className}`}
          ref={ratingRef}>
          {numberOfStars &&
            numberOfStars.map((i) => (
              <Fragment key={i}>
                <i
                  className="fa fa-star"
                  aria-hidden="true"
                />
              </Fragment>
            ))}
        </div>
      </div>
    </div>
  );
};

Rating.propTypes = {
  className: PropTypes.string,
  rating: PropTypes.number.isRequired,
  totalStars: PropTypes.number.isRequired,
};

export default Rating;
