/** UI/Segmented control (tabs style): a grey track with a white selected segment, e.g. "This week | All time". */
export function SegmentedTabs<T extends string>({ label, options, value, onChange }: { label: string; options: { key: T; label: string }[]; value: T; onChange: (v: T) => void }) {
  return (
    <div className="seg-tabs" role="tablist" aria-label={label}>
      {options.map((o) => (
        <button key={o.key} type="button" role="tab" aria-selected={value === o.key} className={`seg-tabs__item t-body${value === o.key ? ' seg-tabs__item--on t-body-strong' : ''}`} onClick={() => onChange(o.key)}>
          {o.label}
        </button>
      ))}
    </div>
  )
}
