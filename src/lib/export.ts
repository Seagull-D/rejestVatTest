import type { Doc } from '../data/demo'
import { vatOf } from './format'

export function exportCsv(docs: Doc[], fileName: string) {
  const head = ['Kontrahent', 'Data', 'Numer dokumentu', 'Numer KSeF', 'Identyfikator', 'Netto', 'VAT', 'Brutto']
  const rows = docs.map(d => [
    d.contractor, d.date, d.number, d.ksef ?? 'Brak potwierdzenia', d.id,
    d.net.toFixed(2), vatOf(d).toFixed(2), (d.net + vatOf(d)).toFixed(2),
  ])

  const csv = [head, ...rows]
    .map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(';'))
    .join('\n')

  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = fileName
  a.click()
  URL.revokeObjectURL(url)
}