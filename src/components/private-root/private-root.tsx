import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getAuthStatus } from '../../store/user/selectors';
import { AppRoute, AuthorizationStatus } from '../../const';

type PrivateRootProps = {
  children: JSX.Element;
}

export default function PrivateRoot({children}: PrivateRootProps) {
  const authStatus = useAppSelector(getAuthStatus);

  return (authStatus === AuthorizationStatus.Auth ? children : <Navigate to={AppRoute.Login} />);
}
