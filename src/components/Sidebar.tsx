import { Icon } from '@/components/ui'
import type { Page, NavFn } from '@/types'

const navItems: { id: Page; label: string; icon: Parameters<typeof Icon>[0]['name'] }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { id: 'residents', label: 'Residents', icon: 'users' },
  { id: 'health-records', label: 'Health Records', icon: 'file-text' },
  { id: 'medications', label: 'Medications', icon: 'pill' },
  { id: 'checkups', label: 'Check-ups & Follow-ups', icon: 'calendar' },
  { id: 'care-notes', label: 'Care Notes', icon: 'clipboard' },
  { id: 'reports', label: 'Reports', icon: 'bar-chart' },
  { id: 'settings', label: 'Settings', icon: 'settings' },
]

export default function Sidebar({
  activePage,
  navigate,
  open,
  onLogout,
  userName,
}: {
  activePage: Page
  navigate: NavFn
  open: boolean
  onLogout: () => void
  userName: string
}) {
  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-30 flex flex-col w-60 bg-navy text-white shrink-0
        transition-transform duration-300 ease-in-out
        md:static md:translate-x-0 md:flex
        ${open ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-brand flex items-center justify-center shrink-0">
            <Icon name="heart" size={18} className="text-white" />
          </div>
          <div>
            <p className="font-bold text-lg leading-none font-display tracking-tight">CareTrack</p>
            <p className="text-[10px] text-white/50 leading-tight mt-0.5">Healthcare System</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        <p className="text-[10px] uppercase tracking-wider text-white/30 font-semibold px-3 mb-3">Navigation</p>
        {navItems.map(item => {
          const active = activePage === item.id || (activePage === 'resident-profile' && item.id === 'residents') || (activePage === 'add-resident' && item.id === 'residents')
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                transition-colors duration-150 cursor-pointer text-left
                ${active
                  ? 'bg-brand text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/8'
                }
              `}
            >
              <Icon name={item.icon} size={16} />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-white/10 space-y-1">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-brand/30 flex items-center justify-center text-white text-xs font-bold shrink-0 font-display">
            {userName
  .split(' ')
  .map(name => name[0])
  .join('')
  .slice(0, 2)
  .toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-white truncate">{userName}</p>
            <p className="text-[11px] text-white/40 truncate">Senior Caregiver</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/8 transition-colors duration-150 cursor-pointer"
        >
          <Icon name="logout" size={16} />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Privacy notice */}
      <div className="px-4 py-3 border-t border-white/5">
        <p className="text-[10px] text-white/25 leading-relaxed flex items-start gap-1.5">
          <Icon name="shield" size={10} className="mt-0.5 shrink-0" />
          Health information is confidential. For authorised personnel only.
        </p>
      </div>
    </aside>
  )
}
