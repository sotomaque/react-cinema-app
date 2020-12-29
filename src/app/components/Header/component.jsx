import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { AuthContext } from '../../../auth';
import { SET_QUERY } from '../../actions/types';
import { logo } from '../../assets';
import './styles.scss';

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

const AUTH_LIST = [
  {
    id: 5,
    iconClass: 'fas fa-plus-square',
    name: 'Login',
    type: 'login',
  },
  {
    id: 6,
    iconClass: 'fas fa-plus-square',
    name: 'Sign Up',
    type: 'register',
  }
];

const Header = ({ pageReducers }) => {
  const { authState, signOut } = React.useContext(AuthContext);
  const history = useHistory();
  const dispatch = useDispatch();
  const { query = 'popular' } = pageReducers;
  const [navClass, setNavClass] = React.useState(false);
  const [menuClass, setMenuClass] = React.useState(false);
  const [, setLogoutMessage] = React.useState(false);

  const handleClick = () => {
    setMenuClass(prev => !prev);
    setNavClass(prev => !prev);
    navClass
      ? document.body.classList.add('header-nav-open')
      : document.body.classList.remove('header-nav-open');
  };

  const handleListItemClicked = ({ isActive, type }) => {
    !isActive && dispatch({ type: SET_QUERY, payload: `${type}` });
    if (navClass) {
      setMenuClass(prev => !prev);
      setNavClass(prev => !prev);
    }
  };

  const handleLogoutClicked = () => {
    setLogoutMessage(true);
    setTimeout(() => {
      signOut();
      history.push('/login');
    }, 2000);
  };

  const showAuthList = authState?.status === 'out';
  const showMainLinks = !showAuthList;
  const showSignOut = !showAuthList;

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
            showMainLinks && HEADER_LIST.map(item => {
              const isActive = item?.type === query;
              return (
                <li
                  key={item?.id}
                  className={`header-nav-item ${isActive ? 'active-item' : ''}`}
                  onClick={() => handleListItemClicked({ isActive, type: item?.type })}
                >
                  <span className="header-list-name">
                    <i className={item?.iconClass} />
                  </span>
                  &nbsp;
                  <span className="header-list-name">{item?.name}</span>
                </li>
              );
            })
          }
          {/* Auth Links */}
          {
            showAuthList && AUTH_LIST.map(item => {
              return (
                <Link key={item?.id} to={`/${item?.type}`}>
                <li className='header-nav-item'>
                  <span className="header-list-name">
                    <i className={item?.iconClass} />
                  </span>
                  &nbsp;
                  <span className="header-list-name">{item?.name}</span>
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
          {/* Log Off Button */}
          {
            showSignOut && (
              <li className='header-nav-item' style={{ paddingLeft: 5 }} onClick={() => handleLogoutClicked()}>
                <span className="header-list-name">
                  <i className='fas fa-minus-square' />
                </span>
                &nbsp;
                <span className="header-list-name">Logout</span>
              </li>
            )
          }
        </ul>
      </div>
    </div>
  );
};

Header.propTypes = {
  pageReducers: PropTypes.object.isRequired,
};

export default Header;
