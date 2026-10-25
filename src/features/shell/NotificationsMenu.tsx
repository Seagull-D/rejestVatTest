import { useState } from 'react'
import { IconBell } from '@tabler/icons-react'
import d from '../../components/Dropdown.module.css'
import s from './TopBar.module.css'
import n from './NotificationsMenu.module.css'
import { useDismiss } from '../../hooks/useDismiss'

const initial = [
  { id: 1, title: 'Kontekst VAT wymaga potwierdzenia', time: 'dziś', unread: true },
  { id: 2, title: 'Okres księgowy 2026 nie jest skonfigurowany', time: 'dziś', unread: true },
  { id: 3, title: 'Nowe dokumenty w rejestrze sprzedaży', time: 'wczoraj', unread: true },
  { id: 4, title: 'Kontrole: 3 pozycje do przejrzenia', time: '2 dni temu', unread: true },
]

const NotificationsMenu = () => {
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState(initial)
  const ref = useDismiss<HTMLDivElement>(open, () => setOpen(false))
  const unread = items.filter(i => i.unread).length

  return (
    <div className={d.wrap} ref={ref}>
      <button
        className={s.iconBtn}
        onClick={() => setOpen(o => !o)}
        aria-label={`Powiadomienia, nieprzeczytane: ${unread}`}
        aria-expanded={open}
      >
        <IconBell size={18} />
        {unread > 0 && <span className={n.badge}>{unread}</span>}
      </button>

      {open && (
        <div className={d.menu} role="menu">
          <div className={`${d.header} ${n.head}`}>
            <strong>Powiadomienia</strong>
            {unread > 0 && (
              <button className={n.link} onClick={() => setItems(i => i.map(x => ({ ...x, unread: false })))}>
                Oznacz jako przeczytane
              </button>
            )}
          </div>
          {items.map(i => (
            <button
              key={i.id}
              role="menuitem"
              className={d.item}
              onClick={() => setItems(list => list.map(x => (x.id === i.id ? { ...x, unread: false } : x)))}
            >
              <span className={`${n.dot} ${i.unread ? n.unread : ''}`} />
              <span className={n.text}>
                {i.title}
                <span className={d.muted}>{i.time}</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default NotificationsMenu
