import { useLocation } from 'react-router'
import { IconMoon, IconSun } from '@tabler/icons-react'
import s from './TopBar.module.css'
import { navAreas } from '../../data/areas'
import { useTheme } from '../../hooks/useTheme'
import NotificationsMenu from './NotificationsMenu'
import UserMenu from './UserMenu'

const TopBar = () => {
  const { pathname } = useLocation()
  const { theme, toggle } = useTheme()
  const current = navAreas.find(a => a.path === pathname) ?? navAreas[0]

  return (
    <header className={s.bar}>
      <div className={s.inner}>
        <span className={s.org}>Onsaldo Preview Sp. z o.o.</span>

        {/* телефон: назва поточної області */}
        <span className={s.mobileTitle}>
          <current.Icon size={18} />
          {current.label}
        </span>

        <div className={s.actions}>
          <button
            className={`${s.iconBtn} ${s.desktopOnly}`}
            onClick={toggle}
            aria-label={theme === 'dark' ? 'Jasny motyw' : 'Ciemny motyw'}
          >
            {theme === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
          </button>
          <NotificationsMenu />
          <span className={s.divider} />
          <UserMenu theme={theme} onToggleTheme={toggle} />
        </div>
      </div>
    </header>
  )
}

export default TopBar