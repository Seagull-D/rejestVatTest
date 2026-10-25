import { NavLink } from 'react-router'
import s from './AreaNav.module.css'
import { navAreas } from '../../data/areas'
import StatusDot from '../../components/StatusDot'

const cls = (base: string) => ({ isActive }: { isActive: boolean }) =>
  `${base} ${isActive ? s.active : ''}`

// desktop: вкладки під верхнім рядком
export const AreaTabs = () => (
  <nav className={s.tabs} aria-label="Obszary">
    {navAreas.map(({ path, label, Icon, status }) => (
      <NavLink key={path} to={path} end className={cls(s.tab)}>
        <Icon size={16} />
        {label}
        {status && <StatusDot status={status} />}
      </NavLink>
    ))}
  </nav>
)

// телефон: нижній таб-бар
export const BottomNav = () => (
  <nav className={s.bottom} aria-label="Obszary">
    {navAreas.map(({ path, short, Icon, status }) => (
      <NavLink key={path} to={path} end className={cls(s.bottomItem)}>
        <span className={s.iconWrap}>
          <Icon size={22} />
          {status && status !== 'ready' && <span className={s.corner}><StatusDot status={status} /></span>}
        </span>
        {short}
      </NavLink>
    ))}
  </nav>
)