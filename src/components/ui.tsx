import type { ReactNode } from 'react'

// ─── Icon ───────────────────────────────────────────────────────────────────

type IconName =
  | 'dashboard' | 'users' | 'file-text' | 'pill' | 'calendar' | 'clipboard'
  | 'bar-chart' | 'settings' | 'logout' | 'plus' | 'search' | 'x' | 'edit'
  | 'eye' | 'eye-off' | 'arrow-left' | 'filter' | 'download' | 'user'
  | 'bell' | 'lock' | 'shield' | 'check-circle' | 'menu' | 'alert-circle'
  | 'check' | 'chevron-right' | 'chevron-down' | 'clock' | 'activity'
  | 'heart' | 'info' | 'more-vertical' | 'upload'

export function Icon({ name, size = 18, className = '' }: { name: IconName; size?: number; className?: string }) {
  const commonProps = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
  }

  const icons: Record<IconName, ReactNode> = {
    dashboard: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    users: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    'file-text': <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></>,
    pill: <><path d="M10.5 20H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4.5"/><circle cx="17" cy="17" r="5"/><path d="M14 17h6"/></>,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
    clipboard: <><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/></>,
    'bar-chart': <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></>,
    logout: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></>,
    plus: <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    search: <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    x: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    edit: <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
    eye: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
    'eye-off': <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></>,
    'arrow-left': <><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></>,
    filter: <><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></>,
    download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>,
    user: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
    bell: <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></>,
    lock: <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,
    'check-circle': <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>,
    menu: <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>,
    'alert-circle': <><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>,
    check: <polyline points="20 6 9 11 4 16"/>,
    'chevron-right': <polyline points="9 18 15 12 9 6"/>,
    'chevron-down': <polyline points="6 9 12 15 18 9"/>,
    clock: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
    activity: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>,
    heart: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>,
    info: <><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></>,
    'more-vertical': <><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></>,
    upload: <><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></>,
  }

  return <svg {...commonProps}>{icons[name]}</svg>
}

// ─── Avatar ─────────────────────────────────────────────────────────────────

const avatarColors = [
  'bg-teal-500', 'bg-blue-500', 'bg-violet-500', 'bg-rose-500',
  'bg-amber-500', 'bg-emerald-500', 'bg-indigo-500', 'bg-orange-500',
]

export function Avatar({ name, size = 'md' }: { name: string; size?: 'sm' | 'md' | 'lg' | 'xl' }) {
  const initials = name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
  const colorIdx = name.charCodeAt(0) % avatarColors.length
  const color = avatarColors[colorIdx]

  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-xl',
  }

  return (
    <div className={`${sizes[size]} ${color} rounded-full flex items-center justify-center text-white font-semibold font-display shrink-0`}>
      {initials}
    </div>
  )
}

// ─── Badge ───────────────────────────────────────────────────────────────────

type BadgeVariant = 'brand' | 'ok' | 'warn' | 'danger' | 'neutral' | 'info' | 'purple'

const badgeStyles: Record<BadgeVariant, string> = {
  brand:   'bg-brand-50 text-brand-700 border border-brand-100',
  ok:      'bg-ok-50 text-ok border border-ok-100',
  warn:    'bg-warn-50 text-warn border border-warn-100',
  danger:  'bg-danger-50 text-danger border border-danger-100',
  neutral: 'bg-slate-100 text-slate border border-edge',
  info:    'bg-info-50 text-info border border-info-100',
  purple:  'bg-violet-50 text-violet-700 border border-violet-200',
}

export function Badge({ children, variant = 'neutral' }: { children: ReactNode; variant?: BadgeVariant }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${badgeStyles[variant]}`}>
      {children}
    </span>
  )
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, BadgeVariant> = {
    'Active': 'ok',
    'Inactive': 'neutral',
    'Completed': 'neutral',
    'Discontinued': 'danger',
    'Pending': 'warn',
    'Overdue': 'danger',
  }
  return <Badge variant={map[status] ?? 'neutral'}>{status}</Badge>
}

export function RecordTypeBadge({ type }: { type: string }) {
  const map: Record<string, BadgeVariant> = {
    'Routine Check-up': 'brand',
    'Health Observation': 'info',
    'Medical Visit': 'purple',
    'Emergency Record': 'danger',
    'Other': 'neutral',
  }
  return <Badge variant={map[type] ?? 'neutral'}>{type}</Badge>
}

export function PriorityBadge({ priority }: { priority: string }) {
  const map: Record<string, BadgeVariant> = {
    'Low': 'ok',
    'Medium': 'warn',
    'High': 'danger',
  }
  return <Badge variant={map[priority] ?? 'neutral'}>{priority}</Badge>
}

export function CategoryBadge({ category }: { category: string }) {
  const map: Record<string, BadgeVariant> = {
    'Daily Care': 'brand',
    'Health': 'danger',
    'Medication': 'purple',
    'Follow-up': 'warn',
    'General': 'neutral',
  }
  return <Badge variant={map[category] ?? 'neutral'}>{category}</Badge>
}

// ─── Card ─────────────────────────────────────────────────────────────────────

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-canvas rounded-xl border border-edge shadow-sm ${className}`}>
      {children}
    </div>
  )
}

// ─── PageHeader ───────────────────────────────────────────────────────────────

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string
  description?: string
  action?: ReactNode
}) {
  return (
    <div className="flex items-start justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-navy font-display">{title}</h1>
        {description && <p className="text-slate text-sm mt-1">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}

// ─── Button ───────────────────────────────────────────────────────────────────

type BtnVariant = 'primary' | 'secondary' | 'ghost' | 'danger'

const btnStyles: Record<BtnVariant, string> = {
  primary:   'bg-brand text-white hover:bg-brand-700 shadow-sm',
  secondary: 'bg-canvas text-navy border border-edge hover:bg-surface shadow-sm',
  ghost:     'text-slate hover:bg-surface hover:text-navy',
  danger:    'bg-danger-50 text-danger border border-danger-100 hover:bg-danger-100',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}: {
  children: ReactNode
  variant?: BtnVariant
  size?: 'sm' | 'md'
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  className?: string
}) {
  const sizes = { sm: 'px-3 py-1.5 text-sm', md: 'px-4 py-2 text-sm' }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-1.5 rounded-lg font-medium transition-colors duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${sizes[size]} ${btnStyles[variant]} ${className}`}
    >
      {children}
    </button>
  )
}

// ─── Input ────────────────────────────────────────────────────────────────────

export function Input({
  label,
  id,
  required = false,
  error,
  className = '',
  ...props
}: {
  label?: string
  id?: string
  required?: boolean
  error?: string
  className?: string
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-navy mb-1.5">
          {label}{required && <span className="text-danger ml-0.5">*</span>}
        </label>
      )}
      <input
        id={id}
        {...props}
        className={`w-full px-3 py-2.5 rounded-lg border text-sm bg-canvas text-navy placeholder-subtle focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors duration-150 ${error ? 'border-danger' : 'border-edge'}`}
      />
      {error && <p className="text-danger text-xs mt-1">{error}</p>}
    </div>
  )
}

// ─── Select ───────────────────────────────────────────────────────────────────

export function Select({
  label,
  id,
  required = false,
  children,
  className = '',
  ...props
}: {
  label?: string
  id?: string
  required?: boolean
  children: ReactNode
  className?: string
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-navy mb-1.5">
          {label}{required && <span className="text-danger ml-0.5">*</span>}
        </label>
      )}
      <select
        id={id}
        {...props}
        className="w-full px-3 py-2.5 rounded-lg border border-edge text-sm bg-canvas text-navy focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors duration-150"
      >
        {children}
      </select>
    </div>
  )
}

// ─── Textarea ─────────────────────────────────────────────────────────────────

export function Textarea({
  label,
  id,
  rows = 3,
  required = false,
  className = '',
  ...props
}: {
  label?: string
  id?: string
  rows?: number
  required?: boolean
  className?: string
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-navy mb-1.5">
          {label}{required && <span className="text-danger ml-0.5">*</span>}
        </label>
      )}
      <textarea
        id={id}
        rows={rows}
        {...props}
        className="w-full px-3 py-2.5 rounded-lg border border-edge text-sm bg-canvas text-navy placeholder-subtle focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors duration-150 resize-none"
      />
    </div>
  )
}

// ─── Modal ───────────────────────────────────────────────────────────────────

export function Modal({
  title,
  children,
  onClose,
  size = 'md',
}: {
  title: string
  children: ReactNode
  onClose: () => void
  size?: 'md' | 'lg'
}) {
  const widths = { md: 'max-w-lg', lg: 'max-w-2xl' }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-navy/40 backdrop-blur-[2px]" onClick={onClose} />
      <div className={`relative bg-canvas rounded-2xl shadow-xl w-full ${widths[size]} max-h-[90vh] overflow-y-auto`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-edge sticky top-0 bg-canvas rounded-t-2xl">
          <h2 className="text-lg font-semibold text-navy font-display">{title}</h2>
          <button onClick={onClose} className="text-slate hover:text-navy transition-colors p-1 rounded-lg hover:bg-surface cursor-pointer">
            <Icon name="x" size={18} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}

// ─── EmptyState ───────────────────────────────────────────────────────────────

export function EmptyState({ icon, title, description }: { icon: IconName; title: string; description?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center text-brand mb-4">
        <Icon name={icon} size={22} />
      </div>
      <p className="text-navy font-medium">{title}</p>
      {description && <p className="text-slate text-sm mt-1 max-w-xs">{description}</p>}
    </div>
  )
}

// ─── SectionTitle ─────────────────────────────────────────────────────────────

export function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-base font-semibold text-navy font-display mb-4">{children}</h2>
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function formatDate(dateStr: string): string {
  if (!dateStr || dateStr === 'Ongoing') return dateStr
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

export function relativeDate(dateStr: string): string {
  const d = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  return formatDate(dateStr)
}
