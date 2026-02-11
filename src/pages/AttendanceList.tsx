import { useEffect, useState } from 'react';
import type { Attendance, EmployeeInfo } from '../types/attendance.types';
import { fetchAllAttendance } from '../services/attendanceService';

export default function AttendanceList() {
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAttendance = async () => {
      try {
        console.log('Fetching attendance records...');
        const data = await fetchAllAttendance();
        console.log('Attendance data received:', data);
        setAttendance(data || []);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching attendance:', err);
        setError(err?.error?.message || err?.message || 'Failed to load attendance records');
        setAttendance([]);
      } finally {
        setLoading(false);
      }
    };

    loadAttendance();
  }, []);

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
      {loading && <div style={{ padding: '20px', fontSize: '1.1rem', color: '#666' }}>Loading attendance records...</div>}
      {error && (
        <div style={{ padding: '20px', color: '#d32f2f', backgroundColor: '#ffebee', borderRadius: '4px', marginTop: '10px' }}>
          <strong>Error:</strong> {error}
        </div>
      )}
      {!loading && !error && attendance.length === 0 && (
        <div style={{ padding: '20px', color: '#666', textAlign: 'center' }}>
          No attendance records found. Mark attendance to get started.
        </div>
      )}
      {!loading && !error && attendance.length > 0 && (
        <>
          <h2>Attendance Records ({attendance.length})</h2>
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
        </>
      )}
    </div>
  );
}
