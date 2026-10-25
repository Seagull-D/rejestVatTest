export type RegisterType = 'sales' | 'purchases'

export type Operation = 'domestic' | 'wdt' | 'import'

export type Doc = {
  id: string
  contractor: string
  date: string // 'YYYY-MM-DD'
  number: string
  ksef: string | null // null = brak potwierdzenia
  net: number
  rate: 23 | 8 | 5 | 0 | 'np'
  operation: Operation
  jpk: string | null // np. 'GTU_01', 'TP'
  series: 'FV' | 'KOR' | 'FZ'
  tags: string[]
}

const pad = (n: number) => String(n).padStart(2, '0')

const salesNet = [500, 700, 650, 800, 600, 900, 550, 750, 700, 850, 600, 650, 700, 750]

export const sales: Doc[] = salesNet.map((net, i) => {
  const n = i + 1
  const series = n === 3 ? 'KOR' : 'FV'
  return {
    id: `DEMO-S-${n}`,
    contractor: `Demo Alfa ${pad(n)}`,
    date: `2026-10-${pad(n)}`,
    number: `${series}/${n}/10/2026/DEMO`,
    ksef: null,
    net,
    rate: 23,
    operation: 'domestic',
    jpk: n % 5 === 0 ? 'GTU_01' : null,
    series,
    tags: n === 1 || n === 7 ? ['Pilne'] : n % 4 === 0 ? ['Do wyjaśnienia'] : [],
  }
})

const purchasesNet = [400, 320, 1200, 260, 540, 180]

export const purchases: Doc[] = purchasesNet.map((net, i) => {
  const n = i + 1
  return {
    id: `DEMO-Z-${n}`,
    contractor: `Demo Beta ${pad(n)}`,
    date: `2026-10-${pad(n + 1)}`,
    number: `FZ/${n}/10/2026/DEMO`,
    ksef: null,
    net,
    rate: n === 6 ? 'np' : 23,
    operation: n === 4 ? 'import' : 'domestic',
    jpk: null,
    series: 'FZ',
        tags: n === 3 ? ['Środki trwałe'] : [],
  }
})

export const registers: Record<RegisterType, Doc[]> = { sales, purchases }

// options for the filter selects
export const operationOptions = [
  { value: 'all', label: 'Wszystkie' },
  { value: 'domestic', label: 'Krajowe' },
  { value: 'wdt', label: 'WDT' },
  { value: 'import', label: 'Import' },
] as const

export const jpkOptions = [
  { value: 'all', label: 'Wszystkie' },
  { value: 'GTU_01', label: 'GTU_01' },
  { value: 'TP', label: 'TP' },
] as const

export const seriesOptions = [
  { value: 'all', label: 'Wszystkie serie' },
  { value: 'FV', label: 'FV' },
  { value: 'KOR', label: 'KOR' },
  { value: 'FZ', label: 'FZ' },
] as const

export const months = [
  'styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec',
  'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień',
]

export const allTags = ['Pilne', 'Do wyjaśnienia', 'Środki trwałe']