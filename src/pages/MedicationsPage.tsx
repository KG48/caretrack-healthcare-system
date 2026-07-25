import { useState } from 'react'
import { Icon, Card, PageHeader, Avatar, StatusBadge, Badge, Button, Modal, Input, Select, Textarea, formatDate } from '@/components/ui'
import { residents, medications } from '@/data/dummy'
import type { NavFn } from '@/types'

export default function MedicationsPage({ navigate }: { navigate: NavFn }) {
  const [filterResident, setFilterResident] = useState('All')
  const [filterStatus, setFilterStatus] = useState('All')
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)

  const filtered = medications.filter(m => {
    const res = residents.find(r => r.id === m.residentId)
    const q = search.toLowerCase()
    const matchSearch = !q || m.medicine.toLowerCase().includes(q) || res?.name.toLowerCase().includes(q)
    const matchResident = filterResident === 'All' || m.residentId === filterResident
    const matchStatus = filterStatus === 'All' || m.status === filterStatus
    return matchSearch && matchResident && matchStatus
  })

  const activeMeds = medications.filter(m => m.status === 'Active')
  const discontinuedMeds = medications.filter(m => m.status === 'Discontinued')

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <PageHeader
        title="Medication Management"
        description="View and manage all resident medication records."
        action={
          <Button onClick={() => setShowModal(true)}>
            <Icon name="plus" size={16} />
            Add Medication
          </Button>
        }
      />

      {/* Summary row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="p-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-ok-50 flex items-center justify-center text-ok shrink-0">
            <Icon name="check-circle" size={18} />
          </div>
          <div>
            <p className="text-slate text-xs">Active</p>
            <p className="text-xl font-bold text-navy font-display">{activeMeds.length}</p>
          </div>
        </Card>
        <Card className="p-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-surface flex items-center justify-center text-subtle shrink-0">
            <Icon name="check" size={18} />
          </div>
          <div>
            <p className="text-slate text-xs">Completed</p>
            <p className="text-xl font-bold text-navy font-display">{medications.filter(m => m.status === 'Completed').length}</p>
          </div>
        </Card>
        <Card className="p-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-danger-50 flex items-center justify-center text-danger shrink-0">
            <Icon name="x" size={18} />
          </div>
          <div>
            <p className="text-slate text-xs">Discontinued</p>
            <p className="text-xl font-bold text-navy font-display">{discontinuedMeds.length}</p>
          </div>
        </Card>
      </div>

      {/* Attention warning */}
      {discontinuedMeds.length > 0 && (
        <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-warn-50 border border-warn-100 mb-6">
          <Icon name="alert-circle" size={16} className="text-warn shrink-0 mt-0.5" />
          <p className="text-sm text-warn">
            <span className="font-semibold">{discontinuedMeds.length} medication{discontinuedMeds.length > 1 ? 's' : ''}</span> {discontinuedMeds.length > 1 ? 'have' : 'has'} been discontinued. Please review and confirm with the attending physician.
          </p>
        </div>
      )}

      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-48">
            <Icon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-subtle" />
            <input
              type="text"
              placeholder="Search by medicine or resident…"
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
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="px-3 py-2.5 rounded-lg border border-edge bg-canvas text-sm text-navy focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
            <option value="Discontinued">Discontinued</option>
          </select>
        </div>
      </Card>

      <p className="text-slate text-sm mb-4">
        Showing <span className="font-semibold text-navy">{filtered.length}</span> of {medications.length} medication records
      </p>

      {/* Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-surface border-b border-edge">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-subtle uppercase tracking-wider">Resident</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-subtle uppercase tracking-wider">Medicine</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-subtle uppercase tracking-wider hidden sm:table-cell">Dosage</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-subtle uppercase tracking-wider hidden md:table-cell">Frequency</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-subtle uppercase tracking-wider hidden lg:table-cell">Start Date</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-subtle uppercase tracking-wider hidden lg:table-cell">End Date</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-subtle uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-edge">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate text-sm">
                    No medications match the current filters.
                  </td>
                </tr>
              ) : (
                filtered.map(m => {
                  const res = residents.find(r => r.id === m.residentId)
                  const isDiscontinued = m.status === 'Discontinued'
                  return (
                    <tr
                      key={m.id}
                      className={`hover:bg-surface transition-colors ${isDiscontinued ? 'opacity-60' : ''}`}
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <Avatar name={res?.name ?? '?'} size="sm" />
                          <button
                            onClick={() => navigate('resident-profile', m.residentId)}
                            className="font-medium text-navy hover:text-brand text-sm cursor-pointer transition-colors"
                          >
                            {res?.name}
                          </button>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <p className="font-medium text-sm text-navy">{m.medicine}</p>
                        <p className="text-xs text-subtle mt-0.5 hidden sm:block">{m.timing}</p>
                      </td>
                      <td className="px-5 py-3.5 text-sm text-slate hidden sm:table-cell">{m.dosage}</td>
                      <td className="px-5 py-3.5 text-sm text-slate hidden md:table-cell">{m.frequency}</td>
                      <td className="px-5 py-3.5 text-sm text-slate hidden lg:table-cell">{formatDate(m.startDate)}</td>
                      <td className="px-5 py-3.5 text-sm hidden lg:table-cell">
                        {m.endDate === 'Ongoing'
                          ? <Badge variant="ok">Ongoing</Badge>
                          : <span className="text-slate">{formatDate(m.endDate)}</span>
                        }
                      </td>
                      <td className="px-5 py-3.5">
                        <StatusBadge status={m.status} />
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {showModal && (
        <Modal title="Add Medication" onClose={() => setShowModal(false)}>
          <div className="space-y-4">
            <Select label="Resident" required>
              <option value="">Select resident</option>
              {residents.map(r => <option key={r.id} value={r.id}>{r.name} ({r.residentId})</option>)}
            </Select>
            <div className="grid grid-cols-2 gap-3">
              <Input label="Medicine Name" required placeholder="e.g. Amlodipine" className="col-span-2" />
              <Input label="Dosage" required placeholder="e.g. 5 mg" />
              <Select label="Frequency" required>
                <option>Once daily</option>
                <option>Twice daily</option>
                <option>Three times daily</option>
                <option>As required</option>
              </Select>
              <Input label="Timing" placeholder="e.g. Morning, with food" />
              <Input label="Start Date" type="date" defaultValue="2026-07-24" required />
            </div>
            <Textarea label="Instructions" rows={2} placeholder="Special instructions for administration…" />
            <div className="flex gap-3 justify-end pt-2">
              <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button onClick={() => setShowModal(false)}>Save Medication</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
