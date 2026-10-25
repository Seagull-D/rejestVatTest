import type { ReactNode } from 'react'
import { IconInfoCircle } from '@tabler/icons-react'
import s from './DemoNotice.module.css'

type Props = { children: ReactNode; action?: { label: string; onClick: () => void } }

const DemoNotice = ({ children, action }: Props) => (
  <div className={s.notice} role="note">
    <IconInfoCircle size={16} />
    <span className={s.text}>{children}</span>
    {action && <button className={s.action} onClick={action.onClick}>{action.label}</button>}
  </div>
)

export default DemoNotice
