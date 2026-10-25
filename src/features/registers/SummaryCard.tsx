import s from "./SummaryCard.module.css";
import { formatMoney, type Totals } from "../../lib/format";

type Props = { totals: Totals; loading?: boolean };

const SummaryCard = ({ totals, loading }: Props) => {
  const maxVat = Math.max(...totals.byRate.map((r) => r.vat), 0);
  // під час завантаження суми ще невідомі
  const fmt = (v: number) => (loading ? "— zł" : formatMoney(v));

  return (
    <section
      className={`${s.card} ${loading ? s.loading : ""}`}
      aria-label="Podsumowanie okresu"
      aria-busy={loading}
    >
      <div className={s.gross}>
        <span className={s.label}>Brutto</span>
        <span className={s.big}>{fmt(totals.gross)}</span>
      </div>

      <div className={s.metric}>
        <span className={s.label}>Netto</span>
        <span className={s.value}>{fmt(totals.net)}</span>
      </div>

      <div className={s.metric}>
        <span className={s.label}>VAT</span>
        <span className={s.value}>{fmt(totals.vat)}</span>
      </div>

      <div className={s.rates}>
        <span className={s.label}>Kwoty według stawek VAT</span>
        <ul className={s.rateList}>
          {totals.byRate.map((r) => (
            <li key={r.rate} className={s.rate}>
              <span className={s.rateName}>{r.rate}</span>
              <span className={s.track}>
                <span
                  className={s.fill}
                  style={{
                    width: maxVat ? `${(r.vat / maxVat) * 100}%` : "0%",
                  }}
                />
              </span>
              <span className={s.rateValue}>{fmt(r.vat)}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SummaryCard;
