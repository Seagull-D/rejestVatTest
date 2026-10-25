export type Period = { year: number; month: number } // month 1–12

export type Filters = {
  operation: string
  jpk: string
  series: string
}

export const defaultFilters: Filters = { operation: 'all', jpk: 'all', series: 'all' }

export const activeFiltersCount = (f: Filters) =>
  Object.values(f).filter(v => v !== 'all').length

export const inPeriod = (date: string, p: Period) =>
  date.startsWith(`${p.year}-${String(p.month).padStart(2, '0')}`)

export type DemoMode = 'auto' | 'empty' | 'error'