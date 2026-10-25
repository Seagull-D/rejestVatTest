import { useState } from 'react'
import { IconChevronDown, IconLogout, IconMoon, IconSettings, IconSun, IconUser } from '@tabler/icons-react'
import d from '../../components/Dropdown.module.css'
import s from './UserMenu.module.css'
import { useDismiss } from '../../hooks/useDismiss'
import type { Theme } from '../../hooks/useTheme'

type Props = { theme: Theme; onToggleTheme: () => void }

const UserMenu = ({ theme, onToggleTheme }: Props) => {
  const [open, setOpen] = useState(false)
  const ref = useDismiss<HTMLDivElement>(open, () => setOpen(false))

  return (
    <div className={d.wrap} ref={ref}>
      <button className={s.trigger} onClick={() => setOpen(o => !o)} aria-expanded={open} aria-label="Menu konta">
        <span className={s.who}>
          <span className={s.name}>Preview Reviewer</span>
          <span className={s.role}>Konto użytkownika</span>
        </span>
        <span className={s.avatar}>PR</span>
        <IconChevronDown size={16} className={s.chevron} />
      </button>

      {open && (
        <div className={d.menu} role="menu">
          <div className={d.header}>
            <div className={s.hello}>Witaj, Preview Reviewer!</div>
            <div className={d.muted}>Konto użytkownika</div>
          </div>
          <button role="menuitem" className={d.item}><IconUser size={16} /> Moje konto</button>
          <button role="menuitem" className={d.item}><IconSettings size={16} /> Ustawienia</button>
          <button role="menuitem" className={`${d.item} ${s.mobileOnly}`} onClick={onToggleTheme}>
            {theme === 'dark' ? <IconSun size={16} /> : <IconMoon size={16} />}
            {theme === 'dark' ? 'Jasny motyw' : 'Ciemny motyw'}
          </button>
          <button role="menuitem" className={d.item}><IconLogout size={16} /> Wyloguj</button>
        </div>
      )}
    </div>
  )
}

export default UserMenu