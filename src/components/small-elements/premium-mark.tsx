type PremiumMarkProps = {
  classPrefix: 'place-card' | 'offer';
}
export default function PremiumMark({classPrefix}: PremiumMarkProps) {
  return (
    <div className={`${classPrefix}__mark`}>
      <span>Premium</span>
    </div>
  );
}
