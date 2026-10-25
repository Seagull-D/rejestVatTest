import s from './StatusDot.module.css'
import { statusLabel, type AreaStatus } from '../data/areas'

const StatusDot = ({ status }: { status: AreaStatus }) => (
  <span className={`${s.dot} ${s[status]}`} title={statusLabel[status]} aria-label={statusLabel[status]} />
)

export default StatusDot