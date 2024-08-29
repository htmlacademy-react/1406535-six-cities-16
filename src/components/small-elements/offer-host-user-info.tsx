import { User } from '../../types';
import clsx from 'clsx';

type OfferHostUserInfoProps = User;
export default function OfferHostUserInfo(props: OfferHostUserInfoProps) {
  const {name, avatarUrl, isPro} = props;

  return (
    <div className="offer__host-user user">
      <div className={clsx('offer__avatar-wrapper', isPro && 'offer__avatar-wrapper--pro', 'user__avatar-wrapper')}>
        <img className="offer__avatar user__avatar" src={avatarUrl} width="74" height="74" alt={name}/>
      </div>
      <span className="offer__user-name">{name}</span>
      {isPro && <span className="offer__user-status">Pro</span>}
    </div>
  );
}
