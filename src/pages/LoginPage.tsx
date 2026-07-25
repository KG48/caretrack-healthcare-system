import { useState } from 'react'
import { Icon } from '@/components/ui'
import { supabase } from '@/supabase'

export default function LoginPage({
  onLogin,
  onRegister,
}: {
  onLogin: (userName: string, email: string) => void
  onRegister: () => void
}) {
  const [email, setEmail] = useState('staff@caretrack.org')
  const [password, setPassword] = useState('password')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  setError('')

  if (!email || !password) {
    setError('Please enter your email and password.')
    return
  }

  setLoading(true)

const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password,
})

  setLoading(false)

  if (error) {
    setError('Invalid email or password.')
    return
  }

  const name = data.user?.user_metadata?.full_name || email
onLogin(name, data.user.email || email)
}

  return (
    <div className="min-h-screen flex bg-surface">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-navy relative overflow-hidden flex-col justify-between p-12">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.04]">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-brand/20 to-transparent" />

        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-12 h-12 rounded-2xl bg-brand flex items-center justify-center">
              <Icon name="heart" size={22} className="text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-2xl font-display tracking-tight">CareTrack</p>
              <p className="text-white/50 text-xs">Resident Record & Health-Care Management</p>
            </div>
          </div>

          <div className="space-y-8">
            {[
              { icon: 'users' as const, title: 'Resident Management', desc: 'Complete digital profiles for every resident in your care.' },
              { icon: 'file-text' as const, title: 'Health Records', desc: 'Organised health records, medications, and check-up history.' },
              { icon: 'activity' as const, title: 'Care Coordination', desc: 'Track follow-ups, care notes, and daily activity logs.' },
            ].map(f => (
              <div key={f.title} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand/20 flex items-center justify-center text-brand shrink-0 mt-0.5">
                  <Icon name={f.icon} size={18} />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm font-display">{f.title}</p>
                  <p className="text-white/50 text-sm mt-0.5 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <div className="relative z-10 flex items-center gap-2 text-white/30 text-xs">
          <Icon name="shield" size={12} />
          <span>Authorised personnel only. All access is monitored and logged.</span>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <div className="w-10 h-10 rounded-xl bg-brand flex items-center justify-center">
              <Icon name="heart" size={18} className="text-white" />
            </div>
            <div>
              <p className="text-navy font-bold text-xl font-display">CareTrack</p>
              <p className="text-slate text-xs">Resident Record & Health-Care Management</p>
            </div>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-navy font-display">Welcome back</h1>
            <p className="text-slate mt-2">Sign in to access the care management system.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-danger-50 text-danger text-sm border border-danger-100">
                <Icon name="alert-circle" size={16} />
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-navy mb-1.5">
                Email or Username
              </label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="e.g. staff@caretrack.org"
                className="w-full px-4 py-3 rounded-xl border border-edge bg-canvas text-navy text-sm placeholder-subtle focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-navy mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-edge bg-canvas text-navy text-sm placeholder-subtle focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-subtle hover:text-slate transition-colors cursor-pointer"
                >
                  <Icon name={showPassword ? 'eye-off' : 'eye'} size={18} />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm text-slate">Remember me</span>
              </label>
              <button type="button" className="text-sm text-brand hover:text-brand-700 font-medium transition-colors cursor-pointer">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-brand text-white font-semibold text-sm hover:bg-brand-700 transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in…
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-subtle">
            Trouble signing in? Contact your system administrator.
          </p>

          <p className="mt-4 text-center text-sm text-slate">
  Don't have an account?{' '}
  <button
    type="button"
    onClick={onRegister}
    className="text-brand font-medium hover:text-brand-700 transition-colors cursor-pointer"
  >
    Create an account
  </button>
</p>

          <div className="mt-6 flex items-center gap-2 justify-center text-xs text-subtle">
            <Icon name="shield" size={12} />
            <span>This system is for authorised caregiving staff only.</span>
          </div>
        </div>
      </div>
    </div>
  )
}
