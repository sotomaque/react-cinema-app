import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

/**
 * Functional Component
 *
 * @returns Component - Image Carousel
 *
 * @param {array} images - array of objects with url attributes
 * @param {boolean} auto - default = false - if true -> auto incrememnt image index every 5 seconds
 * @param {boolean} arrows - default = false - if true -> show arrows to manually change image index
 */
const SlideShow = ({ images, auto = false, arrows = false }) => {
  const [state, setState] = React.useState({
    slideShow: images[0],
    slideIndex: 0,
  });
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const { slideShow, slideIndex } = state;

  const [sliderInterval, setSliderInterval] = React.useState(0);
  let currentSlideIndex = 0;

  /**
   * Hook for auto incrementing image index
   * every 5 seconds
   */
  React.useEffect(() => {
    if (auto) {
      const timeInterval = setInterval(() => {
        autoMoveSlide();
      }, 5000);
      setSliderInterval(timeInterval);

      return () => {
        clearInterval(timeInterval);
        clearInterval(sliderInterval);
      };
    }
  }, []);

  /**
   * function called to auto increment image index
   */
  const autoMoveSlide = () => {
    let lastIndex = currentIndex;
    lastIndex = currentSlideIndex + 1;
    currentSlideIndex = lastIndex >= images.length ? 0 : lastIndex;
    setState(prev => (
      {
        ...prev,
        slideIndex: currentSlideIndex,
        slideShow: images[currentSlideIndex]
      }
    ));
  };

  /**
   * arrow click handlers
   * @param {string} type - "prev" || "next" - default: "next"
   */
  const handleArrowClick = (type = 'next') => {
    let index = currentIndex;
    if (type === 'prev') {
      // if going backwards from index 0
      // go to last img
      // else decrement index
      currentIndex <= 0
        ? index = images?.length - 1
        : index -= 1;
    } else if (type === 'next') {
      // if going forward from index === images.lenghth - 1
      // go to first image
      // else incrememnt index
      currentIndex === images?.length - 1
        ? index = 0
        : index += 1;
    }
    setCurrentIndex(index);
    setState(prev => ({
      ...prev,
      slideShow: images[index],
      slideIndex: index
    }));
  };

  /**
   * Functional Component
   *
   * renders Left and Right Arrows
   */
  const RenderArrows = () => {
    return (
      <div className="slider-arrows">
        <div
          className="slider-arrow slider-arrow--left"
          onClick={() => handleArrowClick('prev')}
        />
        <div
          className="slider-arrow slider-arrow--right"
          onClick={() => handleArrowClick('next')}
        />
      </div>
    );
  };

  /**
   * Functional Component
   *
   * renders dots indicating index of image currently displayed
   * @param {int} currentSlide - default 0
   */
  const Indicators = ({ currentSlide = 0 }) => {
    const listIndicators = images.map((_, index) => {
      const btnClasses =
        index === currentSlide
          ? 'slider-navButton slider-navButton--active'
          : 'slider-navButton';
      return (<button className={btnClasses} key={index} />);
    });

    return (
      <div className="slider-nav">
        {listIndicators}
      </div>
    );
  };

  return (
    <div className="slider">
      <div className="slider-slides">
        {
          images && images.length > 0 && slideShow && (
            <div
              className="slider-image"
              style={{ backgroundImage: `url(${slideShow.url})` }}
            />
          )
        }
      </div>
      <Indicators currentSlide={slideIndex} />
      {
        arrows && <RenderArrows />
      }
    </div>
  );
};

SlideShow.propTypes = {
  images: PropTypes.array.isRequired,
  auto: PropTypes.bool,
  arrows: PropTypes.bool,
  currentSlide: PropTypes.number
};

export default SlideShow;
