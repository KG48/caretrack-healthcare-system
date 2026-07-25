export type Gender = 'Female' | 'Male'
export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
export type ResidentStatus = 'Active' | 'Inactive'
export type MedStatus = 'Active' | 'Completed' | 'Discontinued'
export type RecordType = 'Routine Check-up' | 'Health Observation' | 'Medical Visit' | 'Emergency Record' | 'Other'
export type FollowUpStatus = 'Pending' | 'Completed' | 'Overdue'
export type NoteCategory = 'Daily Care' | 'Health' | 'Medication' | 'Follow-up' | 'General'
export type NotePriority = 'Low' | 'Medium' | 'High'

export interface Resident {
  id: string
  residentId: string
  name: string
  age: number
  gender: Gender
  dob: string
  bloodGroup: BloodGroup
  admissionDate: string
  status: ResidentStatus
  emergencyContact: string
  emergencyPhone: string
  relationship: string
  address: string
  notes: string
  lastUpdate: string
}

export interface HealthRecord {
  id: string
  residentId: string
  date: string
  type: RecordType
  description: string
  recordedBy: string
  notes: string
  followUpRequired: boolean
  followUpDate?: string
}

export interface Medication {
  id: string
  residentId: string
  medicine: string
  dosage: string
  frequency: string
  timing: string
  startDate: string
  endDate: string
  instructions: string
  status: MedStatus
}

export interface Checkup {
  id: string
  residentId: string
  date: string
  type: string
  provider: string
  observations: string
  followUpDate?: string
  notes: string
  followUpStatus: FollowUpStatus
}

export interface CareNote {
  id: string
  residentId: string
  date: string
  category: NoteCategory
  note: string
  priority: NotePriority
  addedBy: string
}

export const residents: Resident[] = [
  {
    id: '1', residentId: 'R-001', name: 'Margaret Chen', age: 74, gender: 'Female',
    dob: '1952-03-15', bloodGroup: 'A+', admissionDate: '2021-06-10', status: 'Active',
    emergencyContact: 'David Chen', emergencyPhone: '555-0101', relationship: 'Son',
    address: '14 Maple Lane, Greenfield', notes: 'Mild hypertension and type 2 diabetes. Prefers morning activities. Sensitive to noise.',
    lastUpdate: '2026-07-18',
  },
  {
    id: '2', residentId: 'R-002', name: 'Robert Adeyemi', age: 69, gender: 'Male',
    dob: '1956-08-22', bloodGroup: 'O+', admissionDate: '2022-01-15', status: 'Active',
    emergencyContact: 'Adaeze Adeyemi', emergencyPhone: '555-0102', relationship: 'Spouse',
    address: '7 Birchwood Close, Riverdale', notes: 'Elevated blood pressure. Enjoys chess and reading. Independent with most ADLs.',
    lastUpdate: '2026-07-20',
  },
  {
    id: '3', residentId: 'R-003', name: 'Eleanor Vasquez', age: 82, gender: 'Female',
    dob: '1943-11-07', bloodGroup: 'B+', admissionDate: '2020-04-20', status: 'Active',
    emergencyContact: 'Carlos Vasquez', emergencyPhone: '555-0103', relationship: 'Son',
    address: '3 Rosewood Avenue, Lakeside', notes: 'Atrial fibrillation and early-stage dementia. Requires INR monitoring for Warfarin.',
    lastUpdate: '2026-07-15',
  },
  {
    id: '4', residentId: 'R-004', name: 'Thomas Brennan', age: 77, gender: 'Male',
    dob: '1949-05-30', bloodGroup: 'AB+', admissionDate: '2021-09-05', status: 'Active',
    emergencyContact: 'Mary Brennan', emergencyPhone: '555-0104', relationship: 'Spouse',
    address: '22 Oak Street, Westbury', notes: 'Heart condition managed with Metoprolol. Previous gastric issues. Good mobility.',
    lastUpdate: '2026-07-22',
  },
  {
    id: '5', residentId: 'R-005', name: 'Priya Sharma', age: 66, gender: 'Female',
    dob: '1959-02-18', bloodGroup: 'B+', admissionDate: '2023-03-12', status: 'Active',
    emergencyContact: 'Arjun Sharma', emergencyPhone: '555-0105', relationship: 'Husband',
    address: '9 Sunflower Drive, Eastport', notes: 'Hypothyroidism managed with Levothyroxine. Very sociable and participates in group activities.',
    lastUpdate: '2026-07-19',
  },
  {
    id: '6', residentId: 'R-006', name: 'George Williams', age: 81, gender: 'Male',
    dob: '1944-09-04', bloodGroup: 'O-', admissionDate: '2019-11-28', status: 'Active',
    emergencyContact: 'Patricia Williams', emergencyPhone: '555-0106', relationship: 'Daughter',
    address: '5 Elm Court, Northvale', notes: 'Congestive heart failure. Fluid intake monitored daily. Requires assistance with mobility.',
    lastUpdate: '2026-07-10',
  },
  {
    id: '7', residentId: 'R-007', name: 'Agnes Kowalski', age: 85, gender: 'Female',
    dob: '1940-07-14', bloodGroup: 'A-', admissionDate: '2018-08-01', status: 'Active',
    emergencyContact: 'Jan Kowalski', emergencyPhone: '555-0107', relationship: 'Son',
    address: '11 Cedar Path, Millbrook', notes: 'Multiple medications. Mild depression managed with Sertraline. Enjoys knitting and music.',
    lastUpdate: '2026-07-23',
  },
  {
    id: '8', residentId: 'R-008', name: 'Samuel Okafor', age: 72, gender: 'Male',
    dob: '1953-12-03', bloodGroup: 'O+', admissionDate: '2022-07-19', status: 'Inactive',
    emergencyContact: 'Grace Okafor', emergencyPhone: '555-0108', relationship: 'Spouse',
    address: '30 Willow Way, Centerfield', notes: 'Temporarily residing with family. Type 2 diabetes. Expected to return September 2026.',
    lastUpdate: '2026-06-30',
  },
]

export const healthRecords: HealthRecord[] = [
  { id: 'hr1', residentId: '1', date: '2026-07-18', type: 'Routine Check-up', description: 'Vital signs stable. Blood pressure 128/82 mmHg — within acceptable range. No new concerns noted. Weight unchanged.', recordedBy: 'Dr. M. Patel', notes: 'Continue current medication. Next check in 4 weeks.', followUpRequired: true, followUpDate: '2026-08-05' },
  { id: 'hr2', residentId: '1', date: '2026-06-05', type: 'Health Observation', description: 'Mild fatigue reported by resident. Appetite slightly reduced over past 3 days. Hydration assessed as adequate.', recordedBy: 'Nurse K. Rodriguez', notes: 'Monitored for 48 hours. Symptoms resolved without intervention.', followUpRequired: false },
  { id: 'hr3', residentId: '1', date: '2026-04-12', type: 'Emergency Record', description: 'Resident experienced a brief dizzy spell at approximately 09:30. ECG performed — no abnormalities found. Recovered fully within 2 hours.', recordedBy: 'Dr. M. Patel', notes: 'Family notified. Increased monitoring for 48 hours. Blood pressure medication reviewed.', followUpRequired: true, followUpDate: '2026-04-26' },
  { id: 'hr4', residentId: '2', date: '2026-07-20', type: 'Routine Check-up', description: 'Blood pressure elevated at 148/92 mmHg. Discussed with Dr. Patel. No other complaints. Appetite good.', recordedBy: 'Dr. M. Patel', notes: 'Medication dosage under review. Follow-up in 2 weeks.', followUpRequired: true, followUpDate: '2026-08-12' },
  { id: 'hr5', residentId: '2', date: '2026-05-14', type: 'Medical Visit', description: 'External physician visit. Lipid panel reviewed. Total cholesterol 4.8 mmol/L — within target range. Liver function normal.', recordedBy: 'Dr. J. Okonkwo', notes: 'Continue Atorvastatin at current dose.', followUpRequired: false },
  { id: 'hr6', residentId: '3', date: '2026-07-15', type: 'Health Observation', description: 'Increased confusion episodes noted in the morning. Resident was disoriented for approximately 20 minutes. Resolved with reassurance.', recordedBy: 'Nurse T. Kim', notes: 'Physician and family informed. Monitoring frequency increased to twice daily.', followUpRequired: true, followUpDate: '2026-08-20' },
  { id: 'hr7', residentId: '3', date: '2026-06-22', type: 'Routine Check-up', description: 'Weight stable at 58 kg. No signs of physical distress. INR checked: 2.4 (within therapeutic range 2.0–3.0).', recordedBy: 'Dr. M. Patel', notes: 'Maintain current Warfarin dose. Review in 4 weeks.', followUpRequired: false },
  { id: 'hr8', residentId: '4', date: '2026-07-22', type: 'Routine Check-up', description: 'Heart rate regular at 72 bpm. No chest pain or shortness of breath reported. Mild ankle oedema present, unchanged.', recordedBy: 'Dr. M. Patel', notes: 'Routine monitoring continued. Fluid intake logged daily.', followUpRequired: false },
  { id: 'hr9', residentId: '4', date: '2026-06-10', type: 'Health Observation', description: 'Mild gastric discomfort reported. Omeprazole discontinued per physician instruction. Diet modification discussed.', recordedBy: 'Nurse K. Rodriguez', notes: 'Recommend soft diet for 1 week. Monitor for recurrence.', followUpRequired: false },
  { id: 'hr10', residentId: '5', date: '2026-07-19', type: 'Routine Check-up', description: 'Thyroid function reviewed. TSH level: 2.1 mIU/L (normal). Energy levels reported as improved. No complaints.', recordedBy: 'Dr. M. Patel', notes: 'Continue Levothyroxine 50mcg. 3-month review scheduled.', followUpRequired: true, followUpDate: '2026-10-19' },
  { id: 'hr11', residentId: '5', date: '2026-06-15', type: 'Health Observation', description: 'Seasonal allergy symptoms. Mild nasal congestion and watery eyes. No fever. Vitals normal.', recordedBy: 'Nurse T. Kim', notes: 'Short-term antihistamine prescribed. Symptoms resolved after 5 days.', followUpRequired: false },
  { id: 'hr12', residentId: '6', date: '2026-07-10', type: 'Health Observation', description: 'Lower limb swelling noted — bilateral pitting oedema grade 1. Diuretic therapy discussed with attending physician.', recordedBy: 'Nurse T. Kim', notes: 'Fluid intake restricted to 1.5L/day. Legs elevated when resting.', followUpRequired: true, followUpDate: '2026-07-24' },
  { id: 'hr13', residentId: '6', date: '2026-05-30', type: 'Medical Visit', description: 'Cardiology follow-up. Echocardiogram stable compared to last year. Ejection fraction 45%. No significant deterioration.', recordedBy: 'Dr. A. Singh (Cardiologist)', notes: 'Continue current treatment plan. Annual echocardiogram.', followUpRequired: false },
  { id: 'hr14', residentId: '7', date: '2026-07-23', type: 'Routine Check-up', description: 'Overall health stable. Full mood assessment completed — resident is responsive, cooperative, and in good spirits today.', recordedBy: 'Nurse K. Rodriguez', notes: 'Continue care plan. Family visit scheduled for weekend.', followUpRequired: false },
  { id: 'hr15', residentId: '7', date: '2026-07-01', type: 'Health Observation', description: 'Reported mild pain in right knee when walking. Gait slightly altered. No swelling or redness observed.', recordedBy: 'Dr. M. Patel', notes: 'Referred to physiotherapist. Physiotherapy session scheduled for July 8.', followUpRequired: true, followUpDate: '2026-09-01' },
  { id: 'hr16', residentId: '8', date: '2026-06-30', type: 'Other', description: 'Resident requested temporary leave of care to stay with family. Health status stable at time of departure. All records transferred.', recordedBy: 'Dr. M. Patel', notes: 'Status changed to Inactive. Expected return: September 2026. Family contact confirmed.', followUpRequired: false },
]

export const medications: Medication[] = [
  { id: 'm1', residentId: '1', medicine: 'Amlodipine', dosage: '5 mg', frequency: 'Once daily', timing: 'Morning', startDate: '2021-06-12', endDate: 'Ongoing', instructions: 'Take with or without food. Report any ankle swelling.', status: 'Active' },
  { id: 'm2', residentId: '1', medicine: 'Metformin', dosage: '500 mg', frequency: 'Twice daily', timing: 'Morning & Evening', startDate: '2022-03-01', endDate: 'Ongoing', instructions: 'Take with meals to reduce stomach upset.', status: 'Active' },
  { id: 'm3', residentId: '2', medicine: 'Lisinopril', dosage: '10 mg', frequency: 'Once daily', timing: 'Morning', startDate: '2022-01-20', endDate: 'Ongoing', instructions: 'Monitor blood pressure weekly. Report persistent cough.', status: 'Active' },
  { id: 'm4', residentId: '2', medicine: 'Atorvastatin', dosage: '20 mg', frequency: 'Once daily', timing: 'Evening', startDate: '2022-01-20', endDate: 'Ongoing', instructions: 'Avoid grapefruit juice. Report muscle aches.', status: 'Active' },
  { id: 'm5', residentId: '3', medicine: 'Warfarin', dosage: '2.5 mg', frequency: 'Once daily', timing: 'Evening', startDate: '2020-04-25', endDate: 'Ongoing', instructions: 'Regular INR monitoring required. Avoid inconsistent dietary vitamin K.', status: 'Active' },
  { id: 'm6', residentId: '3', medicine: 'Donepezil', dosage: '5 mg', frequency: 'Once daily', timing: 'Bedtime', startDate: '2021-09-10', endDate: 'Ongoing', instructions: 'May cause vivid dreams. Report significant side effects.', status: 'Active' },
  { id: 'm7', residentId: '3', medicine: 'Calcium Carbonate', dosage: '500 mg', frequency: 'Twice daily', timing: 'Morning & Noon', startDate: '2021-09-10', endDate: '2026-03-10', instructions: 'Take with food for best absorption.', status: 'Completed' },
  { id: 'm8', residentId: '4', medicine: 'Metoprolol', dosage: '25 mg', frequency: 'Twice daily', timing: 'Morning & Evening', startDate: '2021-09-10', endDate: 'Ongoing', instructions: 'Do not stop abruptly. Monitor heart rate.', status: 'Active' },
  { id: 'm9', residentId: '4', medicine: 'Omeprazole', dosage: '20 mg', frequency: 'Once daily', timing: 'Morning', startDate: '2022-05-01', endDate: '2026-06-10', instructions: 'Discontinued per physician advice on 10 June 2026.', status: 'Discontinued' },
  { id: 'm10', residentId: '5', medicine: 'Levothyroxine', dosage: '50 mcg', frequency: 'Once daily', timing: 'Morning (fasting)', startDate: '2023-03-15', endDate: 'Ongoing', instructions: 'Take 30 minutes before breakfast. Do not take with iron or calcium supplements.', status: 'Active' },
  { id: 'm11', residentId: '5', medicine: 'Vitamin D3', dosage: '1000 IU', frequency: 'Once daily', timing: 'With lunch', startDate: '2023-03-15', endDate: 'Ongoing', instructions: 'Take with a fatty meal for best absorption.', status: 'Active' },
  { id: 'm12', residentId: '6', medicine: 'Furosemide', dosage: '40 mg', frequency: 'Once daily', timing: 'Morning', startDate: '2019-12-01', endDate: 'Ongoing', instructions: 'Monitor potassium levels. Ensure adequate fluid intake (not excess).', status: 'Active' },
  { id: 'm13', residentId: '6', medicine: 'Spironolactone', dosage: '25 mg', frequency: 'Once daily', timing: 'Morning', startDate: '2020-06-10', endDate: 'Ongoing', instructions: 'Monitor potassium. Avoid high-potassium foods.', status: 'Active' },
  { id: 'm14', residentId: '7', medicine: 'Aspirin', dosage: '75 mg', frequency: 'Once daily', timing: 'Morning', startDate: '2018-08-05', endDate: 'Ongoing', instructions: 'Take with food. Monitor for signs of bleeding.', status: 'Active' },
  { id: 'm15', residentId: '7', medicine: 'Donepezil', dosage: '10 mg', frequency: 'Once daily', timing: 'Bedtime', startDate: '2020-01-15', endDate: 'Ongoing', instructions: 'Annual review required.', status: 'Active' },
  { id: 'm16', residentId: '7', medicine: 'Sertraline', dosage: '50 mg', frequency: 'Once daily', timing: 'Morning', startDate: '2021-04-20', endDate: 'Ongoing', instructions: 'Monitor mood and behaviour. Do not discontinue abruptly.', status: 'Active' },
]

export const checkups: Checkup[] = [
  { id: 'c1', residentId: '1', date: '2026-08-05', type: 'Cardiology Review', provider: 'Dr. A. Singh', observations: 'Scheduled — review blood pressure medications and cardiac function.', followUpDate: undefined, notes: 'Transport arranged. Family informed.', followUpStatus: 'Pending' },
  { id: 'c2', residentId: '2', date: '2026-08-12', type: 'Blood Pressure Monitoring', provider: 'Dr. M. Patel', observations: 'Scheduled — two-week follow-up after blood pressure elevation on 20 July.', followUpDate: undefined, notes: 'Medication adjustment possible.', followUpStatus: 'Pending' },
  { id: 'c3', residentId: '3', date: '2026-08-20', type: 'Neurology Follow-up', provider: 'Dr. L. Nakamura', observations: 'Scheduled — routine cognitive assessment and medication review.', followUpDate: undefined, notes: 'Family member requested to attend.', followUpStatus: 'Pending' },
  { id: 'c4', residentId: '5', date: '2026-08-03', type: 'Thyroid Function Check', provider: 'Dr. M. Patel', observations: 'Scheduled — 3-month thyroid panel following medication start.', followUpDate: undefined, notes: 'Fasting blood test. No food after midnight.', followUpStatus: 'Pending' },
  { id: 'c5', residentId: '7', date: '2026-09-01', type: 'Physiotherapy Review', provider: 'Physiotherapist B. Lee', observations: 'Scheduled — review progress of right knee exercise programme.', followUpDate: undefined, notes: 'Resident has been compliant with home exercises.', followUpStatus: 'Pending' },
  { id: 'c6', residentId: '1', date: '2026-05-15', type: 'General Health Check', provider: 'Dr. M. Patel', observations: 'All vitals within normal range. Weight stable. No new concerns raised by resident.', followUpDate: '2026-08-05', notes: 'Routine 3-month check completed.', followUpStatus: 'Completed' },
  { id: 'c7', residentId: '2', date: '2026-04-20', type: 'Lipid Panel Review', provider: 'Dr. J. Okonkwo', observations: 'Cholesterol within target range. Liver function normal. Continue current medications.', followUpDate: undefined, notes: 'Next review in 6 months.', followUpStatus: 'Completed' },
  { id: 'c8', residentId: '3', date: '2026-06-22', type: 'Anticoagulation Clinic', provider: 'Dr. M. Patel', observations: 'INR 2.4, within therapeutic range (2.0–3.0). Warfarin dose unchanged.', followUpDate: '2026-08-20', notes: 'Next INR check in 8 weeks.', followUpStatus: 'Completed' },
  { id: 'c9', residentId: '6', date: '2026-05-30', type: 'Cardiology Follow-up', provider: 'Dr. A. Singh', observations: 'Echocardiogram stable. Ejection fraction 45%. No significant change from prior year.', followUpDate: undefined, notes: 'Annual echocardiogram booked for May 2027.', followUpStatus: 'Completed' },
  { id: 'c10', residentId: '4', date: '2026-07-01', type: 'Gastrointestinal Review', provider: 'Dr. M. Patel', observations: 'Gastric symptoms resolved. Omeprazole safely discontinued. Dietary adherence reviewed.', followUpDate: undefined, notes: 'No further GI follow-up required unless symptoms recur.', followUpStatus: 'Completed' },
]

export const careNotes: CareNote[] = [
  { id: 'n1', residentId: '1', date: '2026-07-23', category: 'Daily Care', note: 'Margaret had a good day. Participated in the afternoon music session and socialised well with other residents. Ate all three meals without prompting.', priority: 'Low', addedBy: 'Caregiver N. Santos' },
  { id: 'n2', residentId: '1', date: '2026-07-20', category: 'Medication', note: 'Margaret initially reluctant to take morning Metformin, citing stomach discomfort. Reminded her to take with food. Complied after gentle encouragement.', priority: 'Medium', addedBy: 'Caregiver N. Santos' },
  { id: 'n3', residentId: '1', date: '2026-07-10', category: 'Follow-up', note: 'Confirmed cardiology appointment for 5 August 2026. Family notified by telephone. Transport booked through care coordinator.', priority: 'Medium', addedBy: 'Caregiver N. Santos' },
  { id: 'n4', residentId: '2', date: '2026-07-22', category: 'Medication', note: 'Robert took all scheduled medications without issue. Reported a mild headache in the afternoon. Monitored for 2 hours — resolved without intervention.', priority: 'Medium', addedBy: 'Caregiver P. Johnson' },
  { id: 'n5', residentId: '2', date: '2026-07-18', category: 'General', note: 'Robert participated in the group gardening session this morning. Appeared cheerful and engaged. Worked on the herb bed for 45 minutes.', priority: 'Low', addedBy: 'Caregiver P. Johnson' },
  { id: 'n6', residentId: '3', date: '2026-07-23', category: 'Health', note: 'Eleanor experienced increased confusion this morning — disoriented for approximately 30 minutes. Reassured and settled. Physician notified and family called.', priority: 'High', addedBy: 'Caregiver N. Santos' },
  { id: 'n7', residentId: '3', date: '2026-07-15', category: 'Daily Care', note: 'Eleanor was calm and cooperative throughout the day. Enjoyed the music therapy session and hummed along to familiar tunes. Good appetite at lunch.', priority: 'Low', addedBy: 'Caregiver N. Santos' },
  { id: 'n8', residentId: '4', date: '2026-07-22', category: 'Daily Care', note: 'Thomas was in excellent spirits today. Completed a 20-minute walk in the garden with minimal assistance. Reported no pain or discomfort.', priority: 'Low', addedBy: 'Caregiver P. Johnson' },
  { id: 'n9', residentId: '5', date: '2026-07-19', category: 'Follow-up', note: 'Priya reminded of the upcoming thyroid function check on 3 August. Transport confirmed. Instructions given — fasting required from midnight before the appointment.', priority: 'Medium', addedBy: 'Caregiver N. Santos' },
  { id: 'n10', residentId: '6', date: '2026-07-21', category: 'Health', note: 'Noticed slight swelling in George\'s left ankle. Elevated leg as per physician protocol. Fluid intake monitored and documented. Will review tomorrow morning.', priority: 'High', addedBy: 'Caregiver P. Johnson' },
  { id: 'n11', residentId: '7', date: '2026-07-23', category: 'Medication', note: 'Agnes took all three morning medications without difficulty. Mood assessment: calm, positive, and engaged. Assisted with morning hygiene routine.', priority: 'Low', addedBy: 'Caregiver N. Santos' },
  { id: 'n12', residentId: '7', date: '2026-07-16', category: 'General', note: 'Agnes celebrated her 85th birthday today! Family visited in the afternoon. Other residents and staff joined the small celebration. Agnes was visibly delighted.', priority: 'Low', addedBy: 'Caregiver P. Johnson' },
]
