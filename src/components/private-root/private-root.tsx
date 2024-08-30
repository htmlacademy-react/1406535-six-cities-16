import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getAuthStatus } from '../../store/user-slice/selectors';
import { AppRoute, AuthorizationStatus } from '../../const';

type PrivateRootProps = {
  noAuth?: boolean;
  children: JSX.Element;
}

export default function PrivateRoot({noAuth, children}: PrivateRootProps) {
  const authStatus = useAppSelector(getAuthStatus);

  if (noAuth) {
    return (authStatus !== AuthorizationStatus.Auth ? children : <Navigate to={AppRoute.Root} />);
  }
  return (authStatus === AuthorizationStatus.Auth ? children : <Navigate to={AppRoute.Login} />);
}
