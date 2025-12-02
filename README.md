# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


App.jsx
 └─ maintains all rack/slot/item data

Containers.jsx
 └─ shows all racks
 └─ opens AddRackModal

AddRackModal.jsx
 └─ creates new rack with slots

ContainerGrid.jsx
 └─ shows slots inside one rack
 └─ opens SlotDetailModal

SlotDetailModal.jsx
 └─ add item
 └─ take item
 └─ show item history

SlotCard.jsx
 └─ UI for one slot

DeleteConfirmModal.jsx
 └─ delete slot or rack confirmation

SearchBar.jsx
 └─ search + jump to slot
//////////////////////////////////////////////////////////

# GT Item Management System

A React-based web application for managing inventory items stored in racks with slots. The system supports three user roles: **Admin**, **Manager**, and **User** with different permissions and dashboards.

## 🎯 Overview

This application allows organizations to:
- Manage physical racks/containers divided into slots
- Store and track items in slots
- Handle item requests and approvals (returnable/non-returnable)
- Track item borrowing history and return dates
- Generate user access and manage permissions

---

## 🏗️ Architecture

### User Roles & Access

| Role | Permissions |
|------|------------|
| **Admin** | View all racks, approve/reject user requests, manage users, view history |
| **Manager** | View racks, see approved requests, track due items, manage low stock |
| **User** | Request items, view available racks, track borrowed items, view personal history |

### Default Login Credentials

```
Admin:    admin@gmail.com
Manager:  manager@gmail.com
User:     user@gmail.com
```

---

## 📁 Project Structure

```
src/
├── pages/
│   ├── Containers.jsx              # Admin: Rack management (CRUD)
│   ├── AllUsers.jsx                # Admin: User management
│   ├── History.jsx                 # Activity logs
│   ├── dashboard/
│   │   └── UniversalDashboard.jsx  # Main dashboard (all roles)
│   ├── users/
│   │   ├── UserDashboard.jsx       # User: My requests
│   │   ├── UserRacks.jsx           # User: View racks & search items
│   │   ├── UserHistory.jsx         # User: Borrowing history
│   │   ├── UserBorrowedItems.jsx   # User: Active borrowed items
│   │   └── UserProfile.jsx         # User: Profile management
│   └── manager/
│       ├── ManagerDashboard.jsx    # Manager: Approved requests overview
│       ├── ManagerRacks.jsx        # Manager: Rack view
│       ├── ManagerHistory.jsx      # Manager: Activity history
│       ├── ManagerUsers.jsx        # Manager: User list
│       └── ManagerProfile.jsx      # Manager: Profile management
│
├── components/
│   ├── common/
│   │   ├── Navbar.jsx              # Top navigation bar
│   │   ├── Sidebar.jsx             # Side navigation
│   │   └── UniversalLayout.jsx     # Layout wrapper
│   ├── admin/
│   │   ├── SearchBar.jsx           # Item search & filter
│   │   ├── racks/
│   │   │   ├── SlotCard.jsx        # Slot display component
│   │   │   ├── SlotDetailModal.jsx # Add/view items in slot
│   │   │   └── AddItemModal.jsx    # Add new item form
│   │   └── dashboard/
│   │       ├── ContainerSummaryCard.jsx  # Rack capacity display
│   │       ├── PermissionRequests.jsx    # Pending requests list
│   │       ├── DueDatesCard.jsx         # Items with due dates
│   │       ├── LowStockCard.jsx         # Low quantity alerts
│   │       └── RecentActivity.jsx       # Activity timeline
│   ├── users/
│   │   └── RequestItemModal.jsx    # User: Request item form
│   └── manager/
│       └── ManagerPermissionModal.jsx # Manager: Approve/give items
│
├── auth/
│   ├── Login.jsx                   # Authentication page
│   └── Register.jsx                # Registration (unused)
│
├── data/
│   └── Mockdata.js                 # Mock data for all entities
│
├── App.js                          # Main app & routing
├── App.css                         # Styles
├── index.js                        # React entry point
└── index.css                       # Global styles
```

---

## 🔑 Core Features

### 1. **Rack & Inventory Management** (Admin)

**File:** [`Containers.jsx`](src/pages/Containers.jsx)

- Create/delete racks
- Add/remove slots from racks
- Store items in slots with quantities
- Track returnable vs non-returnable items
- View item history (who took what, when)

**Data Structure:**
```javascript
Rack {
  id: string
  name: string
  slots: [
    {
      slotNumber: number
      items: [
        {
          id: string
          name: string
          quantity: number
          isReturnable: boolean
          taken: [
            {
              user: string
              qty: number
              date: string
              returnDate: string (if returnable)
            }
          ]
        }
      ]
    }
  ]
}
```

### 2. **Permission Request System**

**Files:** 
- User request: [`RequestItemModal.jsx`](src/components/users/RequestItemModal.jsx)
- Admin approval: [`PermissionRequests.jsx`](src/components/admin/dashboard/PermissionRequests.jsx)

**Flow:**
```
User requests item (specifies quantity, project, return date if returnable)
    ↓
Request goes to "Pending" status
    ↓
Admin reviews and approves/rejects
    ↓
If approved → Manager can give item to user
    ↓
Item marked as "taken" with user info
    ↓
If returnable → User returns by due date
```

**Status Lifecycle:** `Pending` → `Approved` → `Rejected` OR `Returned`

### 3. **Search & Navigation**

**File:** [`SearchBar.jsx`](src/components/admin/SearchBar.jsx)

- Search items by name (min 2 characters)
- Filter by: Returnable, Non-returnable, Occupied, Empty
- Jump to slot with smooth scroll + highlight effect
- Shows rack location and item status

### 4. **User History & Tracking**

**Files:**
- User history: [`UserHistory.jsx`](src/pages/users/UserHistory.jsx)
- Borrowed items: [`UserBorrowedItems.jsx`](src/pages/users/UserBorrowedItems.jsx)

- Track all borrowed items
- See return dates and overdue status
- Filter by project and status (Returned, Not Returned, Non-Returnable)
- Color-coded overdue alerts

### 5. **Dashboard Analytics**

**File:** [`DueDatesCard.jsx`](src/components/admin/dashboard/DueDatesCard.jsx) & [`LowStockCard.jsx`](src/components/admin/dashboard/LowStockCard.jsx)

- **Due Items:** Shows items with return dates and overdue count
- **Low Stock:** Alerts when item quantity < 6 units
- **Capacity:** Visual progress bars for rack utilization

### 6. **User Management** (Admin)

**File:** [`AllUsers.jsx`](src/pages/AllUsers.jsx)

- Add new users with auto-generated passwords
- Edit user details (name, email, phone, role)
- Delete users
- Assign roles: User, Manager
- Copy password to clipboard

---

## 🎨 UI/UX Design

### Color Scheme (HSL)
```css
Primary Background:    hsl(215, 25%, 12%)
Secondary Background:  hsl(215, 25%, 14%)
Accent:               hsl(215, 25%, 16%)
Text:                 hsl(210, 40%, 98%)
Muted:                hsl(215, 20%, 25%)
```

### Key UI Components
- **Bootstrap 5** for responsive grid & forms
- **Lucide React** for icons
- **React Bootstrap** for modals & dropdowns
- **Sticky navbar** with role indicator
- **Sidebar navigation** (collapsible on mobile)

---

## 🔄 Data Flow

### State Management

**Central State:** [`App.js`](src/App.js)

```javascript
containers[]              // All racks with items
permissionRequests[]      // User requests (Pending/Approved/Rejected)
approvedPermissions[]     // Filtered approved requests for managers
currentUser              // Logged-in user data
```

**State Updates:**
- Add/update containers → propagated through context/props
- Approve request → status changed to "Approved"
- Manager gives item → user added to item's `taken[]` array

---

## 📊 Mock Data

**File:** [`Mockdata.js`](src/data/Mockdata.js)

```javascript
mockContainers        // 3 racks (C1, C2, C3) with demo items
mockPermissionRequests // 5+ sample requests with statuses
mockUsers             // Pre-created users (Alice, Bob, Charlie, etc.)
mockAdmin / mockManager / mockUser  // Role-specific accounts
dummyBorrowedItems    // Sample borrowed items for user dashboard
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 14+
- npm or yarn

### Installation

```bash
# Clone repository
cd gtfe

# Install dependencies
npm install

# Start development server
npm start
```

**App runs at:** `http://localhost:3000`

### Available Scripts

```bash
npm start      # Development mode
npm build      # Production build
npm test       # Run tests
npm eject      # Expose webpack config (irreversible)
```

---

## 🔐 Authentication

**File:** [`Login.jsx`](src/auth/Login.jsx)

- Email-based login (no password validation in mock)
- Routes to role-specific dashboards:
  - `admin@gmail.com` → `/admin/dashboard`
  - `manager@gmail.com` → `/manager/dashboard`
  - `user@gmail.com` → `/users/dashboard`

---

## 📋 Key Workflows

### Admin Workflow
1. Login → Dashboard (see pending requests & racks)
2. Manage Racks: Add/delete racks, manage slots
3. Add Items: Upload items to slots
4. Review Requests: Approve/reject user requests
5. Manage Users: Add/edit/delete users
6. View History: Track all activities

### Manager Workflow
1. Login → Dashboard (see approved requests)
2. View Racks: See all available items
3. Give Items: Fulfill approved requests to users
4. Track Due Items: Monitor return dates
5. Low Stock Alerts: Check inventory levels

### User Workflow
1. Login → Dashboard
2. Request Item: Fill form (item name, qty, project, returnable?)
3. Track Request: See if pending/approved/rejected
4. View Racks: Search items, see availability
5. My History: Track borrowed items & due dates
6. Profile: Manage personal info

---

## 🛠️ Technologies Used

| Technology | Purpose |
|-----------|---------|
| **React 19** | UI framework |
| **React Router v7** | Client-side routing |
| **React Bootstrap** | UI components |
| **Bootstrap 5** | Responsive CSS framework |
| **Lucide React** | Icon library |
| **date-fns** | Date formatting |
| **localStorage** | Client-side data persistence |

---

## 📝 Notes

- **Mock Data:** All data is stored in memory; refreshing page resets changes
- **localStorage:** User management persists via `localStorage`
- **Permissions:** Managed via request status flow (Pending → Approved)
- **Returnable Items:** Track return dates; non-returnable marked as permanent
- **Search:** Case-insensitive, supports partial matches

---

## 🐛 Known Limitations

- No backend API (mock data only)
- No real authentication (email-based only)
- Data resets on page refresh (except users via localStorage)
- No email notifications
- No file uploads for documents

---

## 🚀 Future Enhancements

- Backend API integration (Node.js/Express)
- Real database (MongoDB/PostgreSQL)
- Email notifications for approvals
- Two-factor authentication
- Role-based API permissions
- Audit logs
- Item photo upload
- Barcode/QR scanning
- Analytics dashboard
- Export to CSV/PDF

---

## 📞 Support

For issues or questions, refer to the component files and their inline comments.

**Main Entry Point:** [`App.js`](src/App.js)  
**Main Dashboard:** [`UniversalDashboard.jsx`](src/pages/dashboard/UniversalDashboard.jsx)  
**Mock Data:** [`Mockdata.js`](src/data/Mockdata.js)
