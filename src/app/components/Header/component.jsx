import React from 'react';
import { Link } from 'react-router-dom';

import useRefreshMovies from '../../services/movies/useRefreshMovies';
import { logo } from '../../assets';
import './styles.scss';

const HEADER_LIST = [
  {
    id: 1,
    iconClass: 'fas fa-film',
    name: 'Now Playing',
    type: 'now_playing',
    route: '/now_playing'
  },
  {
    id: 2,
    iconClass: 'fas fa-fire',
    name: 'Popular',
    type: 'popular',
    route: '/popular'

  },
  {
    id: 3,
    iconClass: 'fas fa-star',
    name: 'Top Rated',
    type: 'top_rated',
    route: '/top_rated'
  },
  {
    id: 4,
    iconClass: 'fas fa-plus-square',
    name: 'Upcoming',
    type: 'upcoming',
    route: '/upcoming'
  },
];

const Header = () => {
  const [navClass, setNavClass] = React.useState(false);
  const [menuClass, setMenuClass] = React.useState(false);

  useRefreshMovies();

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
          <Link to="/" >
            <img src={logo} alt="header logo" />
          </Link>
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
              return (
                <Link to={`${item.route}`} key={item.id} >
                  <li className="header-nav-item">
                    <span className="header-list-name">
                      <i className={item.iconClass} />
                    </span>
                    &nbsp;
                    <span className="header-list-name">{item.name}</span>
                  </li>
                </Link>
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

export default Header;
