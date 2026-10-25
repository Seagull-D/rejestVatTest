import { IconColumns3, IconDownload, IconPrinter, IconTag } from '@tabler/icons-react'
import s from './MoreMenu.module.css'

export type MenuAction = 'tags' | 'print' | 'export' | 'columns'

type Props = {
  onAction: (a: MenuAction) => void
  perPage: number
  onPerPageChange: (n: number) => void
}

const items = [
  { id: 'tags', label: 'Tagi', Icon: IconTag },
  { id: 'print', label: 'Drukuj', Icon: IconPrinter },
  { id: 'export', label: 'Eksportuj CSV', Icon: IconDownload },
  { id: 'columns', label: 'Kolumny', Icon: IconColumns3 },
] as const

const MoreMenu = ({ onAction, perPage, onPerPageChange }: Props) => (
  <div className={s.menu} role="menu">
    {items.map(({ id, label, Icon }) => (
      <button key={id} role="menuitem" className={s.item} onClick={() => onAction(id)}>
        <Icon size={16} className={s.icon} />
        {label}
      </button>
    ))}

    <div className={s.divider} />

    <div className={s.perPage}>
      <span>Wierszy na stronie</span>
      <div className={s.seg}>
        {[10, 20, 50].map(n => (
          <button
            key={n}
            className={`${s.segBtn} ${perPage === n ? s.segActive : ''}`}
            onClick={() => onPerPageChange(n)}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  </div>
)

export default MoreMenu