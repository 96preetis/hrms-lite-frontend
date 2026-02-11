import { useState } from 'react';
import { markAttendance } from '../services/attendanceService';
import type { AttendanceStatus } from '../types/attendance.types';

export default function MarkAttendance({ onMarked }: { onMarked?: () => void }) {
  const [employeeId, setEmployeeId] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState<AttendanceStatus>('Present');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      console.log('Marking attendance for:', { employeeId, date, status });
      await markAttendance(employeeId, date, status);
      console.log('Attendance marked successfully');
      setEmployeeId('');
      setDate('');
      setStatus('Present');
      setSuccess(true);
      onMarked?.();
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      console.error('Error marking attendance:', err);
      setError(err?.error?.message || err?.message || 'Failed to mark attendance');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px', border: '1px solid #ddd' }}>
        <h3 style={{ marginTop: 0 }}>Mark Attendance</h3>
        <div style={{ marginBottom: '15px' }}>
          <input 
            name="employeeId" 
            placeholder="Employee ID" 
            value={employeeId} 
            onChange={e => setEmployeeId(e.target.value)} 
            required
            style={{ width: '100%', padding: '10px', fontSize: '1rem', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input 
            name="date" 
            type="date" 
            value={date} 
            onChange={e => setDate(e.target.value)} 
            required
            style={{ width: '100%', padding: '10px', fontSize: '1rem', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <select 
            name="status" 
            value={status} 
            onChange={e => setStatus(e.target.value as AttendanceStatus)}
            style={{ width: '100%', padding: '10px', fontSize: '1rem', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        </div>
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
          {loading ? 'Marking...' : 'Mark Attendance'}
        </button>
        {error && <div style={{ color: '#d32f2f', marginTop: '10px', padding: '10px', backgroundColor: '#ffebee', borderRadius: '4px' }}>Error: {error}</div>}
        {success && <div style={{ color: '#388e3c', marginTop: '10px', padding: '10px', backgroundColor: '#e8f5e9', borderRadius: '4px' }}>Attendance marked successfully!</div>}
      </form>
    </div>
  );
}
