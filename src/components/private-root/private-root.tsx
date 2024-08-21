import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';

type PrivateRootProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

export default function PrivateRoot(props: PrivateRootProps) {
  const { authorizationStatus, children } = props;

  return (
    authorizationStatus === AuthorizationStatus.Auth ? children : <Navigate to={AppRoute.Login} />
  );
}
