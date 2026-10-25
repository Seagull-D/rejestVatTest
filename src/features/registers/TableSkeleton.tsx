import s from './TableSkeleton.module.css'

const TableSkeleton = ({ rows = 6 }: { rows?: number }) => (
  <div className={s.table} aria-busy="true" aria-label="Ładowanie dokumentów">
    {Array.from({ length: rows }, (_, i) => (
      <div key={i} className={s.row}>
        <span className={s.bar} style={{ width: '60%' }} />
        <span className={s.bar} style={{ width: '70%' }} />
        <span className={s.bar} style={{ width: '85%' }} />
        <span className={s.bar} style={{ width: '50%' }} />
      </div>
    ))}
  </div>
)

export default TableSkeleton