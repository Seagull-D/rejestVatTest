import type { ReactNode } from 'react'
import { IconX } from '@tabler/icons-react'
import s from './Sheet.module.css'
import { useDismiss } from '../hooks/useDismiss'

type Props = {
  title: string
  onClose: () => void
  children: ReactNode
}

const Sheet = ({ title, onClose, children }: Props) => {
  const ref = useDismiss<HTMLDivElement>(true, onClose)

  return (
    <div className={s.overlay}>
      <div className={s.panel} ref={ref} role="dialog" aria-modal="true" aria-label={title}>
        <div className={s.head}>
          <span>{title}</span>
          <button className={s.close} onClick={onClose} aria-label="Zamknij">
            <IconX size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Sheet