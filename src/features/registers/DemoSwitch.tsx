import s from './DemoSwitch.module.css'
import type { DemoMode } from './types'

const modes: { id: DemoMode; label: string }[] = [
  { id: 'auto', label: 'Dane' },
  { id: 'empty', label: 'Pusto' },
  { id: 'error', label: 'Błąd' },
]

const DemoSwitch = ({ value, onChange }: { value: DemoMode; onChange: (m: DemoMode) => void }) => (
  <div className={s.switch} role="radiogroup" aria-label="Stan demonstracyjny">
    <span className={s.label}>Demo</span>
    {modes.map(m => (
      <button
        key={m.id}
        role="radio"
        aria-checked={value === m.id}
        className={`${s.btn} ${value === m.id ? s.on : ''}`}
        onClick={() => onChange(m.id)}
      >
        {m.label}
      </button>
    ))}
  </div>
)

export default DemoSwitch