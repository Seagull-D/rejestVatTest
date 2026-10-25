import { Route, Routes } from 'react-router'
import AppShell from './features/shell/AppShell'
import OverviewPage from './features/overview/OverviewPage'
import RegistersPage from './features/registers/RegistersPage'
import AreaPlaceholder from './features/areas/AreaPlaceholder'

const App = () => (
  <Routes>
    <Route element={<AppShell />}>
      <Route index element={<OverviewPage />} />
      <Route path="rejestry" element={<RegistersPage />} />
      <Route path="*" element={<AreaPlaceholder />} />
    </Route>
  </Routes>
)

export default App