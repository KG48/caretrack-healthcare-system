import { useState } from 'react'
import { Icon, Card, PageHeader, Avatar, CategoryBadge, PriorityBadge, Button, Modal, Input, Select, Textarea, formatDate } from '@/components/ui'
import { residents, careNotes } from '@/data/dummy'
import type { NavFn } from '@/types'

export default function CareNotesPage({ navigate }: { navigate: NavFn }) {
  const [showModal, setShowModal] = useState(false)
  const [filterResident, setFilterResident] = useState('All')
  const [filterCategory, setFilterCategory] = useState('All')
  const [search, setSearch] = useState('')

  const categories = ['Daily Care', 'Health', 'Medication', 'Follow-up', 'General']

  const filtered = careNotes
    .filter(n => {
      const res = residents.find(r => r.id === n.residentId)
      const q = search.toLowerCase()
      const matchSearch = !q || n.note.toLowerCase().includes(q) || res?.name.toLowerCase().includes(q)
      const matchResident = filterResident === 'All' || n.residentId === filterResident
      const matchCategory = filterCategory === 'All' || n.category === filterCategory
      return matchSearch && matchResident && matchCategory
    })
    .sort((a, b) => b.date.localeCompare(a.date))

  const highPriorityNotes = careNotes.filter(n => n.priority === 'High')

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <PageHeader
        title="Care Notes"
        description="Daily care logs and important notes for each resident."
        action={
          <Button onClick={() => setShowModal(true)}>
            <Icon name="plus" size={16} />
            Add Care Note
          </Button>
        }
      />

      {/* High priority alert */}
      {highPriorityNotes.length > 0 && (
        <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-danger-50 border border-danger-100 mb-6">
          <Icon name="alert-circle" size={16} className="text-danger shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-danger">
              {highPriorityNotes.length} high-priority {highPriorityNotes.length === 1 ? 'note requires' : 'notes require'} attention
            </p>
            <div className="flex flex-wrap gap-2 mt-1">
              {highPriorityNotes.map(n => {
                const res = residents.find(r => r.id === n.residentId)
                return (
                  <button
                    key={n.id}
                    onClick={() => navigate('resident-profile', n.residentId)}
                    className="text-xs text-danger underline cursor-pointer"
                  >
                    {res?.name} ({n.category})
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-48">
            <Icon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-subtle" />
            <input
              type="text"
              placeholder="Search care notes…"
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
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
            className="px-3 py-2.5 rounded-lg border border-edge bg-canvas text-sm text-navy focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors cursor-pointer"
          >
            <option value="All">All Categories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </Card>

      <p className="text-slate text-sm mb-4">
        Showing <span className="font-semibold text-navy">{filtered.length}</span> of {careNotes.length} notes
      </p>

      {/* Notes */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-slate text-sm">No care notes match the current filters.</p>
          </Card>
        ) : (
          filtered.map(note => {
            const res = residents.find(r => r.id === note.residentId)
            return (
              <Card
                key={note.id}
                className={`p-5 border-l-4 ${
                  note.priority === 'High' ? 'border-l-danger' :
                  note.priority === 'Medium' ? 'border-l-warn' : 'border-l-ok'
                }`}
              >
                <div className="flex items-start gap-4">
                  <Avatar name={res?.name ?? '?'} size="md" />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                      <div>
                        <button
                          onClick={() => navigate('resident-profile', note.residentId)}
                          className="font-semibold text-sm text-navy hover:text-brand cursor-pointer transition-colors"
                        >
                          {res?.name}
                        </button>
                        <span className="text-subtle text-xs ml-2">{res?.residentId}</span>
                      </div>
                      <span className="text-xs text-subtle shrink-0">{formatDate(note.date)}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <CategoryBadge category={note.category} />
                      <PriorityBadge priority={note.priority} />
                    </div>
                    <p className="text-sm text-navy leading-relaxed">{note.note}</p>
                    <p className="text-xs text-subtle mt-2">Added by {note.addedBy}</p>
                  </div>
                </div>
              </Card>
            )
          })
        )}
      </div>

      {showModal && (
        <Modal title="Add Care Note" onClose={() => setShowModal(false)}>
          <div className="space-y-4">
            <Select label="Resident" required>
              <option value="">Select resident</option>
              {residents.map(r => <option key={r.id} value={r.id}>{r.name} ({r.residentId})</option>)}
            </Select>
            <Input label="Date" type="date" defaultValue="2026-07-24" required />
            <div className="grid grid-cols-2 gap-3">
              <Select label="Category" required>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </Select>
              <Select label="Priority" required>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </Select>
            </div>
            <Textarea label="Note" required rows={4} placeholder="Enter the care note details…" />
            <div className="flex gap-3 justify-end pt-2">
              <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button onClick={() => setShowModal(false)}>Save Note</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
