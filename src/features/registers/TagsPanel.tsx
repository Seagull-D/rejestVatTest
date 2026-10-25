import { IconCheck } from '@tabler/icons-react'
import s from './TagsPanel.module.css'
import Sheet from '../../components/Sheet'
import { allTags, type Doc } from '../../data/demo'

type Props = {
  docs: Doc[]            // документи періоду — для лічильників
  value: string[]
  onChange: (t: string[]) => void
  onClose: () => void
}

const TagsPanel = ({ docs, value, onChange, onClose }: Props) => {
  const toggle = (t: string) =>
    onChange(value.includes(t) ? value.filter(x => x !== t) : [...value, t])

  return (
    <Sheet title="Tagi" onClose={onClose}>
      <p className={s.hint}>Pokaż tylko dokumenty z wybranymi tagami.</p>
      <div className={s.list}>
        {allTags.map(t => {
          const on = value.includes(t)
          const count = docs.filter(d => d.tags.includes(t)).length
          return (
            <button
              key={t}
              className={`${s.tag} ${on ? s.on : ''}`}
              aria-pressed={on}
              onClick={() => toggle(t)}
            >
              {on && <IconCheck size={14} />}
              {t}
              <span className={s.count}>{count}</span>
            </button>
          )
        })}
      </div>
      <div className={s.footer}>
        <button className={s.link} onClick={() => onChange([])} disabled={!value.length}>
          Wyczyść
        </button>
        <button className={s.done} onClick={onClose}>Gotowe</button>
      </div>
    </Sheet>
  )
}

export default TagsPanel