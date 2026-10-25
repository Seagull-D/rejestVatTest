import { Link, useLocation } from 'react-router'
import { IconArrowLeft } from '@tabler/icons-react'
import s from './AreaPlaceholder.module.css'
import { navAreas, statusLabel } from '../../data/areas'
import StatusDot from '../../components/StatusDot'

const AreaPlaceholder = () => {
  const { pathname } = useLocation()
  const area = navAreas.find(a => a.path === pathname)

  if (!area) {
    return (
      <main className={s.box}>
        <h1 className={s.title}>Nie znaleziono strony</h1>
        <Link to="/" className={s.link}><IconArrowLeft size={16} /> Wróć do przeglądu</Link>
      </main>
    )
  }

  return (
    <main className={s.box}>
      <span className={s.icon}><area.Icon size={28} /></span>
      <h1 className={s.title}>{area.label}</h1>
      {area.status && (
        <span className={s.status}><StatusDot status={area.status} /> {statusLabel[area.status]}</span>
      )}
      <p className={s.text}>Obszar w przygotowaniu. Wróć tu po skonfigurowaniu okresu księgowego.</p>
      <Link to="/" className={s.link}><IconArrowLeft size={16} /> Wróć do przeglądu</Link>
    </main>
  )
}

export default AreaPlaceholder