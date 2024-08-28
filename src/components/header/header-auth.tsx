import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { logoutAction } from '../../store/api-action';
import { getUserInfo } from '../../store/user/selectors';
import { getFavorite } from '../../store/favorite/selectors';
import { AppRoute } from '../../const';
import { useEffect } from 'react';

export default function HeaderAuth() {
  const userInfo = useAppSelector(getUserInfo);
  const favorites = useAppSelector(getFavorite);
  const dispatch = useAppDispatch();
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(favorites.length);
  }, [dispatch, favorites]);

  const handleLogoutClick = () => {
    dispatch(logoutAction());
  };

  if (userInfo === null) {
    return (
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <Link to={AppRoute.Login} className="header__nav-link header__nav-link--profile">
              <div className="header__avatar-wrapper user__avatar-wrapper"></div>
              <span className="header__login">Sign in</span>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link to={AppRoute.Favorites} className="header__nav-link header__nav-link--profile">
            <div className="header__avatar-wrapper user__avatar-wrapper"></div>
            <span className="header__user-name user__name">{userInfo?.email}</span>
            <span className="header__favorite-count">{count}</span>
          </Link>
        </li>
        <li className="header__nav-item" onClick={handleLogoutClick}>
          <a className="header__nav-link">
            <span className="header__signout">Sign out</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
