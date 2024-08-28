import { User } from '../../types';

type OfferHostUserInfoProps = User;
export default function OfferHostUserInfo(props: OfferHostUserInfoProps) {
  const {name, avatarUrl, isPro} = props;

  return (
    <div className="offer__host-user user">
      <div className={`${isPro && 'offer__avatar-wrapper--pro'} offer__avatar-wrapper user__avatar-wrapper`}>
        <img className="offer__avatar user__avatar" src={avatarUrl} width="74" height="74" alt={name}/>
      </div>
      <span className="offer__user-name">{name}</span>
      {isPro && <span className="offer__user-status">Pro</span>}
    </div>
  );
}
