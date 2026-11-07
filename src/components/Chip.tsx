/** UI/Chip: small pill with an icon and a label. */
export function Chip({ icon, children }: { icon?: string; children: string }) {
  return (
    <span className="chip t-body-strong">
      {icon && <img src={icon} width={16} height={16} alt="" />}
      {children}
    </span>
  )
}
