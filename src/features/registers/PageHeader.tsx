import { useState } from 'react'
import { IconCalendar, IconChevronDown } from '@tabler/icons-react'
import s from './PageHeader.module.css'
import { months } from '../../data/demo'
import type { Period } from './types'
import { useDismiss } from '../../hooks/useDismiss'


type Props = {
  period: Period
  onPeriodChange: (p: Period) => void
}

const capitalize = (t: string) => t[0].toUpperCase() + t.slice(1)

const PageHeader = ({ period, onPeriodChange }: Props) => {
  const [open, setOpen] = useState(false)
  const ref = useDismiss<HTMLDivElement>(open, ()=> setOpen(false))

  return (
    <header className={s.header}>
      <div className={s.titles}>
        <div className={s.company}>
          Onsaldo Preview Sp. z o.o.
          <span className={s.badge}>DEMO</span>
        </div>
        <h1 className={s.title}>Rejestry i VAT</h1>
      </div>

      <div className={s.periodWrap} ref={ref}>
        <button className={s.periodBtn} onClick={() => setOpen(o => !o)} aria-expanded={open}>
          <IconCalendar size={16} className={s.muted} />
          <span>{capitalize(months[period.month - 1])} {period.year}</span>
          <IconChevronDown size={16} />
        </button>

        {open && (
          <div className={s.popover}>
            <label className={s.field}>
              <span>Rok</span>
              <select
                value={period.year}
                onChange={e => onPeriodChange({ ...period, year: Number(e.target.value) })}
              >
                {[2024, 2025, 2026].map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </label>
            <label className={s.field}>
              <span>Miesiąc</span>
              <select
                value={period.month}
                onChange={e => onPeriodChange({ ...period, month: Number(e.target.value) })}
              >
                {months.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
              </select>
            </label>
          </div>
        )}
      </div>
    </header>
  )
}

export default PageHeader