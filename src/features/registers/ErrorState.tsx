import { IconCloudOff, IconRefresh } from '@tabler/icons-react'
import s from './StateBox.module.css'

const ErrorState = ({ onRetry }: { onRetry: () => void }) => (
  <div className={`${s.box} ${s.error}`} role="alert">
    <IconCloudOff size={28} className={s.icon} />
    <h3 className={s.title}>Nie udało się wczytać rejestru</h3>
    <p className={s.text}>Sprawdź połączenie i spróbuj ponownie. Filtry zostaną zachowane.</p>
    <button className={s.btn} onClick={onRetry}>
      <IconRefresh size={16} /> Spróbuj ponownie
    </button>
  </div>
)

export default ErrorState