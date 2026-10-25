import { useMemo, useState } from 'react'
import s from './OverviewPage.module.css'
import SetupCard, { type VatPeriod } from './SetupCard'
import AreaGrid, { type AreaView } from './AreaGrid'
import StatusDot from '../../components/StatusDot'
import { availability } from '../../data/areas'
import { registers } from '../../data/demo'
import { calcTotals, formatMoney } from '../../lib/format'
import { inPeriod } from '../registers/types'

// жива цифра для плитки Rejestr VAT — з тих самих демо-даних, що й реєстр
const current = { year: 2026, month: 10 }
const sales = registers.sales.filter(d => inPeriod(d.date, current))
const purchases = registers.purchases.filter(d => inPeriod(d.date, current))
const vatMeta = `Sprzedaż ${sales.length} · Zakupy ${purchases.length} · VAT ${formatMoney(calcTotals(sales).vat)}`

const OverviewPage = () => {
  const [year, setYear] = useState<number | null>(null)
  const [vat, setVat] = useState<VatPeriod | null>(null)

  // після підтвердження VAT область стає готовою
  const areas: AreaView[] = useMemo(
    () =>
      availability.map(a =>
        a.id === 'vat'
          ? vat
            ? { ...a, status: 'ready', hint: 'Kontekst VAT potwierdzony', meta: vatMeta }
            : { ...a, meta: vatMeta }
          : a,
      ),
    [vat],
  )
  const readyCount = areas.filter(a => a.status === 'ready').length

  return (
    <main className={s.page}>
      <header className={s.header}>
        <div>
          <span className={s.eyebrow}>Ewidencje</span>
          <h1 className={s.title}>Obszary księgowe</h1>
          <p className={s.subtitle}>Mapa dostępnych obszarów księgowych dla aktywnej organizacji.</p>
        </div>
        <span className={s.ready}>
          <StatusDot status="ready" />
          {readyCount} z {areas.length} gotowe
        </span>
      </header>

      <SetupCard year={year} vat={vat} onConfirmYear={setYear} onConfirmVat={setVat} />
      <AreaGrid areas={areas} />
    </main>
  )
}

export default OverviewPage
