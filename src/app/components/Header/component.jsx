import React from 'react';
import PropTypes from 'prop-types';

import { logo } from '../../assets';
import './styles.scss';
import { useDispatch } from 'react-redux';
import { SET_QUERY } from '../../actions/types';

const HEADER_LIST = [
  {
    id: 1,
    iconClass: 'fas fa-film',
    name: 'Now Playing',
    type: 'now_playing',
  },
  {
    id: 2,
    iconClass: 'fas fa-fire',
    name: 'Popular',
    type: 'popular',
  },
  {
    id: 3,
    iconClass: 'fas fa-star',
    name: 'Top Rated',
    type: 'top_rated',
  },
  {
    id: 4,
    iconClass: 'fas fa-plus-square',
    name: 'Upcoming',
    type: 'upcoming',
  },
];

/**
 * Nav bar component
 *
 * @param {string} query (state) - selected query
 *  i.e. 'popular', 'upcoming', 'nowPlaying', etc
 * @param {funct} setQuery - sets query state value
 */
const Header = ({ pageReducers }) => {
  const dispatch = useDispatch();
  const { query = 'popular' } = pageReducers;
  const [navClass, setNavClass] = React.useState(false);
  const [menuClass, setMenuClass] = React.useState(false);

  const handleClick = () => {
    setMenuClass(prev => !prev);
    setNavClass(prev => !prev);
    navClass
      ? document.body.classList.add('header-nav-open')
      : document.body.classList.remove('header-nav-open');
  };

  return (
    <div className="header-nav-wrapper">
      <div className="header-bar" />
      <div className="header-navbar">
        {/* Logo */}
        <div className="header-image">
          <img src={logo} alt="header logo" />
        </div>
        {/* Menu Button */}
        <div
          className={`header-menu-toggle ${menuClass ? 'is-active' : ''}`}
          id="header-mobile-menu"
          onClick={() => handleClick()}
        >
          {/* Menu Options */}
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </div>
        {/* Menu Options */}
        <ul className={`header-nav ${navClass ? 'header-mobile-nav' : ''}`}>
          {/* Links */}
          {
            HEADER_LIST.map(item => {
              const isActive = item.type === query;
              return (
                <li
                  key={item.id}
                  className={`header-nav-item ${isActive ? 'active-item' : ''}`}
                  onClick={() => !isActive && dispatch({ type: SET_QUERY, payload: `${item.type}` })}
                >
                  <span className="header-list-name">
                    <i className={item.iconClass} />
                  </span>
                  &nbsp;
                  <span className="header-list-name">{item.name}</span>
                </li>
              );
            })
          }
          {/* Search Input */}
          <input
            placeholder="Search for a Movie"
            type="text"
            className="search-input"
          />
        </ul>
      </div>
    </div>
  );
};

Header.propTypes = {
  pageReducers: PropTypes.object.isRequired,
};

export default Header;
