import { IconFileSearch, IconFilterOff } from '@tabler/icons-react'
import s from './StateBox.module.css'

type Props =
  | { kind: 'period'; periodLabel: string; onPrevPeriod: () => void }
  | { kind: 'filters'; onReset: () => void }

const EmptyState = (p: Props) =>
  p.kind === 'period' ? (
    <div className={s.box}>
      <IconFileSearch size={28} className={s.icon} />
      <h3 className={s.title}>Brak dokumentów za {p.periodLabel}</h3>
      <p className={s.text}>W tym okresie nie zaksięgowano jeszcze żadnych dokumentów.</p>
      <button className={s.btn} onClick={p.onPrevPeriod}>Poprzedni miesiąc</button>
    </div>
  ) : (
    <div className={s.box}>
      <IconFilterOff size={28} className={s.icon} />
      <h3 className={s.title}>Nic nie pasuje do wyszukiwania</h3>
      <p className={s.text}>Zmień frazę lub wyczyść filtry, aby zobaczyć wszystkie dokumenty.</p>
      <button className={s.btn} onClick={p.onReset}>Wyczyść filtry</button>
    </div>
  )

export default EmptyState