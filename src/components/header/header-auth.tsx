import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getUserInfo } from '../../store/user/selectors';
import { getFavorite } from '../../store/favorite/selectors';
import { logoutAction } from '../../store/api-action';
import { AppRoute } from '../../const';

export default function HeaderAuth() {
  const userInfo = useAppSelector(getUserInfo);
  const favorites = useAppSelector(getFavorite);
  const dispatch = useAppDispatch();
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(favorites.length);
  }, [favorites]);

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
          <Link to="#" className="header__nav-link">
            <span className="header__signout">Sign out</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
