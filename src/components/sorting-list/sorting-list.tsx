import clsx from 'clsx';
import { SortingOption } from '../../const';

type SortingListProps = {
  activeSort: string;
  isOpen: boolean;
  onChange: (sort: string) => void;
  onToggle: () => void;
}

export default function SortingList({activeSort, isOpen, onChange, onToggle}: SortingListProps) {

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={() => onToggle()} >
        {activeSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={clsx('places__options', 'places__options--custom', isOpen && 'places__options--opened')}>
        {Object.values(SortingOption).map((sort) =>
          <li key={sort} className={clsx('places__option', sort === activeSort && 'places__option--active')} tabIndex={0} onClick={() => onChange(sort)}>{sort}</li>)}
      </ul>
    </form>
  );
}
