import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import ManageGroup from './pages/ManageGroup'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'
import ManageChain from './pages/ManageChain'
import ManageBrand from './pages/ManageBrand'
import ManageSubzone from './pages/ManageSubzone'
import ManageEstimate from './pages/ManageEstimate'
import ManageInvoke from './pages/ManageInvoke'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* public routes */}
          <Route path="/" element={<Auth/>} />

          {/* private routes */}
          <Route element={<Layout/>}>

            <Route path="dashboard" element={
              <ProtectedRoute>
                <Dashboard/>
              </ProtectedRoute>} />

            <Route path="manage-group" element={
              <ProtectedRoute>
                <ManageGroup/>
              </ProtectedRoute> } />

            <Route path="manage-chain" element={
              <ProtectedRoute>
                <ManageChain/>
              </ProtectedRoute> } />

            <Route path="manage-brand" element={
              <ProtectedRoute>
                <ManageBrand/>
              </ProtectedRoute> } />

            <Route path="manage-subzone" element={
              <ProtectedRoute>
                <ManageSubzone/>
              </ProtectedRoute> } />

            <Route path="manage-estimate" element={
              <ProtectedRoute>
                <ManageEstimate/>
              </ProtectedRoute> } />

            <Route path="manage-invoke" element={
              <ProtectedRoute>
                <ManageInvoke/>
              </ProtectedRoute> } />

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
