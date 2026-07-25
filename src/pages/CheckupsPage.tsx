import { useState } from 'react'
import { Icon, Card, PageHeader, Avatar, StatusBadge, Button, Modal, Input, Select, Textarea, formatDate } from '@/components/ui'
import { residents, checkups } from '@/data/dummy'
import type { NavFn } from '@/types'

export default function CheckupsPage({ navigate }: { navigate: NavFn }) {
  const [showModal, setShowModal] = useState(false)
  const [filterResident, setFilterResident] = useState('All')

  const upcoming = checkups.filter(c =>
    c.followUpStatus === 'Pending' && (filterResident === 'All' || c.residentId === filterResident)
  ).sort((a, b) => a.date.localeCompare(b.date))

  const recent = checkups.filter(c =>
    c.followUpStatus !== 'Pending' && (filterResident === 'All' || c.residentId === filterResident)
  ).sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <PageHeader
        title="Check-ups & Follow-ups"
        description="Track scheduled check-ups and follow-up appointments."
        action={
          <Button onClick={() => setShowModal(true)}>
            <Icon name="plus" size={16} />
            Add Check-up
          </Button>
        }
      />

      {/* Filter */}
      <Card className="p-4 mb-6">
        <div className="flex flex-wrap gap-3 items-center">
          <select
            value={filterResident}
            onChange={e => setFilterResident(e.target.value)}
            className="px-3 py-2.5 rounded-lg border border-edge bg-canvas text-sm text-navy focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors cursor-pointer"
          >
            <option value="All">All Residents</option>
            {residents.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
          </select>
          <p className="text-slate text-sm ml-2">
            <span className="font-semibold text-warn">{upcoming.length}</span> upcoming · <span className="font-semibold text-ok">{recent.length}</span> completed
          </p>
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upcoming */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-warn" />
            <h2 className="text-base font-semibold text-navy font-display">Upcoming Follow-ups</h2>
            <span className="ml-auto bg-warn-50 text-warn text-xs font-semibold px-2 py-0.5 rounded-full border border-warn-100">{upcoming.length}</span>
          </div>
          <div className="space-y-3">
            {upcoming.length === 0 ? (
              <Card className="p-8 text-center">
                <Icon name="check-circle" size={32} className="text-ok mx-auto mb-2" />
                <p className="text-sm text-slate">No upcoming follow-ups.</p>
              </Card>
            ) : (
              upcoming.map(c => {
                const res = residents.find(r => r.id === c.residentId)
                return (
                  <Card key={c.id} className="p-4 border-l-4 border-l-warn">
                    <div className="flex items-start gap-3">
                      <Avatar name={res?.name ?? '?'} size="md" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 flex-wrap">
                          <button
                            onClick={() => navigate('resident-profile', c.residentId)}
                            className="font-semibold text-sm text-navy hover:text-brand cursor-pointer transition-colors"
                          >
                            {res?.name}
                          </button>
                          <StatusBadge status={c.followUpStatus} />
                        </div>
                        <p className="text-sm text-navy mt-1 font-medium">{c.type}</p>
                        <p className="text-xs text-slate mt-0.5">{c.provider}</p>
                        <div className="flex items-center gap-1 mt-2 text-xs text-warn font-medium">
                          <Icon name="calendar" size={12} />
                          {formatDate(c.date)}
                        </div>
                        {c.notes && <p className="text-xs text-subtle mt-1.5 italic">{c.notes}</p>}
                      </div>
                    </div>
                  </Card>
                )
              })
            )}
          </div>
        </div>

        {/* Recent */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-ok" />
            <h2 className="text-base font-semibold text-navy font-display">Recent Check-ups</h2>
            <span className="ml-auto bg-ok-50 text-ok text-xs font-semibold px-2 py-0.5 rounded-full border border-ok-100">{recent.length}</span>
          </div>
          <div className="space-y-3">
            {recent.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-sm text-slate">No completed check-ups yet.</p>
              </Card>
            ) : (
              recent.map(c => {
                const res = residents.find(r => r.id === c.residentId)
                return (
                  <Card key={c.id} className="p-4 border-l-4 border-l-ok">
                    <div className="flex items-start gap-3">
                      <Avatar name={res?.name ?? '?'} size="md" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 flex-wrap">
                          <button
                            onClick={() => navigate('resident-profile', c.residentId)}
                            className="font-semibold text-sm text-navy hover:text-brand cursor-pointer transition-colors"
                          >
                            {res?.name}
                          </button>
                          <StatusBadge status={c.followUpStatus} />
                        </div>
                        <p className="text-sm text-navy mt-1 font-medium">{c.type}</p>
                        <p className="text-xs text-slate mt-0.5">{c.provider}</p>
                        <div className="flex items-center gap-1 mt-2 text-xs text-slate">
                          <Icon name="calendar" size={12} />
                          {formatDate(c.date)}
                        </div>
                        <p className="text-xs text-slate mt-1.5 leading-relaxed line-clamp-2">{c.observations}</p>
                        {c.followUpDate && (
                          <p className="text-xs text-warn mt-1.5 flex items-center gap-1">
                            <Icon name="clock" size={11} /> Next: {formatDate(c.followUpDate)}
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                )
              })
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <Modal title="Add Check-up" onClose={() => setShowModal(false)}>
          <div className="space-y-4">
            <Select label="Resident" required>
              <option value="">Select resident</option>
              {residents.map(r => <option key={r.id} value={r.id}>{r.name} ({r.residentId})</option>)}
            </Select>
            <Input label="Check-up Date" type="date" defaultValue="2026-07-24" required />
            <Input label="Check-up Type" required placeholder="e.g. General Health Check" />
            <Input label="Doctor / Healthcare Provider" placeholder="e.g. Dr. M. Patel" />
            <Textarea label="Observations" rows={3} placeholder="Record check-up observations…" />
            <Input label="Follow-up Date (if required)" type="date" />
            <Textarea label="Notes" rows={2} placeholder="Any additional notes…" />
            <div className="flex gap-3 justify-end pt-2">
              <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button onClick={() => setShowModal(false)}>Save Check-up</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
