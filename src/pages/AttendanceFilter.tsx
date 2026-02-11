import { useState } from 'react';
import type { Attendance, EmployeeInfo } from '../types/attendance.types';
import { fetchAttendanceByDateRange } from '../services/attendanceService';

export default function AttendanceFilter() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filtered, setFiltered] = useState(false);

  const handleFilter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      setError('Please select both start and end dates');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      console.log('Filtering attendance by date range:', { startDate, endDate });
      const data = await fetchAttendanceByDateRange(startDate, endDate);
      console.log('Filtered records:', data);
      setAttendance(data || []);
      setFiltered(true);
    } catch (err: any) {
      console.error('Error filtering attendance:', err);
      setError(err?.error?.message || err?.message || 'Failed to filter records');
      setAttendance([]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStartDate('');
    setEndDate('');
    setAttendance([]);
    setError(null);
    setFiltered(false);
  };

  const getEmployeeDisplay = (employee: string | EmployeeInfo | any): string => {
    if (typeof employee === 'string') {
      return employee;
    }
    if (employee && typeof employee === 'object') {
      return employee.fullName || employee.employeeId || employee._id || 'Unknown';
    }
    return 'Unknown';
  };

  return (
    <div style={{ marginTop: '30px' }}>
      <form onSubmit={handleFilter} style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px', border: '1px solid #ddd' }}>
        <h3 style={{ marginTop: 0 }}>Filter Attendance by Date Range</h3>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            style={{ width: '100%', padding: '10px', fontSize: '1rem', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            style={{ width: '100%', padding: '10px', fontSize: '1rem', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '10px 20px',
              fontSize: '1rem',
              backgroundColor: loading ? '#999' : '#333',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Filtering...' : 'Filter'}
          </button>
          {filtered && (
            <button
              type="button"
              onClick={handleReset}
              style={{
                padding: '10px 20px',
                fontSize: '1rem',
                backgroundColor: '#666',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Reset
            </button>
          )}
        </div>
        {error && <div style={{ color: '#d32f2f', marginTop: '10px', padding: '10px', backgroundColor: '#ffebee', borderRadius: '4px' }}>Error: {error}</div>}
      </form>

      {filtered && (
        <div>
          <h2>Filtered Results ({attendance.length} records)</h2>
          {attendance.length === 0 ? (
            <div style={{ padding: '20px', color: '#666', textAlign: 'center' }}>
              No records found for the selected date range.
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ddd' }}>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Employee Name</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Date</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map(a => (
                  <tr key={a._id} style={{ borderBottom: '1px solid #ddd' }}>
                    <td style={{ padding: '12px' }}>{getEmployeeDisplay(a.employee)}</td>
                    <td style={{ padding: '12px' }}>{new Date(a.date).toLocaleDateString()}</td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <span style={{ padding: '4px 8px', borderRadius: '4px', backgroundColor: a.status === 'Present' ? '#e8f5e9' : '#ffebee', color: a.status === 'Present' ? '#388e3c' : '#d32f2f', fontWeight: 'bold' }}>
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
