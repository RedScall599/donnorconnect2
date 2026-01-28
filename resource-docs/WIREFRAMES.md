# DonorConnect Wireframes

## 1. Login Page (`/login`)

**Elements:**
- DonorConnect logo
- "Login to Your Account" heading
- Email input field
- Password input field
- Login button
- "Don't have an account? Sign Up" link

---

## 2. Dashboard (`/dashboard`) - Admin View

**Header:**
- Logo
- Navigation: Home, Donors, Campaigns, Donations, Segments
- User dropdown

**Content:**
- "Dashboard" heading
- Four metric cards:
  - Total Donors: 75
  - Total Donations: 200
  - At-Risk Donors: 30
  - Recent Activity: 12

- Recent Donations table:
  - Columns: Donor Name, Amount, Date, Campaign
  - Rows showing recent donation entries

**Additional Elements:**
- AI Chatbot icon

---

## 3. Dashboard - Non-Admin View

**Header:** Same as admin (without Segments link)

**Content:**
- "Dashboard" heading
- "Make a Donation" button
- Three metric cards:
  - Total Donors: 75
  - Total Donations: 200
  - Recent Activity: 12
- Note: No At-Risk Donors metric shown

---

## 4. Donors List (`/donors`) - Admin View

**Header:** Standard navigation with Segments

**Content:**
- "Donors" heading
- "+ Add Donor" button
- Table with columns:
  - Name
  - Email
  - Phone
  - Address
  - City
  - State
  - Zip
  - Retention Risk (badge)
  - Actions: Edit button, Delete button

- Example row:
  - Michael Lopez
  - m@example.com
  - 555-8367
  - 2867 Main St
  - New York
  - TX
  - 12345
  - Risk: MEDIUM (yellow badge)
  - [Edit] [Delete] buttons

---

## 5. Donors List - Non-Admin View

**Header:** Standard navigation (no Segments)

**Content:**
- "Donors" heading (no add button)
- Table with columns:
  - Name
  - Status (badge)
  - Total Gifts
  - Total Amount
  - Last Gift Date

- Example rows showing donor giving history
- No edit/delete actions available

---

## 6. Edit Donor (`/donors/[id]/edit`) - Admin Only

**Header:** Standard navigation

**Content:**
- "Edit Donor" heading
- Form fields:
  - First Name (text input)
  - Last Name (text input)
  - Email (email input)
  - Phone (tel input)
  - Address (text input)
  - City (text input)
  - State (text input, 2 chars)
  - Zip Code (text input)
  - Status (dropdown: Active, Lapsed, Inactive, Do Not Contact)
  - Retention Risk (dropdown: Low, Moderate, High, Critical)

- Action buttons:
  - "Save Changes" (primary button)
  - "Cancel" (secondary button)

---

## 7. New Donation (`/donations/new`) - Non-Admin

**Header:** Standard navigation

**Content:**
- "Record New Donation" heading
- Form fields:
  - Donor Email (disabled, pre-filled with user's email)
  - Amount ($) (number input)
  - Date (date picker)
  - Campaign (dropdown - optional)
  - Payment Type (dropdown: Cash, Check, Credit Card, etc.)
  - Notes (textarea)

- "Submit Donation" button

---

## 8. Campaigns (`/campaigns`)

**Header:** Standard navigation

**Content:**
- "Campaigns" heading
- Campaign cards (stacked):

**Card 1: Annual Fund 2025**
- Status badge: Active
- Total Raised: $67,500
- Goal: $100,000
- Donor list (scrollable):
  - John Doe - $5,000 - Jan 15, 2026
  - Jane Smith - $2,500 - Jan 12, 2026
  - Bob Johnson - $1,000 - Jan 10, 2026
  - [View More...] link

**Card 2: Emergency Response**
- Status badge: Completed
- Total Raised: $23,400
- Goal: $25,000

---

## 9. Segments (`/segments`) - Admin Only

**Header:** Standard navigation

**Content:**
- "Donor Segments" heading
- Table with columns:
  - Name
  - Description
  - Donors (count)

- Rows:
  - First-Time Donors | Gave exactly once | 30
  - High-Risk Retention | High/Critical risk | 30
  - Major Donors | $1000+ total giving | 0
  - Lapsed Donors | 12+ months no gift | 0

---

## 10. AI Chatbot (Floating Widget)

**Collapsed state:**
- Chat icon button (circular)

**Expanded state:**
- Header: "DonorConnect Assistant" with close button
- Chat history area showing:
  - AI welcome message
  - User questions
  - AI responses
- Input area:
  - Text input field "Type message..."
  - Send button (arrow icon)

---

## Common UI Elements

### Header Navigation (All Pages)
- Logo
- Navigation links:
  - Home
  - Donors
  - Campaigns
  - Donations
  - Segments (admin only)
- User dropdown:
  - Profile
  - Settings
  - Logout

### Footer Links (All Pages)
- Home
- About
- Why DonorConnect
- AI Policy
- Evidence (admin only)
- Reflection (admin only)

---

## Responsive Design

### Mobile (< 768px)
- Hamburger menu replaces navigation bar
- Single column layout
- Metric cards stacked vertically
- Tables become scrollable cards
- Chatbot button smaller

### Tablet (768px - 1024px)
- Condensed navigation
- Two-column grid for metric cards
- Tables with horizontal scroll

### Desktop (> 1024px)
- Full navigation bar
- Multi-column grids (3-4 columns)
- Full-width tables
- Optimal spacing

---

## Color Scheme

- **Primary:** Wood Brown / Burnt Orange
- **Background:** Warm Ivory
- **Cards:** Cream Beige
- **Accent:** Soft Terracotta
- **Text:** Dark Foreground
- **Success:** Green badges
- **Warning:** Yellow/Orange badges
- **Error:** Red badges

---

## Key User Interactions

1. **Login** - Email/password form with validation, redirects to dashboard on success
2. **Dashboard** - View metrics at a glance, click activities for details
3. **Donors List** - Browse all donors, admins can edit/delete
4. **Edit Donor** - Comprehensive form for admins to update all donor information
5. **New Donation** - Simple form, email pre-filled for non-admins
6. **Campaigns** - View campaign performance with expandable donor lists
7. **Segments** - View dynamic donor segments with real-time counts
8. **Chatbot** - Ask questions and get AI-powered platform guidance

---

**Note:** These wireframes represent the actual implemented UI in your DonorConnect application.

---

## Responsive Breakpoints

### Mobile (< 768px)
- Single column layout
- Hamburger menu for navigation
- Stacked metric cards
- Scrollable tables

### Tablet (768px - 1024px)
- Two column layout
- Collapsed navigation
- Grid cards (2x2)

### Desktop (> 1024px)
- Full multi-column layout
- Complete navigation bar
- Grid cards (4x1 or 3x1)
- Full-width tables

---

## Color Scheme (Tailwind Classes)

- Primary: Wood Brown / Burnt Orange
- Background: Warm Ivory
- Accent: Soft Terracotta
- Text: Foreground (dark)
- Cards: Cream Beige

---

## Key Interactions

1. **Login** - Form validation, redirect to dashboard on success
2. **Dashboard** - Real-time metrics, click activities for details
3. **Donors** - Sort/filter table, click row for details
4. **Edit Donor** - Form validation, save with confirmation
5. **New Donation** - Email pre-filled for non-admins, campaign optional
6. **Campaigns** - Expandable donor lists, progress bars
7. **Segments** - Dynamic member counts, no links to detail
8. **Chatbot** - Persistent widget, AI-powered responses

---

**Note:** These wireframes represent the actual implemented UI based on your DonorConnect codebase.
