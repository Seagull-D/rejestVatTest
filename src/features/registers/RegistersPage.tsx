import { useEffect, useMemo, useState } from "react";
import s from "./RegistersPage.module.css";
import { months, registers, type Doc, type RegisterType } from "../../data/demo";
import { calcTotals } from "../../lib/format";
import { exportCsv } from "../../lib/export";
import { fetchRegister } from "./api";
import PageHeader from "./PageHeader";
import DemoNotice from "./DemoNotice";
import RegisterTabs from "./RegisterTabs";
import SummaryCard from "./SummaryCard";
import Toolbar from "./Toolbar";
import ActiveFilters from "./ActiveFilters";
import DocumentsTable from "./DocumentsTable";
import TableSkeleton from "./TableSkeleton";
import EmptyState from "./EmptyState";
import ErrorState from "./ErrorState";
import Pagination from "./Pagination";
import ColumnsPanel from "./ColumnsPanel";
import TagsPanel from "./TagsPanel";
import DemoSwitch from "./DemoSwitch";
import type { MenuAction } from "./MoreMenu";
import { defaultColumns, type ColumnState, type Sort } from "./columns";
import {
  defaultFilters,
  inPeriod,
  type DemoMode,
  type Filters,
  type Period,
} from "./types";

type Result = { key: string; docs: Doc[]; error: boolean };

const RegistersPage = () => {
  const [tab, setTab] = useState<RegisterType>("sales");
  const [period, setPeriod] = useState<Period>({ year: 2026, month: 10 });
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [tags, setTags] = useState<string[]>([]);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<Sort>({ key: "date", dir: "asc" });
  const [columns, setColumns] = useState<ColumnState[]>(defaultColumns);
  const [panel, setPanel] = useState<"columns" | "tags" | null>(null);

  const [mode, setMode] = useState<DemoMode>("auto");
  const [reloadKey, setReloadKey] = useState(0);
  const [result, setResult] = useState<Result | null>(null);

  // поки відповідь не для цього ключа — йде завантаження
  const requestKey = `${tab}|${period.year}-${period.month}|${mode}|${reloadKey}`;

  useEffect(() => {
    let cancelled = false;
    fetchRegister(tab, period, mode)
      .then((docs) => !cancelled && setResult({ key: requestKey, docs, error: false }))
      .catch(() => !cancelled && setResult({ key: requestKey, docs: [], error: true }));
    return () => {
      cancelled = true;
    };
  }, [requestKey, tab, period, mode]);

  const status =
    result?.key !== requestKey ? "loading" : result.error ? "error" : "ready";

  const periodDocs = useMemo(
    () => (status === "ready" && result ? result.docs : []),
    [status, result],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return periodDocs.filter(
      (d) =>
        (filters.operation === "all" || d.operation === filters.operation) &&
        (filters.jpk === "all" || d.jpk === filters.jpk) &&
        (filters.series === "all" || d.series === filters.series) &&
        (!tags.length || d.tags.some((t) => tags.includes(t))) &&
        (!q || `${d.contractor} ${d.number} ${d.id}`.toLowerCase().includes(q)),
    );
  }, [periodDocs, query, filters, tags]);

  const totals = useMemo(() => calcTotals(filtered), [filtered]);

  const sorted = useMemo(() => {
    const val = (d: Doc) => (sort.key === "ksef" ? (d.ksef ?? "") : d[sort.key]);
    const list = [...filtered].sort((a, b) =>
      val(a).localeCompare(val(b), "pl", { numeric: true }),
    );
    return sort.dir === "asc" ? list : list.reverse();
  }, [filtered, sort]);

  const pages = Math.max(1, Math.ceil(sorted.length / perPage));
  const current = Math.min(page, pages);
  const pageDocs = sorted.slice((current - 1) * perPage, current * perPage);

  // будь-яка зміна вибірки повертає на 1-шу сторінку
  const withReset =
    <T,>(set: (v: T) => void) =>
    (v: T) => {
      set(v);
      setPage(1);
    };

  const resetFilters = () => {
    setQuery("");
    setFilters(defaultFilters);
    setTags([]);
    setPage(1);
  };

  const prevPeriod = () => {
    setPeriod((p) =>
      p.month === 1 ? { year: p.year - 1, month: 12 } : { ...p, month: p.month - 1 },
    );
    setPage(1);
  };

  const retry = () => {
    // у демо «повтор» відновлює звичайні дані
    setMode("auto");
    setReloadKey((k) => k + 1);
  };

  const handleAction = (a: MenuAction) => {
    if (a === "print") window.print();
    if (a === "export")
      exportCsv(sorted, `rejestr-${tab}-${period.year}-${period.month}.csv`);
    if (a === "columns") setPanel("columns");
    if (a === "tags") setPanel("tags");
  };

  const periodLabel = `${months[period.month - 1]} ${period.year}`;

  return (
    <main className={s.page}>
      <PageHeader period={period} onPeriodChange={withReset(setPeriod)} />
      <DemoNotice action={{ label: "Potwierdź", onClick: () => {} }}>
        Dane demonstracyjne — kontekst VAT wymaga potwierdzenia.
      </DemoNotice>
      <RegisterTabs
        value={tab}
        onChange={withReset(setTab)}
        counts={{
          sales: registers.sales.filter((d) => inPeriod(d.date, period)).length,
          purchases: registers.purchases.filter((d) => inPeriod(d.date, period)).length,
        }}
      />

      {status !== "error" && (
        <SummaryCard totals={totals} loading={status === "loading"} />
      )}

      <Toolbar
        query={query}
        onQueryChange={withReset(setQuery)}
        filters={filters}
        onFiltersChange={withReset(setFilters)}
        perPage={perPage}
        onPerPageChange={withReset(setPerPage)}
        onAction={handleAction}
      />

      <ActiveFilters
        filters={filters}
        tags={tags}
        onFiltersChange={withReset(setFilters)}
        onTagsChange={withReset(setTags)}
      />

      {status === "loading" && <TableSkeleton />}
      {status === "error" && <ErrorState onRetry={retry} />}
      {status === "ready" && periodDocs.length === 0 && (
        <EmptyState kind="period" periodLabel={periodLabel} onPrevPeriod={prevPeriod} />
      )}
      {status === "ready" && periodDocs.length > 0 && filtered.length === 0 && (
        <EmptyState kind="filters" onReset={resetFilters} />
      )}
      {status === "ready" && filtered.length > 0 && (
        <>
          <DocumentsTable
            docs={pageDocs}
            columns={columns}
            sort={sort}
            onSortChange={setSort}
          />
          <Pagination
            page={current}
            pages={pages}
            total={sorted.length}
            perPage={perPage}
            onPageChange={setPage}
          />
        </>
      )}

      {panel === "columns" && (
        <ColumnsPanel
          value={columns}
          onChange={setColumns}
          onClose={() => setPanel(null)}
        />
      )}
      {panel === "tags" && (
        <TagsPanel
          docs={periodDocs}
          value={tags}
          onChange={withReset(setTags)}
          onClose={() => setPanel(null)}
        />
      )}

      <DemoSwitch value={mode} onChange={setMode} />
    </main>
  );
};

export default RegistersPage;