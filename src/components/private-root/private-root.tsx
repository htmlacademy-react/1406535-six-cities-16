import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getAuthStatus } from '../../store/user/selectors';
import { AppRoute, AuthorizationStatus } from '../../const';

type PrivateRootProps = {
  sign: 'private' | 'common';
  children: JSX.Element;
}

export default function PrivateRoot(props: PrivateRootProps) {
  const {sign, children} = props;
  const authStatus = useAppSelector(getAuthStatus);

  switch (sign) {
    case 'common':
      return (authStatus === AuthorizationStatus.NoAuth ? children : <Navigate to={AppRoute.Root} />);
    case 'private':
      return (authStatus === AuthorizationStatus.Auth ? children : <Navigate to={AppRoute.Login} />);
  }
}
