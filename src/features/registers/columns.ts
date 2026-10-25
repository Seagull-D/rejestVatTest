export type ColumnKey = 'contractor' | 'date' | 'number' | 'ksef' | 'id'

export type ColumnDef = {
  key: ColumnKey
  label: string
  width: string // для grid-template-columns
}

export const columnDefs: Record<ColumnKey, ColumnDef> = {
  contractor: { key: 'contractor', label: 'Kontrahent', width: 'minmax(140px, 1.4fr)' },
  date: { key: 'date', label: 'Data', width: '110px' },
  number: { key: 'number', label: 'Numer dokumentu', width: 'minmax(170px, 1.6fr)' },
  ksef: { key: 'ksef', label: 'Numer KSeF', width: '170px' },
  id: { key: 'id', label: 'Identyfikator', width: 'minmax(100px, 1fr)' },
}

export type ColumnState = { key: ColumnKey; visible: boolean }

export const defaultColumns: ColumnState[] = [
  { key: 'contractor', visible: true },
  { key: 'date', visible: true },
  { key: 'number', visible: true },
  { key: 'ksef', visible: true },
  { key: 'id', visible: true },
]

export type Sort = { key: ColumnKey; dir: 'asc' | 'desc' }