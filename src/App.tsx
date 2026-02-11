
import { useState } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import EmployeeList from './pages/EmployeeList';
import AddEmployee from './pages/AddEmployee';
import AttendanceList from './pages/AttendanceList';
import MarkAttendance from './pages/MarkAttendance';
import Dashboard from './pages/Dashboard';
import AttendanceFilter from './pages/AttendanceFilter';
import './App.css';

type Page = 'employees' | 'attendance' | 'dashboard' | 'filter';

function App() {
  const [page, setPage] = useState<Page>('employees');
  const [refresh, setRefresh] = useState(0);

  return (
    <ErrorBoundary>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '2px solid #333', paddingBottom: '20px' }}>
          <h1 style={{ margin: 0, fontSize: '2.5rem' }}>HRMS Lite</h1>
          <nav style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button 
              onClick={() => setPage('employees')}
              style={{ 
                padding: '10px 20px',
                fontSize: '1rem',
                fontWeight: page === 'employees' ? 'bold' : 'normal',
                backgroundColor: page === 'employees' ? '#333' : '#f0f0f0',
                color: page === 'employees' ? 'white' : 'black',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Employees
            </button>
            <button 
              onClick={() => setPage('attendance')}
              style={{ 
                padding: '10px 20px',
                fontSize: '1rem',
                fontWeight: page === 'attendance' ? 'bold' : 'normal',
                backgroundColor: page === 'attendance' ? '#333' : '#f0f0f0',
                color: page === 'attendance' ? 'white' : 'black',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Attendance
            </button>
            <button 
              onClick={() => setPage('filter')}
              style={{ 
                padding: '10px 20px',
                fontSize: '1rem',
                fontWeight: page === 'filter' ? 'bold' : 'normal',
                backgroundColor: page === 'filter' ? '#333' : '#f0f0f0',
                color: page === 'filter' ? 'white' : 'black',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Filter Records
            </button>
            <button 
              onClick={() => setPage('dashboard')}
              style={{ 
                padding: '10px 20px',
                fontSize: '1rem',
                fontWeight: page === 'dashboard' ? 'bold' : 'normal',
                backgroundColor: page === 'dashboard' ? '#333' : '#f0f0f0',
                color: page === 'dashboard' ? 'white' : 'black',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Dashboard
            </button>
          </nav>
        </header>
        <main>
          {page === 'employees' && (
            <ErrorBoundary>
              <AddEmployee onAdded={() => setRefresh(r => r + 1)} />
              <EmployeeList key={refresh} />
            </ErrorBoundary>
          )}
          {page === 'attendance' && (
            <ErrorBoundary>
              <MarkAttendance onMarked={() => setRefresh(r => r + 1)} />
              <AttendanceList key={refresh} />
            </ErrorBoundary>
          )}
          {page === 'filter' && (
            <ErrorBoundary>
              <AttendanceFilter />
            </ErrorBoundary>
          )}
          {page === 'dashboard' && (
            <ErrorBoundary>
              <Dashboard />
            </ErrorBoundary>
          )}
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;
