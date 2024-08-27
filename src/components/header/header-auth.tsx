import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { logoutAction } from '../../store/api-action';
import { getAuthStatus, getUserInfo } from '../../store/user/selectors';
import { getFavorite } from '../../store/favorite/selectors';
import { AppRoute, AuthorizationStatus } from '../../const';

export default function HeaderAuth() {
  const authStatus = useAppSelector(getAuthStatus);
  const userInfo = useAppSelector(getUserInfo);
  const favoriteCount = useAppSelector(getFavorite).length;
  const dispatch = useAppDispatch();

  const handleLogoutClick = () => {
    dispatch(logoutAction());
  };

  if (authStatus !== AuthorizationStatus.Auth || userInfo === null) {
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
            <span className="header__favorite-count">{favoriteCount}</span>
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
