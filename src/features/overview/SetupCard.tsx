import { useState } from 'react'
import { IconCheck, IconCircleCheck } from '@tabler/icons-react'
import s from './SetupCard.module.css'
import Sheet from '../../components/Sheet'

export type VatPeriod = 'monthly' | 'quarterly'

type Props = {
  year: number | null // null — okres jeszcze nie potwierdzony
  vat: VatPeriod | null
  onConfirmYear: (y: number) => void
  onConfirmVat: (v: VatPeriod) => void
}

type StepId = 'org' | 'period' | 'vat'

const vatLabel: Record<VatPeriod, string> = { monthly: 'miesięcznie', quarterly: 'kwartalnie' }

const SetupCard = ({ year, vat, onConfirmYear, onConfirmVat }: Props) => {
  const [sheet, setSheet] = useState<'period' | 'vat' | null>(null)
  const [draftYear, setDraftYear] = useState(year ?? 2026)
  const [draftVat, setDraftVat] = useState<VatPeriod>(vat ?? 'monthly')

  const steps: { id: StepId; label: string; done: boolean }[] = [
    { id: 'org', label: 'Organizacja', done: true },
    { id: 'period', label: `Okres ${year ?? draftYear}`, done: year !== null },
    { id: 'vat', label: 'Kontekst VAT', done: vat !== null },
  ]
  const current = steps.find(st => !st.done)
  const doneCount = steps.filter(st => st.done).length

  const open = (id: StepId) => {
    if (id === 'period') { setDraftYear(year ?? 2026); setSheet('period') }
    if (id === 'vat') { setDraftVat(vat ?? 'monthly'); setSheet('vat') }
  }

  return (
    <section className={`${s.card} ${current ? '' : s.complete}`} aria-label="Uruchomienie księgowania">
      {current ? (
        <>
          <div className={s.body}>
            <div className={s.head}>
              <h2 className={s.title}>Uruchomienie księgowania</h2>
              <span className={s.count}>krok {doneCount + 1} z {steps.length}</span>
            </div>

            {/* desktop: kroki z nazwami */}
            <ol className={s.steps}>
              {steps.map((st, i) => (
                <li key={st.id} className={`${s.step} ${st.done ? s.done : ''} ${st === current ? s.current : ''}`}>
                  <button
                    className={s.stepBtn}
                    onClick={() => open(st.id)}
                    disabled={st.id === 'org'}
                    aria-current={st === current ? 'step' : undefined}
                  >
                    <span className={s.num}>{st.done ? <IconCheck size={12} /> : i + 1}</span>
                    {st.label}
                  </button>
                </li>
              ))}
            </ol>

            {/* telefon: pasek postępu */}
            <div className={s.progress} aria-hidden="true">
              {steps.map(st => (
                <span key={st.id} className={`${s.seg} ${st.done ? s.done : ''} ${st === current ? s.current : ''}`} />
              ))}
            </div>

            <p className={s.text}>
              {current.id === 'period'
                ? 'Orientacyjny rok rozliczeniowy aktywnej organizacji. Potwierdź go przed uruchomieniem operacji księgowych.'
                : 'Potwierdź sposób rozliczania VAT, aby rejestr pokazywał ewidencję organizacji zamiast danych demonstracyjnych.'}
            </p>
            <p className={s.note}>To mapa zakresu — nic nie zostanie uruchomione bez potwierdzenia. Dane pozostają demonstracyjne.</p>
          </div>

          <button className={s.primary} onClick={() => open(current.id)}>
            {current.id === 'period' ? `Potwierdź okres ${draftYear}` : 'Potwierdź kontekst VAT'}
          </button>
        </>
      ) : (
        <>
          <IconCircleCheck size={22} className={s.okIcon} />
          <div className={s.body}>
            <h2 className={s.title}>Księgowanie skonfigurowane</h2>
            <p className={s.text}>Okres {year} · VAT rozliczany {vat && vatLabel[vat]}</p>
          </div>
          <button className={s.secondary} onClick={() => open('period')}>Zmień</button>
        </>
      )}

      {sheet === 'period' && (
        <Sheet title="Okres księgowy" onClose={() => setSheet(null)}>
          <label className={s.field}>
            <span>Rok rozliczeniowy</span>
            <select value={draftYear} onChange={e => setDraftYear(Number(e.target.value))}>
              {[2025, 2026, 2027].map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </label>
          <p className={s.text}>Po potwierdzeniu okres zostanie użyty we wszystkich obszarach.</p>
          <button className={`${s.primary} ${s.full}`} onClick={() => { onConfirmYear(draftYear); setSheet(null) }}>
            Potwierdź okres {draftYear}
          </button>
        </Sheet>
      )}

      {sheet === 'vat' && (
        <Sheet title="Kontekst VAT" onClose={() => setSheet(null)}>
          <fieldset className={s.radios}>
            <legend>Rozliczenie VAT</legend>
            {(['monthly', 'quarterly'] as const).map(v => (
              <label key={v} className={`${s.radio} ${draftVat === v ? s.radioOn : ''}`}>
                <input type="radio" name="vat" checked={draftVat === v} onChange={() => setDraftVat(v)} />
                {v === 'monthly' ? 'Miesięczne (JPK_V7M)' : 'Kwartalne (JPK_V7K)'}
              </label>
            ))}
          </fieldset>
          <button className={`${s.primary} ${s.full}`} onClick={() => { onConfirmVat(draftVat); setSheet(null) }}>
            Potwierdź kontekst VAT
          </button>
        </Sheet>
      )}
    </section>
  )
}

export default SetupCard
