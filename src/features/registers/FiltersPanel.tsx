import { IconFilterOff, IconX } from '@tabler/icons-react'
import s from './FiltersPanel.module.css'
import { jpkOptions, operationOptions, seriesOptions } from '../../data/demo'
import type { Filters } from './types'

type Props = {
  value: Filters
  onChange: (f: Filters) => void
  onReset: () => void
  onClose: () => void
}

const fields = [
  { key: 'operation', label: 'Rodzaj operacji', options: operationOptions },
  { key: 'jpk', label: 'Kod JPK V7', options: jpkOptions },
  { key: 'series', label: 'Serie dokumentów', options: seriesOptions },
] as const

const FiltersPanel = ({ value, onChange, onReset, onClose }: Props) => (
  <>
    {/* backdrop видно лише на телефоні */}
    <div className={s.backdrop} onClick={onClose} />

    <div className={s.panel} role="dialog" aria-label="Filtry">
      <div className={s.sheetHead}>
        <span>Filtry</span>
        <button className={s.iconBtn} onClick={onClose} aria-label="Zamknij">
          <IconX size={18} />
        </button>
      </div>

      <div className={s.grid}>
        {fields.map(f => (
          <label key={f.key} className={s.field}>
            <span>{f.label}</span>
            <select
              value={value[f.key]}
              onChange={e => onChange({ ...value, [f.key]: e.target.value })}
            >
              {f.options.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </label>
        ))}
      </div>

      <div className={s.footer}>
        <button className={s.reset} onClick={onReset}>
          <IconFilterOff size={16} /> Wyczyść filtry
        </button>
        <button className={s.done} onClick={onClose}>Gotowe</button>
      </div>
    </div>
  </>
)

export default FiltersPanel