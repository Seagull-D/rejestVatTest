import { Outlet } from 'react-router'
import s from './AppShell.module.css'
import TopBar from './TopBar'
import { AreaTabs, BottomNav } from './AreaNav'

const AppShell = () => (
  <div className={s.shell}>
    <TopBar />
    <div className={s.content}>
      <AreaTabs />
      <Outlet />
    </div>
    <BottomNav />
  </div>
)

export default AppShell