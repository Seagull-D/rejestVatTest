import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import s from './Pagination.module.css'

type Props = {
  page: number
  pages: number
  total: number
  perPage: number
  onPageChange: (p: number) => void
}

const Pagination = ({ page, pages, total, perPage, onPageChange }: Props) => {
  const from = (page - 1) * perPage + 1
  const to = Math.min(page * perPage, total)

  return (
    <nav className={s.pagination} aria-label="Stronicowanie">
      <span className={s.info}>{from}–{to} z {total}</span>
      {pages > 1 && (
        <div className={s.controls}>
          <button
            className={s.btn}
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            aria-label="Poprzednia strona"
          >
            <IconChevronLeft size={16} />
          </button>
          <span className={s.page}>{page} / {pages}</span>
          <button
            className={s.btn}
            onClick={() => onPageChange(page + 1)}
            disabled={page === pages}
            aria-label="Następna strona"
          >
            <IconChevronRight size={16} />
          </button>
        </div>
      )}
    </nav>
  )
}

export default Pagination