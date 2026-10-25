import { IconArrowDown, IconArrowUp } from "@tabler/icons-react";
import s from "./ColumnsPanel.module.css";

import { columnDefs, defaultColumns, type ColumnState } from "./columns";
import Sheet from "../../components/Sheet";

type Props = {
  value: ColumnState[];
  onChange: (c: ColumnState[]) => void;
  onClose: () => void;
};

const ColumnsPanel = ({ value, onChange, onClose }: Props) => {
  const visibleCount = value.filter((c) => c.visible).length;

  const toggle = (i: number) =>
    onChange(
      value.map((c, j) => (j === i ? { ...c, visible: !c.visible } : c)),
    );

  const move = (i: number, dir: -1 | 1) => {
    const next = [...value];
    [next[i], next[i + dir]] = [next[i + dir], next[i]];
    onChange(next);
  };

  return (
    <Sheet title="Kolumny" onClose={onClose}>
      <ul className={s.list}>
        {value.map((c, i) => (
          <li key={c.key} className={s.item}>
            <label className={s.check}>
              <input
                type="checkbox"
                checked={c.visible}
                disabled={c.visible && visibleCount === 1}
                onChange={() => toggle(i)}
              />
              {columnDefs[c.key].label}
            </label>
            <button
              className={s.icon}
              onClick={() => move(i, -1)}
              disabled={i === 0}
              aria-label="W górę"
            >
              <IconArrowUp size={16} />
            </button>
            <button
              className={s.icon}
              onClick={() => move(i, 1)}
              disabled={i === value.length - 1}
              aria-label="W dół"
            >
              <IconArrowDown size={16} />
            </button>
          </li>
        ))}
      </ul>

      <button className={s.reset} onClick={() => onChange(defaultColumns)}>
        Przywróć domyślne
      </button>
    </Sheet>
  );
};

export default ColumnsPanel;
