/** UI/Stat: icon + big number + label. */
export function Stat({ icon, value, label }: { icon: string; value: string; label: string }) {
  return (
    <div className="stat">
      <div className="stat__row">
        <img src={icon} width={20} height={20} alt="" />
        <span className="t-h1">{value}</span>
      </div>
      <span className="t-caption stat__label">{label}</span>
    </div>
  )
}
