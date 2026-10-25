import { Fragment, useState } from 'react'
import { IconArrowDown, IconArrowUp, IconArrowsSort, IconChevronDown } from '@tabler/icons-react'
import s from './DocumentsTable.module.css'
import type { Doc } from '../../data/demo'
import { formatDate, formatMoney, vatOf } from '../../lib/format'
import { columnDefs, type ColumnKey, type ColumnState, type Sort } from './columns'

type Props = {
  docs: Doc[]
  columns: ColumnState[]
  sort: Sort
  onSortChange: (s: Sort) => void
}

const operationLabel = { domestic: 'Krajowa', wdt: 'WDT', import: 'Import' }

const KsefBadge = ({ value }: { value: string | null }) =>
  value ? (
    <span className={s.mono}>{value}</span>
  ) : (
    <span className={s.ksef}>
      <span className={s.dot} /> Brak potwierdzenia
    </span>
  )

const renderCell = (key: ColumnKey, d: Doc) => {
  switch (key) {
    case 'contractor': return <span className={s.contractor}>{d.contractor}</span>
    case 'date': return <span className={s.muted}>{formatDate(d.date)}</span>
    case 'number': return <span className={s.mono}>{d.number}</span>
    case 'ksef': return <KsefBadge value={d.ksef} />
    case 'id': return <span className={`${s.mono} ${s.muted}`}>{d.id}</span>
  }
}

const DocumentsTable = ({ docs, columns, sort, onSortChange }: Props) => {
  const [openId, setOpenId] = useState<string | null>(null)

  const visible = columns.filter(c => c.visible).map(c => columnDefs[c.key])
  const template = [...visible.map(c => c.width), '40px'].join(' ')

  const toggleSort = (key: ColumnKey) =>
    onSortChange(
      sort.key === key
        ? { key, dir: sort.dir === 'asc' ? 'desc' : 'asc' }
        : { key, dir: 'asc' },
    )

  return (
    <div className={s.table} role="table" aria-label="Dokumenty">
      {/* заголовок — лише desktop */}
      <div className={`${s.row} ${s.head}`} role="row" style={{ gridTemplateColumns: template }}>
        {visible.map(c => {
          const active = sort.key === c.key
          const Icon = !active ? IconArrowsSort : sort.dir === 'asc' ? IconArrowUp : IconArrowDown
          return (
            <button
              key={c.key}
              role="columnheader"
              aria-sort={active ? (sort.dir === 'asc' ? 'ascending' : 'descending') : 'none'}
              className={`${s.sortBtn} ${active ? s.sortActive : ''}`}
              onClick={() => toggleSort(c.key)}
            >
              {c.label}
              <Icon size={14} />
            </button>
          )
        })}
        <span />
      </div>

      {docs.map(d => {
        const open = openId === d.id
        const vat = vatOf(d)
        return (
          <Fragment key={d.id}>
            <div
              role="row"
              tabIndex={0}
              aria-expanded={open}
              className={`${s.row} ${s.item} ${open ? s.open : ''}`}
              style={{ gridTemplateColumns: template }}
              onClick={() => setOpenId(open ? null : d.id)}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setOpenId(open ? null : d.id)
                }
              }}
            >
              {/* desktop: клітинки за колонками */}
              {visible.map(c => (
                <span key={c.key} role="cell" className={s.cell}>
                  {renderCell(c.key, d)}
                </span>
              ))}
              <IconChevronDown size={16} className={s.chevron} />

              {/* телефон: фіксована картка */}
              <div className={s.card}>
                <span className={s.contractor}>{d.contractor}</span>
                <span className={s.muted}>{formatDate(d.date)}</span>
                <span className={`${s.mono} ${s.muted}`}>{d.number}</span>
                <KsefBadge value={d.ksef} />
              </div>
            </div>

            {open && (
              <dl className={s.details}>
                <div><dt>Netto</dt><dd>{formatMoney(d.net)}</dd></div>
                <div><dt>VAT {d.rate === 'np' ? 'np' : `${d.rate}%`}</dt><dd>{formatMoney(vat)}</dd></div>
                <div><dt>Brutto</dt><dd>{formatMoney(d.net + vat)}</dd></div>
                <div><dt>Numer KSeF</dt><dd>{d.ksef ?? 'Brak potwierdzenia'}</dd></div>
                <div><dt>Identyfikator</dt><dd className={s.mono}>{d.id}</dd></div>
                <div><dt>Numer dokumentu</dt><dd className={s.mono}>{d.number}</dd></div>
                <div><dt>Tagi</dt><dd>{d.tags.length ? d.tags.map(t => `#${t}`).join(' ') : '—'}</dd></div>
                <div><dt>Rodzaj operacji</dt><dd>{operationLabel[d.operation]}</dd></div>
                <div><dt>Kod JPK V7</dt><dd>{d.jpk ?? '—'}</dd></div>
              </dl>
            )}
          </Fragment>
        )
      })}
    </div>
  )
}

export default DocumentsTable