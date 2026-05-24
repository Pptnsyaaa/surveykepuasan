import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

import SurveyPage from './pages/SurveyPage'

import LoginAdmin from './pages/admin/LoginAdmin'
import DashboardAdmin from './pages/admin/DashboardAdmin'

import AboutSystem from './pages/AboutSystem'

export default function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* HOME */}

        <Route
          path="/"
          element={<SurveyPage />}
        />

        {/* ABOUT SYSTEM */}

        <Route
          path="/tentang"
          element={<AboutSystem />}
        />

        {/* LOGIN ADMIN */}

        <Route
          path="/admin/login"
          element={<LoginAdmin />}
        />

        {/* DASHBOARD */}

        <Route
          path="/admin/dashboard"
          element={<DashboardAdmin />}
        />

      </Routes>

    </BrowserRouter>

  )

}