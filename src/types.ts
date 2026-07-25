export type Page =
  | 'dashboard'
  | 'residents'
  | 'add-resident'
  | 'resident-profile'
  | 'health-records'
  | 'medications'
  | 'checkups'
  | 'care-notes'
  | 'reports'
  | 'settings'

export type NavFn = (page: Page, residentId?: string) => void
