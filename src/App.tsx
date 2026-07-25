
import { useState } from 'react'
import type { Page, NavFn } from '@/types'
import Sidebar from '@/components/Sidebar'
import { Icon } from '@/components/ui'
import RegisterPage from '@/pages/RegisterPage'
import LoginPage from '@/pages/LoginPage'
import DashboardPage from '@/pages/DashboardPage'
import ResidentsPage from '@/pages/ResidentsPage'
import AddResidentPage from '@/pages/AddResidentPage'
import ResidentProfilePage from '@/pages/ResidentProfilePage'
import HealthRecordsPage from '@/pages/HealthRecordsPage'
import MedicationsPage from '@/pages/MedicationsPage'
import CheckupsPage from '@/pages/CheckupsPage'
import CareNotesPage from '@/pages/CareNotesPage'
import ReportsPage from '@/pages/ReportsPage'
import SettingsPage from '@/pages/SettingsPage'

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)
const [userName, setUserName] = useState('')
const [userEmail, setUserEmail] = useState('')
const [showRegister, setShowRegister] = useState(false)
  const [page, setPage] = useState<Page>('dashboard')
  const [selectedResidentId, setSelectedResidentId] = useState<string>('1')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigate: NavFn = (p, residentId) => {
    setPage(p)
    if (residentId) setSelectedResidentId(residentId)
    setSidebarOpen(false)
    window.scrollTo(0, 0)
  }

  if (!loggedIn) {
  if (showRegister) {
    return (
      <RegisterPage
        onRegister={() => setShowRegister(false)}
        onBackToLogin={() => setShowRegister(false)}
      />
    )
  }

  return (
    <LoginPage
  onLogin={(name, email) => {
  setUserName(name)
  setUserEmail(email)
  setLoggedIn(true)
}}
  onRegister={() => setShowRegister(true)}
/>
  )
}

  const renderPage = () => {
    switch (page) {
      case 'dashboard':        return <DashboardPage navigate={navigate} userName={userName} />
      case 'residents':        return <ResidentsPage navigate={navigate} />
      case 'add-resident':     return <AddResidentPage navigate={navigate} />
      case 'resident-profile': return <ResidentProfilePage navigate={navigate} residentId={selectedResidentId} />
      case 'health-records':   return <HealthRecordsPage navigate={navigate} />
      case 'medications':      return <MedicationsPage navigate={navigate} />
      case 'checkups':         return <CheckupsPage navigate={navigate} />
      case 'care-notes':       return <CareNotesPage navigate={navigate} />
      case 'reports':          return <ReportsPage navigate={navigate} />
      case 'settings':
  return (
    <SettingsPage
      navigate={navigate}
      onLogout={() => setLoggedIn(false)}
      userName={userName}
      userEmail={userEmail}
    />
  )
  
      default:
return <DashboardPage navigate={navigate} userName={userName} />
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-surface">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-navy/50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
  activePage={page}
  navigate={navigate}
  open={sidebarOpen}
  onLogout={() => setLoggedIn(false)}
  userName={userName}
/>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile topbar */}
        <div className="md:hidden flex items-center gap-3 px-4 py-3 bg-canvas border-b border-edge sticky top-0 z-10">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-surface text-navy cursor-pointer"
          >
            <Icon name="menu" size={20} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-brand flex items-center justify-center">
              <Icon name="heart" size={14} className="text-white" />
            </div>
            <span className="font-bold text-navy font-display text-lg">CareTrack</span>
          </div>
        </div>

        <main className="flex-1 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  )
}
