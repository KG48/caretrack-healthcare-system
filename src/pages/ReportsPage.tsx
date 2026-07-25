import { Icon, Card, PageHeader, Button, Avatar, StatusBadge, Badge, formatDate } from '@/components/ui'
import { residents, healthRecords, medications, checkups, careNotes } from '@/data/dummy'
import type { NavFn } from '@/types'

function BarChart({ data, max }: { data: { label: string; value: number; color: string }[]; max: number }) {
  return (
    <div className="space-y-2.5">
      {data.map(item => (
        <div key={item.label} className="flex items-center gap-3 text-sm">
          <span className="text-slate text-xs w-10 shrink-0">{item.label}</span>
          <div className="flex-1 bg-surface rounded-full h-2.5 overflow-hidden border border-edge">
            <div
              className={`h-full rounded-full ${item.color} transition-all duration-500`}
              style={{ width: `${max > 0 ? (item.value / max) * 100 : 0}%` }}
            />
          </div>
          <span className="text-navy font-semibold text-xs w-4 shrink-0">{item.value}</span>
        </div>
      ))}
    </div>
  )
}

export default function ReportsPage({ navigate: _navigate }: { navigate: NavFn }) {
  const activeResidents = residents.filter(r => r.status === 'Active').length
  const activeMeds = medications.filter(m => m.status === 'Active').length
  const upcomingFollowUps = checkups.filter(c => c.followUpStatus === 'Pending').length
  const highPriorityNotes = careNotes.filter(n => n.priority === 'High').length

  // Health records per month (last 6 months)
  const monthData = [
    { label: 'Feb', value: 1, color: 'bg-brand' },
    { label: 'Mar', value: 0, color: 'bg-brand' },
    { label: 'Apr', value: 3, color: 'bg-brand' },
    { label: 'May', value: 4, color: 'bg-brand' },
    { label: 'Jun', value: 5, color: 'bg-brand' },
    { label: 'Jul', value: 8, color: 'bg-brand' },
  ]
  const maxMonth = Math.max(...monthData.map(d => d.value))

  // Records by type
  const typeCount: Record<string, number> = {}
  healthRecords.forEach(r => { typeCount[r.type] = (typeCount[r.type] ?? 0) + 1 })
  const typeColors: Record<string, string> = {
    'Routine Check-up': 'bg-brand',
    'Health Observation': 'bg-blue-400',
    'Medical Visit': 'bg-violet-400',
    'Emergency Record': 'bg-danger',
    'Other': 'bg-subtle',
  }
  const typeData = Object.entries(typeCount).map(([label, value]) => ({
    label, value, color: typeColors[label] ?? 'bg-subtle',
  }))
  const maxType = Math.max(...typeData.map(d => d.value))

  // Medications by resident (active only)
  const medsByResident = residents.map(r => ({
    resident: r,
    count: medications.filter(m => m.residentId === r.id && m.status === 'Active').length,
  })).filter(x => x.count > 0)

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <PageHeader
        title="Reports"
        description="Overview and summary of care activities across all residents."
        action={
          <Button variant="secondary">
            <Icon name="download" size={16} />
            Export Report
          </Button>
        }
      />

      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Residents', value: residents.length, sub: `${activeResidents} active`, color: 'bg-brand-50 text-brand', icon: 'users' as const },
          { label: 'Health Records', value: healthRecords.length, sub: 'All time', color: 'bg-info-50 text-info', icon: 'file-text' as const },
          { label: 'Active Medications', value: activeMeds, sub: `across ${residents.length} residents`, color: 'bg-violet-50 text-violet-700', icon: 'pill' as const },
          { label: 'Upcoming Follow-ups', value: upcomingFollowUps, sub: `${highPriorityNotes} high-priority notes`, color: 'bg-warn-50 text-warn', icon: 'calendar' as const },
        ].map(s => (
          <Card key={s.label} className="p-4 flex items-start gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${s.color}`}>
              <Icon name={s.icon} size={18} />
            </div>
            <div>
              <p className="text-slate text-xs">{s.label}</p>
              <p className="text-2xl font-bold text-navy font-display">{s.value}</p>
              <p className="text-subtle text-xs mt-0.5">{s.sub}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Health Records by Month */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-navy font-display">Health Records by Month</h2>
            <Badge variant="neutral">Last 6 months</Badge>
          </div>
          <BarChart data={monthData} max={maxMonth} />
          <p className="text-xs text-subtle mt-4 text-right">
            Total: {healthRecords.length} records
          </p>
        </Card>

        {/* Records by Type */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-navy font-display">Records by Type</h2>
          </div>
          <BarChart data={typeData} max={maxType} />
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Active Medications by Resident */}
        <Card className="p-5">
          <h2 className="text-base font-semibold text-navy font-display mb-4">Active Medications per Resident</h2>
          <div className="space-y-3">
            {medsByResident.sort((a, b) => b.count - a.count).map(({ resident: r, count }) => (
              <div key={r.id} className="flex items-center gap-3">
                <Avatar name={r.name} size="sm" />
                <span className="text-sm text-navy flex-1">{r.name}</span>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {Array.from({ length: count }).map((_, i) => (
                      <div key={i} className="w-2 h-4 rounded-sm bg-brand opacity-80" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-navy w-4">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Resident Summary Table */}
        <Card className="p-5">
          <h2 className="text-base font-semibold text-navy font-display mb-4">Resident Status Summary</h2>
          <div className="space-y-2">
            {residents.map(r => {
              const records = healthRecords.filter(hr => hr.residentId === r.id).length
              const meds = medications.filter(m => m.residentId === r.id && m.status === 'Active').length
              const followUp = checkups.filter(c => c.residentId === r.id && c.followUpStatus === 'Pending').length
              return (
                <div key={r.id} className="flex items-center gap-3 py-2 border-b border-edge last:border-0">
                  <Avatar name={r.name} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-navy truncate">{r.name}</p>
                    <p className="text-xs text-subtle">{r.residentId}</p>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate shrink-0">
                    <span className="flex items-center gap-1">
                      <Icon name="file-text" size={11} className="text-subtle" />{records}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="pill" size={11} className="text-subtle" />{meds}
                    </span>
                    {followUp > 0 && (
                      <span className="flex items-center gap-1 text-warn font-semibold">
                        <Icon name="calendar" size={11} />{followUp}
                      </span>
                    )}
                    <StatusBadge status={r.status} />
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-5 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-navy font-display">Recent Activities</h2>
          <Badge variant="neutral">Last 10 entries</Badge>
        </div>
        <div className="space-y-3">
          {healthRecords
            .sort((a, b) => b.date.localeCompare(a.date))
            .slice(0, 8)
            .map(r => {
              const res = residents.find(x => x.id === r.residentId)
              return (
                <div key={r.id} className="flex items-start gap-3 py-2 border-b border-edge last:border-0">
                  <Avatar name={res?.name ?? '?'} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-navy">
                      <span className="font-medium">{res?.name}</span>
                      <span className="text-slate"> — {r.type}</span>
                    </p>
                    <p className="text-xs text-subtle mt-0.5 truncate">{r.description.slice(0, 90)}…</p>
                  </div>
                  <span className="text-xs text-subtle shrink-0">{formatDate(r.date)}</span>
                </div>
              )
            })}
        </div>
      </Card>

      <div className="mt-6 flex items-center gap-2 justify-center text-xs text-subtle">
        <Icon name="shield" size={12} />
        Reports are generated from live data and are for internal use only. Do not share outside authorised staff.
      </div>
    </div>
  )
}
