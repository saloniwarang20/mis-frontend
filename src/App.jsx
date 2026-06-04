import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* public routes */}
          <Route path="/" element={<Auth/>} />

          {/* private routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
