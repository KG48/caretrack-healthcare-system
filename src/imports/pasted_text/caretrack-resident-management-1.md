Design a professional, simple, and user-friendly web-based Resident Record and Health-Care Management System for a small social welfare organization that provides care and support to approximately 5–10 residents.

The system is intended for authorized staff or caregivers to manage resident information and health-care-related records digitally. The goal is to reduce dependence on physical paperwork, organize resident information, and make important records easier to access when required.

IMPORTANT:
- This is NOT a hospital management system.
- Do NOT include unnecessary hospital features such as billing, laboratory management, insurance, appointments with multiple departments, or complex hospital administration.
- Keep the system simple, practical, and suitable for a small social welfare organization.
- Use dummy data only.
- The design should look professional and suitable for a college Computer Science project.

DESIGN STYLE:
- Clean, modern, professional healthcare interface.
- Calm and trustworthy visual design.
- Use a light background with clear cards and readable typography.
- Use a consistent spacing system.
- Use accessible contrast and large, readable text.
- Use simple icons for navigation.
- Avoid excessive animations and unnecessary decorative elements.
- The interface should be easy for non-technical staff to understand.
- Fully responsive design for desktop, tablet, and mobile screens.

APPLICATION NAME:
"CareTrack"
Subtitle: "Resident Record & Health-Care Management System"

MAIN USER:
Authorized staff/caregiver.

CORE MODULES:

1. LOGIN PAGE
Create a simple login screen containing:
- Application logo
- Application name: CareTrack
- Email or username field
- Password field
- Show/hide password option
- Remember me checkbox
- Login button
- Forgot password option

2. DASHBOARD
Create a dashboard showing a clear overview of the organization.

Display:
- Total Residents
- Active Health Records
- Upcoming Follow-ups
- Recent Health Updates

Add a "Recent Activity" section showing:
- Recent health record updates
- Recently added medication records
- Recent check-up entries

Add an "Upcoming Follow-ups" section showing:
- Resident name
- Follow-up date
- Purpose
- Status

Add quick action buttons:
- Add Resident
- Add Health Record
- Add Medication
- Add Check-up Record

3. RESIDENTS PAGE
Create a resident management page with:

Header:
- Page title: Residents
- Short description: Manage resident profiles and care-related information.
- Add Resident button

Search and filter controls:
- Search by resident name or Resident ID
- Filter by gender
- Filter by age group
- Sort by name or recent update

Display residents in a clean table or card layout.

Each resident record should show:
- Profile photo/avatar
- Resident ID
- Full name
- Age
- Gender
- Last health update
- Status
- View Profile button

Use realistic dummy residents such as:
- Resident A
- Resident B
- Resident C

Do not use real patient information.

4. ADD RESIDENT PAGE
Create a form containing:

Basic Information:
- Full Name
- Resident ID
- Date of Birth
- Age
- Gender
- Blood Group
- Date of Admission

Contact and Emergency Information:
- Emergency Contact Name
- Emergency Contact Number
- Relationship

Additional Information:
- Address
- Important Notes

Buttons:
- Save Resident
- Cancel

Include form validation states.

5. RESIDENT PROFILE PAGE
Create a detailed resident profile page.

Header:
- Resident profile photo/avatar
- Full name
- Resident ID
- Age
- Gender
- Quick actions:
  - Edit Profile
  - Add Health Record
  - Add Medication
  - Add Check-up

Use tabs:

TAB 1: OVERVIEW
Show:
- Basic information
- Emergency contact
- Important notes
- Latest health update
- Current medications
- Upcoming follow-up

TAB 2: HEALTH RECORDS
Display a timeline or list of health records.

Each record should contain:
- Date
- Record type
- Description
- Recorded by
- Additional notes

Example:
"Routine Health Check-up"
"General health observation recorded."

TAB 3: MEDICATIONS
Display medication records with:
- Medicine name
- Dosage
- Frequency
- Start date
- End date
- Instructions
- Status

Use status labels:
- Active
- Completed
- Discontinued

Include an Add Medication button.

TAB 4: CHECK-UPS
Display:
- Check-up date
- Check-up type
- Doctor or healthcare provider
- Observations
- Follow-up date
- Notes

Include an Add Check-up button.

TAB 5: CARE NOTES
Display daily or important care-related notes:
- Date
- Note
- Category
- Added by

6. HEALTH RECORD PAGE
Create a form for adding a health record.

Fields:
- Resident
- Date
- Record Type
- Health Observation
- Important Notes
- Follow-up Required: Yes/No
- Follow-up Date

Record types may include:
- Routine Check-up
- Health Observation
- Medical Visit
- Emergency Record
- Other

Buttons:
- Save Record
- Cancel

7. MEDICATION MANAGEMENT PAGE
Create a page for managing medication records.

Display:
- Resident name
- Medicine name
- Dosage
- Frequency
- Timing
- Start date
- End date
- Status

Include:
- Search
- Filter by resident
- Filter by status
- Add Medication button

Create a clear visual warning or highlight for medication records requiring attention, but do not use alarming or excessive colors.

8. CHECK-UP AND FOLLOW-UP PAGE
Create a page showing upcoming and previous check-ups.

Sections:
- Upcoming Follow-ups
- Recent Check-ups

Each record should display:
- Resident
- Date
- Check-up type
- Follow-up status
- Notes

Use a simple calendar or list view.

9. CARE NOTES PAGE
Create a page where authorized staff can add and view care-related notes.

Fields:
- Resident
- Date
- Category
- Note
- Priority

Categories:
- Daily Care
- Health
- Medication
- Follow-up
- General

10. REPORTS PAGE
Create a simple reports dashboard.

Display:
- Total residents
- Health records by month
- Upcoming follow-ups
- Active medications
- Recent activities

Include options:
- View Report
- Export Report

Do not make the reports overly complex.

11. SETTINGS PAGE
Include:
- User Profile
- Change Password
- Notification Preferences
- System Preferences
- Logout

NAVIGATION:
Use a left sidebar on desktop with:
- Dashboard
- Residents
- Health Records
- Medications
- Check-ups & Follow-ups
- Care Notes
- Reports
- Settings

On mobile, convert the sidebar into a responsive menu.

COMPONENTS TO DESIGN:
Create a consistent design system including:
- Buttons
- Input fields
- Dropdowns
- Search bars
- Tables
- Cards
- Tabs
- Badges
- Modal dialogs
- Confirmation dialogs
- Empty states
- Loading states
- Error states
- Success messages

DATA PRIVACY:
Since the system handles sensitive health-related information:
- Show that the system is for authorized users only.
- Include a clear logout option.
- Do not display unnecessary sensitive information on dashboard cards.
- Use dummy data only in the prototype.
- Add a small note in the interface that health information should be accessed only by authorized personnel.

OVERALL USER EXPERIENCE:
The system should prioritize:
1. Simplicity
2. Quick access to resident information
3. Easy record entry
4. Organized health-care information
5. Clear navigation
6. Minimal paperwork
7. Support for small-scale social welfare organizations

Create a complete high-fidelity prototype with connected screens and realistic dummy data. Make the interface look like a real, production-quality software system developed as a Computer Science team project.