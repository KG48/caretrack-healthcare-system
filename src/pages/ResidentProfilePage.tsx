import { useState } from 'react'
import {
  Icon, Card, Avatar, StatusBadge, RecordTypeBadge, Badge, CategoryBadge, PriorityBadge,
  Button, Modal, Input, Select, Textarea, formatDate, SectionTitle,
} from '@/components/ui'
import { residents, healthRecords, medications, checkups, careNotes } from '@/data/dummy'
import type { NavFn } from '@/types'

type Tab = 'overview' | 'health-records' | 'medications' | 'checkups' | 'care-notes'

export default function ResidentProfilePage({
  navigate,
  residentId,
}: {
  navigate: NavFn
  residentId: string
}) {
  const [tab, setTab] = useState<Tab>('overview')
  const [showAddHealth, setShowAddHealth] = useState(false)
  const [showAddMed, setShowAddMed] = useState(false)
  const [showAddCheckup, setShowAddCheckup] = useState(false)
  const [showAddNote, setShowAddNote] = useState(false)

  const resident = residents.find(r => r.id === residentId)
  if (!resident) {
    return (
      <div className="p-8 text-center">
        <p className="text-slate">Resident not found.</p>
        <Button onClick={() => navigate('residents')} className="mt-4">Back to Residents</Button>
      </div>
    )
  }

  const resRecords  = healthRecords.filter(r => r.residentId === residentId).sort((a, b) => b.date.localeCompare(a.date))
  const resMeds     = medications.filter(m => m.residentId === residentId)
  const resCheckups = checkups.filter(c => c.residentId === residentId).sort((a, b) => b.date.localeCompare(a.date))
  const resNotes    = careNotes.filter(n => n.residentId === residentId).sort((a, b) => b.date.localeCompare(a.date))

  const tabs: { id: Tab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'health-records', label: 'Health Records' },
    { id: 'medications', label: 'Medications' },
    { id: 'checkups', label: 'Check-ups' },
    { id: 'care-notes', label: 'Care Notes' },
  ]

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      {/* Back */}
      <button
        onClick={() => navigate('residents')}
        className="flex items-center gap-2 text-slate hover:text-navy text-sm mb-5 cursor-pointer transition-colors"
      >
        <Icon name="arrow-left" size={16} />
        Back to Residents
      </button>

      {/* Profile Header */}
      <Card className="p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          <Avatar name={resident.name} size="xl" />
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-start gap-3 justify-between">
              <div>
                <h1 className="text-2xl font-bold text-navy font-display">{resident.name}</h1>
                <div className="flex flex-wrap items-center gap-3 mt-1.5 text-sm text-slate">
                  <span className="font-mono text-xs bg-surface px-2 py-0.5 rounded border border-edge">{resident.residentId}</span>
                  <span>{resident.age} years old</span>
                  <span>{resident.gender}</span>
                  <span>Blood: {resident.bloodGroup}</span>
                  <StatusBadge status={resident.status} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            <Button variant="secondary" size="sm">
              <Icon name="edit" size={14} />
              Edit Profile
            </Button>
            <Button size="sm" onClick={() => setShowAddHealth(true)}>
              <Icon name="plus" size={14} />
              Health Record
            </Button>
            <Button variant="secondary" size="sm" onClick={() => setShowAddMed(true)}>
              <Icon name="pill" size={14} />
              Medication
            </Button>
            <Button variant="secondary" size="sm" onClick={() => setShowAddCheckup(true)}>
              <Icon name="calendar" size={14} />
              Check-up
            </Button>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex gap-1 bg-surface border border-edge rounded-xl p-1 mb-6 overflow-x-auto">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors cursor-pointer flex-1 sm:flex-none ${
              tab === t.id
                ? 'bg-canvas text-navy shadow-sm border border-edge'
                : 'text-slate hover:text-navy'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {tab === 'overview' && (
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-5">
            <SectionTitle>Basic Information</SectionTitle>
            <dl className="space-y-3 text-sm">
              {[
                { label: 'Date of Birth', value: formatDate(resident.dob) },
                { label: 'Blood Group', value: resident.bloodGroup },
                { label: 'Date of Admission', value: formatDate(resident.admissionDate) },
                { label: 'Status', value: <StatusBadge status={resident.status} /> },
                { label: 'Address', value: resident.address },
              ].map(item => (
                <div key={item.label} className="flex items-start justify-between gap-4">
                  <dt className="text-slate shrink-0 w-40">{item.label}</dt>
                  <dd className="text-navy text-right">{item.value}</dd>
                </div>
              ))}
            </dl>
          </Card>

          <Card className="p-5">
            <SectionTitle>Emergency Contact</SectionTitle>
            <dl className="space-y-3 text-sm">
              {[
                { label: 'Contact Name', value: resident.emergencyContact },
                { label: 'Phone Number', value: resident.emergencyPhone },
                { label: 'Relationship', value: resident.relationship },
              ].map(item => (
                <div key={item.label} className="flex items-start justify-between gap-4">
                  <dt className="text-slate shrink-0 w-40">{item.label}</dt>
                  <dd className="text-navy text-right">{item.value}</dd>
                </div>
              ))}
            </dl>
          </Card>

          <Card className="p-5 lg:col-span-2">
            <SectionTitle>Important Notes</SectionTitle>
            <p className="text-sm text-slate leading-relaxed">{resident.notes || 'No notes recorded.'}</p>
          </Card>

          <Card className="p-5">
            <SectionTitle>Latest Health Record</SectionTitle>
            {resRecords[0] ? (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-subtle">{formatDate(resRecords[0].date)}</span>
                  <RecordTypeBadge type={resRecords[0].type} />
                </div>
                <p className="text-sm text-slate leading-relaxed">{resRecords[0].description}</p>
                <p className="text-xs text-subtle mt-2">Recorded by {resRecords[0].recordedBy}</p>
              </div>
            ) : (
              <p className="text-sm text-subtle">No health records yet.</p>
            )}
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <SectionTitle>Current Medications</SectionTitle>
            </div>
            {resMeds.filter(m => m.status === 'Active').length === 0 ? (
              <p className="text-sm text-subtle">No active medications.</p>
            ) : (
              <div className="space-y-2">
                {resMeds.filter(m => m.status === 'Active').map(m => (
                  <div key={m.id} className="flex items-center justify-between py-2 border-b border-edge last:border-0">
                    <div>
                      <p className="text-sm font-medium text-navy">{m.medicine}</p>
                      <p className="text-xs text-slate">{m.dosage} · {m.frequency}</p>
                    </div>
                    <StatusBadge status={m.status} />
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card className="p-5">
            <SectionTitle>Upcoming Follow-up</SectionTitle>
            {resCheckups.filter(c => c.followUpStatus === 'Pending')[0] ? (() => {
              const c = resCheckups.filter(x => x.followUpStatus === 'Pending')[0]
              return (
                <div className="p-3 rounded-xl bg-warn-50 border border-warn-100">
                  <p className="text-sm font-medium text-navy">{c.type}</p>
                  <p className="text-xs text-warn mt-1 flex items-center gap-1">
                    <Icon name="calendar" size={12} /> {formatDate(c.date)}
                  </p>
                  <p className="text-xs text-slate mt-1">{c.provider}</p>
                </div>
              )
            })() : (
              <p className="text-sm text-subtle">No upcoming follow-ups.</p>
            )}
          </Card>
        </div>
      )}

      {tab === 'health-records' && (
        <Card className="p-5">
          <div className="flex items-center justify-between mb-5">
            <SectionTitle>Health Records</SectionTitle>
            <Button size="sm" onClick={() => setShowAddHealth(true)}>
              <Icon name="plus" size={14} />
              Add Record
            </Button>
          </div>
          {resRecords.length === 0 ? (
            <p className="text-sm text-subtle text-center py-8">No health records for this resident.</p>
          ) : (
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-edge" />
              <div className="space-y-6 pl-10">
                {resRecords.map(r => (
                  <div key={r.id} className="relative">
                    <div className="absolute -left-10 top-1 w-4 h-4 rounded-full bg-brand-50 border-2 border-brand flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand" />
                    </div>
                    <div className="p-4 rounded-xl border border-edge hover:border-brand/30 transition-colors">
                      <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
                        <RecordTypeBadge type={r.type} />
                        <span className="text-xs text-subtle">{formatDate(r.date)}</span>
                      </div>
                      <p className="text-sm text-navy leading-relaxed mb-2">{r.description}</p>
                      {r.notes && (
                        <p className="text-xs text-slate italic border-l-2 border-edge pl-3">{r.notes}</p>
                      )}
                      <div className="flex items-center justify-between mt-3">
                        <p className="text-xs text-subtle">Recorded by {r.recordedBy}</p>
                        {r.followUpRequired && r.followUpDate && (
                          <span className="text-xs text-warn bg-warn-50 px-2 py-0.5 rounded-full border border-warn-100">
                            Follow-up: {formatDate(r.followUpDate)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      )}

      {tab === 'medications' && (
        <Card className="p-5">
          <div className="flex items-center justify-between mb-5">
            <SectionTitle>Medications</SectionTitle>
            <Button size="sm" onClick={() => setShowAddMed(true)}>
              <Icon name="plus" size={14} />
              Add Medication
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-edge">
                  <th className="pb-3 pr-4 text-xs font-semibold text-subtle">Medicine</th>
                  <th className="pb-3 pr-4 text-xs font-semibold text-subtle">Dosage</th>
                  <th className="pb-3 pr-4 text-xs font-semibold text-subtle hidden sm:table-cell">Frequency</th>
                  <th className="pb-3 pr-4 text-xs font-semibold text-subtle hidden md:table-cell">Start Date</th>
                  <th className="pb-3 pr-4 text-xs font-semibold text-subtle hidden md:table-cell">End Date</th>
                  <th className="pb-3 text-xs font-semibold text-subtle">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-edge">
                {resMeds.map(m => (
                  <tr key={m.id} className="hover:bg-surface transition-colors">
                    <td className="py-3 pr-4 font-medium text-navy">{m.medicine}</td>
                    <td className="py-3 pr-4 text-slate">{m.dosage}</td>
                    <td className="py-3 pr-4 text-slate hidden sm:table-cell">{m.frequency} · {m.timing}</td>
                    <td className="py-3 pr-4 text-slate hidden md:table-cell">{formatDate(m.startDate)}</td>
                    <td className="py-3 pr-4 text-slate hidden md:table-cell">{m.endDate === 'Ongoing' ? <Badge variant="ok">Ongoing</Badge> : formatDate(m.endDate)}</td>
                    <td className="py-3"><StatusBadge status={m.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {resMeds[0] && (
            <div className="mt-5 p-4 rounded-xl bg-brand-50 border border-brand-100">
              <p className="text-xs font-semibold text-brand mb-1.5 flex items-center gap-1">
                <Icon name="info" size={12} />
                Instructions — {resMeds[0].medicine}
              </p>
              <p className="text-xs text-navy">{resMeds[0].instructions}</p>
            </div>
          )}
        </Card>
      )}

      {tab === 'checkups' && (
        <Card className="p-5">
          <div className="flex items-center justify-between mb-5">
            <SectionTitle>Check-ups &amp; Follow-ups</SectionTitle>
            <Button size="sm" onClick={() => setShowAddCheckup(true)}>
              <Icon name="plus" size={14} />
              Add Check-up
            </Button>
          </div>
          <div className="space-y-4">
            {resCheckups.map(c => (
              <div key={c.id} className={`p-4 rounded-xl border ${c.followUpStatus === 'Pending' ? 'border-warn-100 bg-warn-50' : 'border-edge'}`}>
                <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
                  <div>
                    <p className="font-semibold text-sm text-navy">{c.type}</p>
                    <p className="text-xs text-slate mt-0.5">{c.provider}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={c.followUpStatus} />
                    <span className="text-xs text-subtle">{formatDate(c.date)}</span>
                  </div>
                </div>
                <p className="text-sm text-slate leading-relaxed">{c.observations}</p>
                {c.notes && <p className="text-xs text-subtle mt-2 italic">{c.notes}</p>}
                {c.followUpDate && (
                  <p className="text-xs text-warn mt-2 flex items-center gap-1">
                    <Icon name="clock" size={12} /> Next follow-up: {formatDate(c.followUpDate)}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {tab === 'care-notes' && (
        <Card className="p-5">
          <div className="flex items-center justify-between mb-5">
            <SectionTitle>Care Notes</SectionTitle>
            <Button size="sm" onClick={() => setShowAddNote(true)}>
              <Icon name="plus" size={14} />
              Add Note
            </Button>
          </div>
          <div className="space-y-4">
            {resNotes.map(n => (
              <div key={n.id} className="p-4 rounded-xl border border-edge hover:border-brand/30 transition-colors">
                <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
                  <div className="flex items-center gap-2">
                    <CategoryBadge category={n.category} />
                    <PriorityBadge priority={n.priority} />
                  </div>
                  <span className="text-xs text-subtle">{formatDate(n.date)}</span>
                </div>
                <p className="text-sm text-navy leading-relaxed">{n.note}</p>
                <p className="text-xs text-subtle mt-2">Added by {n.addedBy}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Add Health Record Modal */}
      {showAddHealth && (
        <AddHealthRecordModal residentName={resident.name} onClose={() => setShowAddHealth(false)} />
      )}

      {/* Add Medication Modal */}
      {showAddMed && (
        <AddMedicationModal residentName={resident.name} onClose={() => setShowAddMed(false)} />
      )}

      {/* Add Checkup Modal */}
      {showAddCheckup && (
        <AddCheckupModal residentName={resident.name} onClose={() => setShowAddCheckup(false)} />
      )}

      {/* Add Care Note Modal */}
      {showAddNote && (
        <AddCareNoteModal residentName={resident.name} onClose={() => setShowAddNote(false)} />
      )}
    </div>
  )
}

function AddHealthRecordModal({ residentName, onClose }: { residentName: string; onClose: () => void }) {
  return (
    <Modal title={`Add Health Record — ${residentName}`} onClose={onClose}>
      <div className="space-y-4">
        <Input label="Date" type="date" defaultValue="2026-07-24" />
        <Select label="Record Type" required>
          <option>Routine Check-up</option>
          <option>Health Observation</option>
          <option>Medical Visit</option>
          <option>Emergency Record</option>
          <option>Other</option>
        </Select>
        <Textarea label="Health Observation" required rows={3} placeholder="Describe the health observation or check-up findings…" />
        <Textarea label="Additional Notes" rows={2} placeholder="Any additional notes or instructions…" />
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-navy cursor-pointer">
            <input type="checkbox" className="w-4 h-4" />
            Follow-up required
          </label>
        </div>
        <Input label="Follow-up Date (if applicable)" type="date" />
        <div className="flex gap-3 justify-end pt-2">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={onClose}>Save Record</Button>
        </div>
      </div>
    </Modal>
  )
}

function AddMedicationModal({ residentName, onClose }: { residentName: string; onClose: () => void }) {
  return (
    <Modal title={`Add Medication — ${residentName}`} onClose={onClose}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Input label="Medicine Name" required placeholder="e.g. Amlodipine" className="col-span-2" />
          <Input label="Dosage" required placeholder="e.g. 5 mg" />
          <Select label="Frequency" required>
            <option>Once daily</option>
            <option>Twice daily</option>
            <option>Three times daily</option>
            <option>As required</option>
          </Select>
          <Input label="Timing" placeholder="e.g. Morning" />
          <Input label="Start Date" type="date" defaultValue="2026-07-24" />
        </div>
        <Textarea label="Instructions" rows={2} placeholder="Special instructions for administration…" />
        <div className="flex gap-3 justify-end pt-2">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={onClose}>Save Medication</Button>
        </div>
      </div>
    </Modal>
  )
}

function AddCheckupModal({ residentName, onClose }: { residentName: string; onClose: () => void }) {
  return (
    <Modal title={`Add Check-up — ${residentName}`} onClose={onClose}>
      <div className="space-y-4">
        <Input label="Check-up Date" type="date" defaultValue="2026-07-24" />
        <Input label="Check-up Type" required placeholder="e.g. General Health Check" />
        <Input label="Doctor / Healthcare Provider" placeholder="e.g. Dr. M. Patel" />
        <Textarea label="Observations" rows={3} placeholder="Record the check-up observations…" />
        <Input label="Follow-up Date (if required)" type="date" />
        <Textarea label="Notes" rows={2} placeholder="Any additional notes…" />
        <div className="flex gap-3 justify-end pt-2">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={onClose}>Save Check-up</Button>
        </div>
      </div>
    </Modal>
  )
}

function AddCareNoteModal({ residentName, onClose }: { residentName: string; onClose: () => void }) {
  return (
    <Modal title={`Add Care Note — ${residentName}`} onClose={onClose}>
      <div className="space-y-4">
        <Input label="Date" type="date" defaultValue="2026-07-24" />
        <div className="grid grid-cols-2 gap-3">
          <Select label="Category" required>
            <option>Daily Care</option>
            <option>Health</option>
            <option>Medication</option>
            <option>Follow-up</option>
            <option>General</option>
          </Select>
          <Select label="Priority" required>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </Select>
        </div>
        <Textarea label="Note" required rows={4} placeholder="Enter care note details…" />
        <div className="flex gap-3 justify-end pt-2">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={onClose}>Save Note</Button>
        </div>
      </div>
    </Modal>
  )
}
