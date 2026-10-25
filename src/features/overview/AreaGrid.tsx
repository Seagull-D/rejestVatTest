import { Link } from 'react-router'
import { IconArrowUpRight } from '@tabler/icons-react'
import s from './AreaGrid.module.css'
import { statusLabel, type AreaStatus, type Availability } from '../../data/areas'
import StatusDot from '../../components/StatusDot'

export type AreaView = Availability & { meta?: string }

const legend: AreaStatus[] = ['ready', 'setup', 'off']
const order: Record<AreaStatus, number> = { setup: 0, ready: 1, off: 2 }

const Tile = ({ area }: { area: AreaView }) => {
  const { Icon, label, status, hint, meta, link, description } = area
  const inner = (
    <>
      <span className={s.top}>
        <span className={s.icon}><Icon size={18} /></span>
        {link && status !== 'off' && <IconArrowUpRight size={18} className={s.arrow} />}
      </span>
      <span className={s.name}>{label}</span>
      {meta && <span className={s.meta}>{meta}</span>}
      {status !== 'setup' && <span className={s.hint}>{hint}</span>}
      <span className={`${s.chip} ${s[status]}`}>
        <StatusDot status={status} />
        <span className={s.chipText}>{status === 'setup' ? hint : statusLabel[status]}</span>
      </span>
    </>
  )

  // недоступні та без маршруту — не клікабельні
  return link && status !== 'off' ? (
    <Link to={link} className={`${s.tile} ${s.link}`} title={description}>{inner}</Link>
  ) : (
    <div className={`${s.tile} ${status === 'off' ? s.dim : ''}`} title={description}>{inner}</div>
  )
}

const AreaGrid = ({ areas }: { areas: AreaView[] }) => {
  const sorted = [...areas].sort((a, b) => order[a.status] - order[b.status])

  return (
    <section aria-label="Obszary">
      <div className={s.head}>
        <div>
          <h2 className={s.title}>Obszary</h2>
          <p className={s.text}>Status pokazuje gotowość warunków, ale nie uruchamia księgowania ani operacji zewnętrznych.</p>
        </div>
        <div className={s.legend}>
          {legend.map(st => (
            <span key={st}><StatusDot status={st} /> {statusLabel[st]}</span>
          ))}
        </div>
      </div>

      <div className={s.grid}>
        {sorted.map(a => <Tile key={a.id} area={a} />)}
      </div>
    </section>
  )
}

export default AreaGrid
