import { useState } from 'react'
import { Icon, Card, PageHeader, Button, Input } from '@/components/ui'
import type { NavFn } from '@/types'

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand/40 ${checked ? 'bg-brand' : 'bg-edge-dark'}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${checked ? 'translate-x-6' : 'translate-x-1'}`}
      />
    </button>
  )
}

export default function SettingsPage({
  navigate,
  onLogout,
  userName,
  userEmail,
}: {
  navigate: NavFn
  onLogout: () => void
  userName: string
  userEmail: string
}) {
  const [profile, setProfile] = useState({
  name: userName,
  email: userEmail,
  role: 'Senior Caregiver',
  phone: '555-9200'
})
  const [profileSaved, setProfileSaved] = useState(false)

  const [notifs, setNotifs] = useState({
    healthUpdates: true,
    medicationReminders: true,
    followUpAlerts: true,
    dailyCareNotes: false,
    weeklyReports: true,
  })

  const [prefs, setPrefs] = useState({
    compactView: false,
    showResidentIDs: true,
    dateFormat: 'dd MMM yyyy',
  })

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [pwForm, setPwForm] = useState({ current: '', next: '', confirm: '' })
  const [pwSaved, setPwSaved] = useState(false)

  const saveProfile = () => {
    setProfileSaved(true)
    setTimeout(() => setProfileSaved(false), 2500)
  }

  const savePassword = () => {
    setPwSaved(true)
    setPwForm({ current: '', next: '', confirm: '' })
    setTimeout(() => setPwSaved(false), 2500)
  }

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto">
      <PageHeader title="Settings" description="Manage your account and system preferences." />

      <div className="space-y-6">
        {/* User Profile */}
        <Card className="p-6">
          <h2 className="text-base font-semibold text-navy font-display mb-5 flex items-center gap-2">
            <Icon name="user" size={18} className="text-brand" />
            User Profile
          </h2>
          <div className="flex items-center gap-4 mb-5">
            <div className="w-16 h-16 rounded-full bg-brand flex items-center justify-center text-white text-xl font-bold font-display shrink-0">
              {userName
  .split(' ')
  .map(word => word[0])
  .join('')
  .slice(0, 2)
  .toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-navy">{profile.name}</p>
              <p className="text-slate text-sm">{profile.role}</p>
              <button className="text-xs text-brand hover:text-brand-700 mt-1 cursor-pointer font-medium">
                Change photo
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              value={profile.name}
              onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
            />
            <Input
              label="Email Address"
              type="email"
              value={profile.email}
              onChange={e => setProfile(p => ({ ...p, email: e.target.value }))}
            />
            <Input
              label="Role / Position"
              value={profile.role}
              onChange={e => setProfile(p => ({ ...p, role: e.target.value }))}
            />
            <Input
              label="Contact Number"
              value={profile.phone}
              onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))}
            />
          </div>
          <div className="flex items-center gap-3 mt-5">
            <Button onClick={saveProfile}>
              {profileSaved ? <><Icon name="check" size={14} /> Saved!</> : 'Save Changes'}
            </Button>
            {profileSaved && <p className="text-ok text-sm">Profile updated successfully.</p>}
          </div>
        </Card>

        {/* Change Password */}
        <Card className="p-6">
          <h2 className="text-base font-semibold text-navy font-display mb-5 flex items-center gap-2">
            <Icon name="lock" size={18} className="text-brand" />
            Change Password
          </h2>
          <div className="space-y-4 max-w-md">
            <Input
              label="Current Password"
              type="password"
              placeholder="Enter current password"
              value={pwForm.current}
              onChange={e => setPwForm(f => ({ ...f, current: e.target.value }))}
            />
            <Input
              label="New Password"
              type="password"
              placeholder="Enter new password"
              value={pwForm.next}
              onChange={e => setPwForm(f => ({ ...f, next: e.target.value }))}
            />
            <Input
              label="Confirm New Password"
              type="password"
              placeholder="Confirm new password"
              value={pwForm.confirm}
              onChange={e => setPwForm(f => ({ ...f, confirm: e.target.value }))}
            />
          </div>
          <div className="flex items-center gap-3 mt-5">
            <Button onClick={savePassword}>Update Password</Button>
            {pwSaved && <p className="text-ok text-sm">Password updated successfully.</p>}
          </div>
        </Card>

        {/* Notifications */}
        <Card className="p-6">
          <h2 className="text-base font-semibold text-navy font-display mb-5 flex items-center gap-2">
            <Icon name="bell" size={18} className="text-brand" />
            Notification Preferences
          </h2>
          <div className="space-y-4">
            {[
              { key: 'healthUpdates', label: 'Health Record Updates', desc: 'Get notified when a new health record is added.' },
              { key: 'medicationReminders', label: 'Medication Reminders', desc: 'Daily reminders for medication administration.' },
              { key: 'followUpAlerts', label: 'Follow-up Alerts', desc: 'Alerts for upcoming check-ups and follow-up dates.' },
              { key: 'dailyCareNotes', label: 'Daily Care Note Summaries', desc: 'End-of-day care note summary email.' },
              { key: 'weeklyReports', label: 'Weekly Reports', desc: 'Weekly summary report every Monday morning.' },
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between gap-4 py-1">
                <div>
                  <p className="text-sm font-medium text-navy">{item.label}</p>
                  <p className="text-xs text-slate mt-0.5">{item.desc}</p>
                </div>
                <Toggle
                  checked={notifs[item.key as keyof typeof notifs]}
                  onChange={() => setNotifs(n => ({ ...n, [item.key]: !n[item.key as keyof typeof notifs] }))}
                />
              </div>
            ))}
          </div>
        </Card>

        {/* System Preferences */}
        <Card className="p-6">
          <h2 className="text-base font-semibold text-navy font-display mb-5 flex items-center gap-2">
            <Icon name="settings" size={18} className="text-brand" />
            System Preferences
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-navy">Compact View</p>
                <p className="text-xs text-slate mt-0.5">Reduce spacing for a denser layout.</p>
              </div>
              <Toggle checked={prefs.compactView} onChange={() => setPrefs(p => ({ ...p, compactView: !p.compactView }))} />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-navy">Show Resident IDs</p>
                <p className="text-xs text-slate mt-0.5">Display resident IDs in lists and tables.</p>
              </div>
              <Toggle checked={prefs.showResidentIDs} onChange={() => setPrefs(p => ({ ...p, showResidentIDs: !p.showResidentIDs }))} />
            </div>
            <div className="flex items-center justify-between gap-4 pt-2">
              <div>
                <p className="text-sm font-medium text-navy">Date Format</p>
                <p className="text-xs text-slate mt-0.5">Choose how dates are displayed.</p>
              </div>
              <select
                value={prefs.dateFormat}
                onChange={e => setPrefs(p => ({ ...p, dateFormat: e.target.value }))}
                className="px-3 py-2 rounded-lg border border-edge bg-canvas text-sm text-navy focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors cursor-pointer"
              >
                <option value="dd MMM yyyy">24 Jul 2026</option>
                <option value="MM/DD/YYYY">07/24/2026</option>
                <option value="YYYY-MM-DD">2026-07-24</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className="p-6 border-danger-100">
          <h2 className="text-base font-semibold text-navy font-display mb-1 flex items-center gap-2">
            <Icon name="logout" size={18} className="text-danger" />
            Sign Out
          </h2>
          <p className="text-slate text-sm mb-4">Sign out of CareTrack. You will need to log in again to access the system.</p>
          {showLogoutConfirm ? (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-danger-50 border border-danger-100">
              <p className="text-sm text-danger flex-1">Are you sure you want to sign out?</p>
              <Button variant="danger" size="sm" onClick={onLogout}>Yes, sign out</Button>
              <Button variant="secondary" size="sm" onClick={() => setShowLogoutConfirm(false)}>Cancel</Button>
            </div>
          ) : (
            <Button variant="danger" onClick={() => setShowLogoutConfirm(true)}>
              <Icon name="logout" size={15} />
              Sign Out
            </Button>
          )}
        </Card>

        <div className="flex items-center gap-2 justify-center text-xs text-subtle py-4">
          <Icon name="shield" size={12} />
          CareTrack v1.0.0 · For authorised staff use only · All activity is logged
        </div>
      </div>
    </div>
  )
}
