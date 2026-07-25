import { useState } from 'react'
import { Icon, Card, PageHeader, Avatar, RecordTypeBadge, Button, Modal, Input, Select, Textarea, formatDate } from '@/components/ui'
import { residents, healthRecords } from '@/data/dummy'
import type { NavFn } from '@/types'

export default function HealthRecordsPage({ navigate }: { navigate: NavFn }) {
  const [search, setSearch] = useState('')
  const [filterResident, setFilterResident] = useState('All')
  const [filterType, setFilterType] = useState('All')
  const [showModal, setShowModal] = useState(false)

  const recordTypes = ['Routine Check-up', 'Health Observation', 'Medical Visit', 'Emergency Record', 'Other']

  const filtered = healthRecords
    .filter(r => {
      const res = residents.find(x => x.id === r.residentId)
      const q = search.toLowerCase()
      const matchSearch = !q || res?.name.toLowerCase().includes(q) || r.description.toLowerCase().includes(q) || r.recordedBy.toLowerCase().includes(q)
      const matchResident = filterResident === 'All' || r.residentId === filterResident
      const matchType = filterType === 'All' || r.type === filterType
      return matchSearch && matchResident && matchType
    })
    .sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <PageHeader
        title="Health Records"
        description="View and manage all resident health records."
        action={
          <Button onClick={() => setShowModal(true)}>
            <Icon name="plus" size={16} />
            Add Health Record
          </Button>
        }
      />

      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-48">
            <Icon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-subtle" />
            <input
              type="text"
              placeholder="Search records…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-edge bg-canvas text-sm text-navy placeholder-subtle focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors"
            />
          </div>
          <select
            value={filterResident}
            onChange={e => setFilterResident(e.target.value)}
            className="px-3 py-2.5 rounded-lg border border-edge bg-canvas text-sm text-navy focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors cursor-pointer"
          >
            <option value="All">All Residents</option>
            {residents.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
          </select>
          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            className="px-3 py-2.5 rounded-lg border border-edge bg-canvas text-sm text-navy focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors cursor-pointer"
          >
            <option value="All">All Types</option>
            {recordTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </Card>

      <p className="text-slate text-sm mb-4">
        Showing <span className="font-semibold text-navy">{filtered.length}</span> records
      </p>

      {/* Records */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-slate text-sm">No health records match the current filters.</p>
          </Card>
        ) : (
          filtered.map(record => {
            const res = residents.find(r => r.id === record.residentId)
            return (
              <Card key={record.id} className="p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="shrink-0">
                    <Avatar name={res?.name ?? '?'} size="md" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                      <div>
                        <button
                          onClick={() => navigate('resident-profile', record.residentId)}
                          className="font-semibold text-navy hover:text-brand cursor-pointer transition-colors text-sm"
                        >
                          {res?.name}
                        </button>
                        <span className="text-subtle text-xs ml-2">{res?.residentId}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs text-subtle">{formatDate(record.date)}</span>
                        <RecordTypeBadge type={record.type} />
                      </div>
                    </div>
                    <p className="text-sm text-navy leading-relaxed mb-2">{record.description}</p>
                    {record.notes && (
                      <p className="text-xs text-slate italic border-l-2 border-edge pl-3 mb-2">{record.notes}</p>
                    )}
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <p className="text-xs text-subtle">Recorded by {record.recordedBy}</p>
                      {record.followUpRequired && record.followUpDate && (
                        <span className="text-xs text-warn bg-warn-50 px-2 py-0.5 rounded-full border border-warn-100 flex items-center gap-1">
                          <Icon name="clock" size={11} />
                          Follow-up: {formatDate(record.followUpDate)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            )
          })
        )}
      </div>

      {showModal && (
        <Modal title="Add Health Record" onClose={() => setShowModal(false)}>
          <div className="space-y-4">
            <Select label="Resident" required>
              <option value="">Select resident</option>
              {residents.map(r => <option key={r.id} value={r.id}>{r.name} ({r.residentId})</option>)}
            </Select>
            <Input label="Date" type="date" defaultValue="2026-07-24" required />
            <Select label="Record Type" required>
              {recordTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </Select>
            <Textarea label="Health Observation" required rows={3} placeholder="Describe the health observation or findings…" />
            <Textarea label="Additional Notes" rows={2} placeholder="Notes or instructions…" />
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-sm text-navy cursor-pointer">
                <input type="checkbox" className="w-4 h-4" />
                Follow-up required
              </label>
            </div>
            <Input label="Follow-up Date (if applicable)" type="date" />
            <div className="flex gap-3 justify-end pt-2">
              <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button onClick={() => setShowModal(false)}>Save Record</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
