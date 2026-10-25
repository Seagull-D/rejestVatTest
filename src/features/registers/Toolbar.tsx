import { useState } from 'react'
import { IconAdjustmentsHorizontal, IconDots, IconSearch, IconX } from '@tabler/icons-react'
import s from './Toolbar.module.css'
import { useDismiss } from '../../hooks/useDismiss'
import FiltersPanel from './FiltersPanel'
import MoreMenu, { type MenuAction } from './MoreMenu'
import { activeFiltersCount, defaultFilters, type Filters } from './types'

type Props = {
  query: string
  onQueryChange: (q: string) => void
  filters: Filters
  onFiltersChange: (f: Filters) => void
  perPage: number
  onPerPageChange: (n: number) => void
  onAction: (a: MenuAction) => void
}

const Toolbar = (p: Props) => {
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const filtersRef = useDismiss<HTMLDivElement>(filtersOpen, () => setFiltersOpen(false))
  const menuRef = useDismiss<HTMLDivElement>(menuOpen, () => setMenuOpen(false))

  const count = activeFiltersCount(p.filters)

  return (
    <div ref={filtersRef}>
      <div className={s.bar}>
        <div className={s.search}>
          <IconSearch size={16} className={s.searchIcon} />
          <input
            type="search"
            value={p.query}
            onChange={e => p.onQueryChange(e.target.value)}
            placeholder="Kontrahent, numer, identyfikator"
            aria-label="Szukaj"
          />
          {p.query && (
            <button className={s.clear} onClick={() => p.onQueryChange('')} aria-label="Wyczyść">
              <IconX size={14} />
            </button>
          )}
        </div>

        <button
          className={`${s.btn} ${filtersOpen ? s.btnActive : ''}`}
          onClick={() => setFiltersOpen(o => !o)}
          aria-expanded={filtersOpen}
        >
          <IconAdjustmentsHorizontal size={18} />
          <span className={s.btnLabel}>Filtry</span>
          {count > 0 && <span className={s.badge}>{count}</span>}
        </button>

        <div className={s.menuWrap} ref={menuRef}>
          <button
            className={`${s.btn} ${s.square}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Więcej działań"
            aria-expanded={menuOpen}
          >
            <IconDots size={18} />
          </button>
          {menuOpen && (
            <MoreMenu
              perPage={p.perPage}
              onPerPageChange={n => { p.onPerPageChange(n); setMenuOpen(false) }}
              onAction={a => { p.onAction(a); setMenuOpen(false) }}
            />
          )}
        </div>
      </div>

      {filtersOpen && (
        <FiltersPanel
          value={p.filters}
          onChange={p.onFiltersChange}
          onReset={() => p.onFiltersChange(defaultFilters)}
          onClose={() => setFiltersOpen(false)}
        />
      )}
    </div>
  )
}

export default Toolbar