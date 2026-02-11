# HRMS Lite - Frontend Application

A modern, responsive React-based frontend for the HRMS Lite Human Resource Management System. Built with React 19, TypeScript, and Vite for optimal performance and developer experience.

## 📋 Project Overview

HRMS Lite Frontend is a single-page application (SPA) that provides a complete user interface for managing employees and attendance records:

- **Employee Management**: View, add, and delete employees
- **Attendance Tracking**: Mark and track employee attendance
- **Date Range Filtering**: Filter attendance records by specific date ranges
- **Dashboard Analytics**: View comprehensive attendance summaries
- **Professional UI**: Clean, modern, and responsive design
- **Error Handling**: Comprehensive error boundaries and user-friendly messages

## 🛠️ Tech Stack

| Component | Technology | Version |
|-----------|-----------|----------|
| **Library** | React | 19.2.0 |
| **Language** | TypeScript | 5.9.3 |
| **Build Tool** | Vite | 7.3.1 |
| **Styling** | CSS | Native |
| **Linter** | ESLint | Latest |
| **HTTP Client** | Fetch API | Native |
| **State** | React Hooks | Built-in |

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Backend**: HRMS Lite backend running on http://localhost:3000

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/96preetis/hrms-lite-frontend.git
   cd hrms-lite-frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env`:
   ```env
   VITE_BACKEND_URL=http://localhost:3000
   ```

4. **Start the Development Server**
   ```bash
   npm run dev
   ```
   
   Application runs on `http://localhost:5173`

### Available Scripts

```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Check code quality
```

## 🎨 Features

### 1. Employee Management
- View all employees in table format
- Add new employees with validation
- Delete employees with confirmation

### 2. Attendance Management
- Mark attendance (Present/Absent)
- View attendance records
- Employee names displayed with records

### 3. Analytics Dashboard
- Summary cards (Total, Present, Absent)
- Per-employee attendance breakdown
- Attendance percentage calculation
- Color-coded performance indicators
  - 🟢 Green: ≥80% attendance
  - 🟡 Orange: 60-80% attendance
  - 🔴 Red: <60% attendance

### 4. Date Range Filtering
- Filter attendance by date range
- View filtered results in table
- Reset filters to start over

## 📡 Navigation

- **Employees**: Add and view employee data
- **Attendance**: Mark and view daily records
- **Filter Records**: Search by date range
- **Dashboard**: View analytics and summaries

## 📝 Assumptions & Limitations

### Assumptions
- Backend running on http://localhost:3000
- CORS enabled on backend
- Dates in ISO 8601 format (YYYY-MM-DD)
- Employee emails and IDs are unique
- Modern browser with ES2020+ support

### Limitations
- No authentication/user login
- No offline support or caching
- No pagination (all data fetched at once)
- No export to CSV/PDF
- Single user context (no role-based views)
- No real-time updates (no WebSocket)
- Limited filtering options
- No user preferences/theme switching

## 🖥️ Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/AmazingFeature`
2. Commit changes: `git commit -m 'Add feature'`
3. Push to branch: `git push origin feature/AmazingFeature`
4. Open Pull Request

## 📄 License

MIT License - Open source

## 👤 Author

**Soni** - [@96preetis](https://github.com/96preetis)

---

**Last Updated**: February 2026 | **Status**: Active Development
