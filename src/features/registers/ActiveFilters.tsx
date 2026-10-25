import { IconX } from '@tabler/icons-react'
import s from './ActiveFilters.module.css'
import { jpkOptions, operationOptions, seriesOptions } from '../../data/demo'
import { defaultFilters, type Filters } from './types'

type Props = {
  filters: Filters
  tags: string[]
  onFiltersChange: (f: Filters) => void
  onTagsChange: (t: string[]) => void
}

const labelOf = (opts: readonly { value: string; label: string }[], v: string) =>
  opts.find(o => o.value === v)?.label ?? v

const ActiveFilters = ({ filters, tags, onFiltersChange, onTagsChange }: Props) => {
  const chips = [
    filters.operation !== 'all' && {
      key: 'operation', label: `Operacja: ${labelOf(operationOptions, filters.operation)}`,
      remove: () => onFiltersChange({ ...filters, operation: 'all' }),
    },
    filters.jpk !== 'all' && {
      key: 'jpk', label: `JPK: ${labelOf(jpkOptions, filters.jpk)}`,
      remove: () => onFiltersChange({ ...filters, jpk: 'all' }),
    },
    filters.series !== 'all' && {
      key: 'series', label: `Seria: ${labelOf(seriesOptions, filters.series)}`,
      remove: () => onFiltersChange({ ...filters, series: 'all' }),
    },
    ...tags.map(t => ({
      key: `tag-${t}`, label: `#${t}`,
      remove: () => onTagsChange(tags.filter(x => x !== t)),
    })),
  ].filter(Boolean) as { key: string; label: string; remove: () => void }[]

  if (!chips.length) return null

  return (
    <div className={s.chips}>
      {chips.map(c => (
        <button key={c.key} className={s.chip} onClick={c.remove} aria-label={`Usuń filtr ${c.label}`}>
          {c.label}
          <IconX size={12} />
        </button>
      ))}
      <button
        className={s.clearAll}
        onClick={() => { onFiltersChange(defaultFilters); onTagsChange([]) }}
      >
        Wyczyść wszystko
      </button>
    </div>
  )
}

export default ActiveFilters