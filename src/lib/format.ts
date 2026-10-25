import type { Doc } from '../data/demo'

const money = new Intl.NumberFormat('pl-PL', {
  style: 'currency',
  currency: 'PLN',
  minimumFractionDigits: 2,
})

export const formatMoney = (v: number) => money.format(v)

// '2026-10-03' -> '03.10.2026'
export const formatDate = (iso: string) => {
  const [y, m, d] = iso.split('-')
  return `${d}.${m}.${y}`
}

export const vatOf = (doc: Doc) => (doc.rate === 'np' ? 0 : (doc.net * doc.rate) / 100)

export type Totals = {
  net: number
  vat: number
  gross: number
  byRate: { rate: string; vat: number }[]
}

export function calcTotals(docs: Doc[]): Totals {
  const net = docs.reduce((a, d) => a + d.net, 0)
  const vat = docs.reduce((a, d) => a + vatOf(d), 0)

  const map = new Map<string, number>()
  map.set('23%', 0)
  map.set('np', 0)
  for (const d of docs) {
    const key = d.rate === 'np' ? 'np' : `${d.rate}%`
    map.set(key, (map.get(key) ?? 0) + vatOf(d))
  }

  return {
    net,
    vat,
    gross: net + vat,
    byRate: [...map].map(([rate, v]) => ({ rate, vat: v })),
  }
}