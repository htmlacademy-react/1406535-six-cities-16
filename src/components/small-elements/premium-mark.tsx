type PremiumMarkProps = {
  classPrefix: 'place-card' | 'offer';
}
function PremiumMark({classPrefix}: PremiumMarkProps) {
  return (
    <div className={`${classPrefix}__mark`}>
      <span>Premium</span>
    </div>
  );
}

export default PremiumMark;
