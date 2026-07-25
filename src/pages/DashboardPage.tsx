import { Icon, Card, SectionTitle, Avatar, StatusBadge, RecordTypeBadge, formatDate, Button } from '@/components/ui'
import { residents, healthRecords, medications, checkups, careNotes } from '@/data/dummy'
import type { NavFn } from '@/types'

function StatCard({
  icon, label, value, sub, color,
}: {
  icon: Parameters<typeof Icon>[0]['name']
  label: string
  value: number | string
  sub?: string
  color: string
}) {
  return (
    <Card className="p-5 flex items-start gap-4">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
        <Icon name={icon} size={20} />
      </div>
      <div>
        <p className="text-slate text-sm">{label}</p>
        <p className="text-2xl font-bold text-navy font-display mt-0.5">{value}</p>
        {sub && <p className="text-subtle text-xs mt-1">{sub}</p>}
      </div>
    </Card>
  )
}

export default function DashboardPage({
  navigate,
  userName,
}: {
  navigate: NavFn
  userName: string
}) {
  const activeResidents = residents.filter(r => r.status === 'Active').length
  const activeHealthRecords = healthRecords.filter(r => r.date >= '2026-07-01').length
  const upcomingFollowUps = checkups.filter(c => c.followUpStatus === 'Pending').length
  const recentUpdates = healthRecords.filter(r => r.date >= '2026-07-15').length

  const recentActivity = [
    ...healthRecords.map(r => ({
      type: 'health' as const,
      date: r.date,
      resident: residents.find(x => x.id === r.residentId)?.name ?? '',
      detail: r.type,
      note: r.description.slice(0, 80) + '…',
    })),
    ...careNotes.filter(n => n.priority === 'High').map(n => ({
      type: 'note' as const,
      date: n.date,
      resident: residents.find(x => x.id === n.residentId)?.name ?? '',
      detail: n.category,
      note: n.note.slice(0, 80) + '…',
    })),
  ]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 6)

  const upcomingList = checkups.filter(c => c.followUpStatus === 'Pending').slice(0, 5)

  const quickActions = [
    { label: 'Add Resident', icon: 'users' as const, page: 'add-resident' as const, color: 'bg-brand-50 text-brand hover:bg-brand-100' },
    { label: 'Add Health Record', icon: 'file-text' as const, page: 'health-records' as const, color: 'bg-info-50 text-info hover:bg-info-100' },
    { label: 'Add Medication', icon: 'pill' as const, page: 'medications' as const, color: 'bg-violet-50 text-violet-700 hover:bg-violet-100' },
    { label: 'Add Check-up', icon: 'calendar' as const, page: 'checkups' as const, color: 'bg-warn-50 text-warn hover:bg-warn-100' },
  ]

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-navy font-display">
  Good morning, {userName}
</h1>
        <p className="text-slate text-sm mt-1">
          Thursday, 24 July 2026 · Greenfield Social Welfare Centre
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon="users" label="Total Residents" value={residents.length} sub={`${activeResidents} active`} color="bg-brand-50 text-brand" />
        <StatCard icon="file-text" label="Active Health Records" value={activeHealthRecords} sub="This month" color="bg-info-50 text-info" />
        <StatCard icon="calendar" label="Upcoming Follow-ups" value={upcomingFollowUps} sub="Awaiting review" color="bg-warn-50 text-warn" />
        <StatCard icon="activity" label="Recent Health Updates" value={recentUpdates} sub="Last 10 days" color="bg-ok-50 text-ok" />
      </div>

      {/* Quick actions */}
      <Card className="p-5 mb-8">
        <SectionTitle>Quick Actions</SectionTitle>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickActions.map(a => (
            <button
              key={a.label}
              onClick={() => navigate(a.page)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-colors duration-150 cursor-pointer ${a.color}`}
            >
              <Icon name={a.icon} size={18} />
              {a.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Two-column section */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Recent Activity — wider */}
        <Card className="lg:col-span-3 p-5">
          <SectionTitle>Recent Activity</SectionTitle>
          <div className="space-y-4">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-start gap-3 pb-4 border-b border-edge last:border-0 last:pb-0">
                <div className="mt-0.5">
                  <Avatar name={a.resident} size="sm" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <p className="text-sm font-medium text-navy">{a.resident}</p>
                    <span className="text-xs text-subtle shrink-0">{formatDate(a.date)}</span>
                  </div>
                  <div className="mt-0.5 mb-1">
                    <RecordTypeBadge type={a.detail} />
                  </div>
                  <p className="text-xs text-slate leading-relaxed line-clamp-2">{a.note}</p>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate('health-records')}
            className="mt-4 text-sm text-brand hover:text-brand-700 font-medium flex items-center gap-1 cursor-pointer"
          >
            View all health records
            <Icon name="chevron-right" size={14} />
          </button>
        </Card>

        {/* Upcoming Follow-ups — narrower */}
        <Card className="lg:col-span-2 p-5">
          <SectionTitle>Upcoming Follow-ups</SectionTitle>
          <div className="space-y-3">
            {upcomingList.map(c => {
              const res = residents.find(r => r.id === c.residentId)
              return (
                <div key={c.id} className="p-3 rounded-xl bg-surface border border-edge">
                  <div className="flex items-center gap-2 mb-1">
                    <Avatar name={res?.name ?? '?'} size="sm" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-navy truncate">{res?.name}</p>
                      <p className="text-xs text-subtle truncate">{res?.residentId}</p>
                    </div>
                  </div>
                  <p className="text-xs font-medium text-navy mt-2">{c.type}</p>
                  <div className="flex items-center justify-between mt-1.5">
                    <div className="flex items-center gap-1 text-xs text-slate">
                      <Icon name="calendar" size={12} />
                      {formatDate(c.date)}
                    </div>
                    <StatusBadge status={c.followUpStatus} />
                  </div>
                </div>
              )
            })}
          </div>
          <button
            onClick={() => navigate('checkups')}
            className="mt-4 text-sm text-brand hover:text-brand-700 font-medium flex items-center gap-1 cursor-pointer"
          >
            View all follow-ups
            <Icon name="chevron-right" size={14} />
          </button>
        </Card>
      </div>

      {/* Active medications summary */}
      <Card className="p-5 mt-6">
        <div className="flex items-center justify-between mb-4">
          <SectionTitle>Active Medications Overview</SectionTitle>
          <Button variant="ghost" size="sm" onClick={() => navigate('medications')}>
            View all
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left">
                <th className="text-subtle text-xs font-semibold pb-3 pr-4">Resident</th>
                <th className="text-subtle text-xs font-semibold pb-3 pr-4">Medicine</th>
                <th className="text-subtle text-xs font-semibold pb-3 pr-4">Dosage</th>
                <th className="text-subtle text-xs font-semibold pb-3 pr-4">Frequency</th>
                <th className="text-subtle text-xs font-semibold pb-3">Timing</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-edge">
              {medications.filter(m => m.status === 'Active').slice(0, 6).map(m => {
                const res = residents.find(r => r.id === m.residentId)
                return (
                  <tr key={m.id} className="hover:bg-surface transition-colors">
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        <Avatar name={res?.name ?? '?'} size="sm" />
                        <span className="font-medium text-navy">{res?.name}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-4 text-navy">{m.medicine}</td>
                    <td className="py-3 pr-4 text-slate">{m.dosage}</td>
                    <td className="py-3 pr-4 text-slate">{m.frequency}</td>
                    <td className="py-3 text-slate">{m.timing}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
