import { useState } from 'react'
import { Icon, Card, Button, Input, Select, Textarea } from '@/components/ui'
import type { NavFn } from '@/types'

interface FormData {
  fullName: string
  residentId: string
  dob: string
  age: string
  gender: string
  bloodGroup: string
  admissionDate: string
  emergencyContact: string
  emergencyPhone: string
  relationship: string
  address: string
  notes: string
}

const initial: FormData = {
  fullName: '', residentId: '', dob: '', age: '', gender: '',
  bloodGroup: '', admissionDate: '', emergencyContact: '',
  emergencyPhone: '', relationship: '', address: '', notes: '',
}

export default function AddResidentPage({ navigate }: { navigate: NavFn }) {
  const [form, setForm] = useState<FormData>(initial)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [submitted, setSubmitted] = useState(false)

  const set = (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [key]: e.target.value }))
    if (errors[key]) setErrors(e2 => ({ ...e2, [key]: '' }))
  }

  const validate = (): boolean => {
    const e: Partial<FormData> = {}
    if (!form.fullName.trim()) e.fullName = 'Full name is required.'
    if (!form.residentId.trim()) e.residentId = 'Resident ID is required.'
    if (!form.dob) e.dob = 'Date of birth is required.'
    if (!form.gender) e.gender = 'Please select a gender.'
    if (!form.admissionDate) e.admissionDate = 'Admission date is required.'
    if (!form.emergencyContact.trim()) e.emergencyContact = 'Emergency contact name is required.'
    if (!form.emergencyPhone.trim()) e.emergencyPhone = 'Emergency phone number is required.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitted(true)
    setTimeout(() => navigate('residents'), 1500)
  }

  if (submitted) {
    return (
      <div className="p-6 lg:p-8 max-w-2xl mx-auto flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-ok-50 flex items-center justify-center mx-auto mb-4">
            <Icon name="check-circle" size={32} className="text-ok" />
          </div>
          <h2 className="text-xl font-bold text-navy font-display">Resident Added Successfully</h2>
          <p className="text-slate mt-2">Redirecting to the residents list…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate('residents')}
          className="p-2 rounded-lg hover:bg-edge text-slate hover:text-navy transition-colors cursor-pointer"
        >
          <Icon name="arrow-left" size={18} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-navy font-display">Add New Resident</h1>
          <p className="text-slate text-sm mt-0.5">Fill in the details below to create a new resident profile.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card className="p-6">
          <h2 className="text-base font-semibold text-navy font-display mb-5 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand text-white text-xs flex items-center justify-center font-bold">1</span>
            Basic Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              id="fullName"
              required
              placeholder="e.g. Margaret Chen"
              value={form.fullName}
              onChange={set('fullName')}
              error={errors.fullName}
              className="sm:col-span-2"
            />
            <Input
              label="Resident ID"
              id="residentId"
              required
              placeholder="e.g. R-009"
              value={form.residentId}
              onChange={set('residentId')}
              error={errors.residentId}
            />
            <Input
              label="Date of Birth"
              id="dob"
              type="date"
              required
              value={form.dob}
              onChange={set('dob')}
              error={errors.dob}
            />
            <Input
              label="Age"
              id="age"
              type="number"
              placeholder="Auto-calculated or enter manually"
              value={form.age}
              onChange={set('age')}
              min={0}
              max={130}
            />
            <Select
              label="Gender"
              id="gender"
              required
              value={form.gender}
              onChange={set('gender')}
            >
              <option value="">Select gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
            </Select>
            <Select
              label="Blood Group"
              id="bloodGroup"
              value={form.bloodGroup}
              onChange={set('bloodGroup')}
            >
              <option value="">Select blood group</option>
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </Select>
            <Input
              label="Date of Admission"
              id="admissionDate"
              type="date"
              required
              value={form.admissionDate}
              onChange={set('admissionDate')}
              error={errors.admissionDate}
            />
          </div>
        </Card>

        {/* Emergency Contact */}
        <Card className="p-6">
          <h2 className="text-base font-semibold text-navy font-display mb-5 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand text-white text-xs flex items-center justify-center font-bold">2</span>
            Contact & Emergency Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Emergency Contact Name"
              id="emergencyContact"
              required
              placeholder="e.g. David Chen"
              value={form.emergencyContact}
              onChange={set('emergencyContact')}
              error={errors.emergencyContact}
            />
            <Input
              label="Emergency Contact Number"
              id="emergencyPhone"
              type="tel"
              required
              placeholder="e.g. 555-0101"
              value={form.emergencyPhone}
              onChange={set('emergencyPhone')}
              error={errors.emergencyPhone}
            />
            <Select
              label="Relationship to Resident"
              id="relationship"
              value={form.relationship}
              onChange={set('relationship')}
            >
              <option value="">Select relationship</option>
              {['Son', 'Daughter', 'Spouse', 'Sibling', 'Parent', 'Friend', 'Other'].map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </Select>
          </div>
        </Card>

        {/* Additional Information */}
        <Card className="p-6">
          <h2 className="text-base font-semibold text-navy font-display mb-5 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand text-white text-xs flex items-center justify-center font-bold">3</span>
            Additional Information
          </h2>
          <div className="space-y-4">
            <Textarea
              label="Address"
              id="address"
              placeholder="Resident's home address"
              value={form.address}
              onChange={set('address')}
              rows={2}
            />
            <Textarea
              label="Important Notes"
              id="notes"
              placeholder="Any relevant medical history, allergies, special care needs, or other important notes…"
              value={form.notes}
              onChange={set('notes')}
              rows={4}
            />
          </div>
        </Card>

        {/* Privacy notice */}
        <div className="flex items-start gap-2 px-4 py-3 rounded-lg bg-brand-50 border border-brand-100 text-brand text-xs">
          <Icon name="shield" size={14} className="shrink-0 mt-0.5" />
          <p>This information is confidential and must only be accessed by authorised caregiving staff. Handle all resident data in accordance with your organisation's data protection policy.</p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 justify-end">
          <Button variant="secondary" onClick={() => navigate('residents')}>
            Cancel
          </Button>
          <Button type="submit">
            <Icon name="check" size={16} />
            Save Resident
          </Button>
        </div>
      </form>
    </div>
  )
}
