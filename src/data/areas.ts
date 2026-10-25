import type { ComponentType } from 'react'
import {
  IconArchive, IconBuildingBank, IconCash, IconChecklist,
  IconFileText, IconLayoutGrid, IconReceipt,
} from '@tabler/icons-react'

type IconCmp = ComponentType<{ size?: number; className?: string }>

export type AreaStatus = 'ready' | 'setup' | 'off'

export const statusLabel: Record<AreaStatus, string> = {
  ready: 'Gotowy',
  setup: 'Wymaga konfiguracji',
  off: 'Niedostępny',
}

// «Dostępność obszarów» — 6 позицій з оригіналу
export type Availability = {
  id: string
  label: string
  Icon: IconCmp
  status: AreaStatus
  description: string
  hint: string // коротко — для плитки
  link?: string
}

export const availability: Availability[] = [
  {
    id: 'vat', label: 'Rejestr VAT', Icon: IconReceipt, status: 'setup', link: '/rejestry',
    description: 'Wymaga potwierdzenia kontekstu VAT. Do tego czasu rejestr pokazuje dane demonstracyjne.',
    hint: 'Potwierdź kontekst VAT',
  },
  {
    id: 'income', label: 'Ewidencja przychodów', Icon: IconCash, status: 'ready',
    description: 'Warunki spełnione. Ewidencja może być prowadzona dla aktywnej organizacji.',
    hint: 'Warunki spełnione',
  },
  {
    id: 'assets', label: 'Majątek', Icon: IconArchive, status: 'off', link: '/majatek',
    description: 'Brak ewidencji środków trwałych. Dodaj pierwszy środek trwały, aby aktywować obszar.',
    hint: 'Dodaj pierwszy środek trwały',
  },
  {
    id: 'kpir', label: 'KPiR', Icon: IconBuildingBank, status: 'off',
    description: 'Niedostępne dla wybranej formy opodatkowania.',
    hint: 'Nie dla tej formy opodatkowania',
  },
  {
    id: 'ledger', label: 'Pełne księgi', Icon: IconFileText, status: 'off', link: '/ksiegowania',
    description: 'Wymaga planu kont i potwierdzonego okresu księgowego.',
    hint: 'Wymaga planu kont i okresu',
  },
  {
    id: 'controls', label: 'Kontrole', Icon: IconChecklist, status: 'ready', link: '/kontrole',
    description: 'Kontrole spójności danych są aktywne.',
    hint: 'Kontrole spójności aktywne',
  },
]

// навігація: вкладки на desktop і таб-бар на телефоні
export type NavArea = {
  path: string
  label: string
  short: string
  Icon: IconCmp
  status?: AreaStatus
}

export const navAreas: NavArea[] = [
  { path: '/', label: 'Przegląd', short: 'Przegląd', Icon: IconLayoutGrid },
  { path: '/rejestry', label: 'Rejestry i VAT', short: 'VAT', Icon: IconReceipt, status: 'setup' },
  { path: '/ksiegowania', label: 'Księgowania', short: 'Księgi', Icon: IconBuildingBank, status: 'off' },
  { path: '/majatek', label: 'Majątek', short: 'Majątek', Icon: IconArchive, status: 'off' },
  { path: '/kontrole', label: 'Kontrole', short: 'Kontrole', Icon: IconChecklist, status: 'ready' },
]