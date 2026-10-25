import { IconArrowUpRight, IconArrowDownLeft } from '@tabler/icons-react'
import s from './RegisterTabs.module.css'
import type { RegisterType } from '../../data/demo'

type Props = {
  value: RegisterType
  onChange: (t: RegisterType) => void
  counts: Record<RegisterType, number>
}

const tabs = [
  { id: 'sales', label: 'Sprzedaż', Icon: IconArrowUpRight },
  { id: 'purchases', label: 'Zakupy', Icon: IconArrowDownLeft },
] as const

const RegisterTabs = ({ value, onChange, counts }: Props) => (
  <div className={s.tabs} role="tablist">
    {tabs.map(({ id, label, Icon }) => (
      <button
        key={id}
        role="tab"
        aria-selected={value === id}
        className={`${s.tab} ${value === id ? s.active : ''}`}
        onClick={() => onChange(id)}
      >
        <Icon size={16} />
        {label}
        <span className={s.count}>{counts[id]}</span>
      </button>
    ))}
  </div>
)

export default RegisterTabs