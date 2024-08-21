type PriceProps = {
  classPrefix: 'place-card' | 'offer';
  price: number;
}

export default function Price({classPrefix, price}: PriceProps) {
  return (
    <div className={`${classPrefix}__price`}>
      <b className={`${classPrefix}__price-value`}>&euro;{price}</b>
      {classPrefix === 'place-card' ?
        (<span className={`${classPrefix}__price-text`}>&#47;&nbsp;night</span>) :
        (<span className={`${classPrefix}__price-text`}>&nbsp;night</span>)}
    </div>
  );
}
