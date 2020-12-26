import React, {
  Fragment,
  useState,
  useEffect,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const Rating = ({ rating, totalStars, className }) => {
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
        <div className={`front-stars ${className}`}>
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
  rating: PropTypes.number.isRequired,
  totalStars: PropTypes.number.isRequired,
  className: PropTypes.string,
};

export default Rating;
