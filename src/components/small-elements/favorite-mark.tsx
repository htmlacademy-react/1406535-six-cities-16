type FavoriteMarkProps = {
  classPrefix: 'place-card' | 'offer';
  isFavorite: boolean;
  onClick: () => void;
}

export default function FavoriteMark({classPrefix, isFavorite, onClick}: FavoriteMarkProps) {
  const size = classPrefix === 'offer' ? [31, 33] : [18, 19];
  const favoriteMark = isFavorite ? `${classPrefix}__bookmark-button--active` : null;

  return (
    <button className={`${classPrefix}__bookmark-button ${favoriteMark} button`} type="button" onClick={onClick}>
      <svg className={`${classPrefix}__bookmark-icon`} width={size[0]} height={size[1]}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}
