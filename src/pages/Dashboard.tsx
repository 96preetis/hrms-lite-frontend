import { useEffect, useState } from 'react';
import { fetchAttendanceSummary } from '../services/attendanceService';
import { fetchEmployees } from '../services/employeeService';
import type { Employee } from '../types/employee.types';

interface AttendanceSummary {
  totalRecords: number;
  presentCount: number;
  absentCount: number;
  summaryByEmployee: Array<{
    _id: string;
    totalDays: number;
    presentDays: number;
    absentDays: number;
  }>;
}

export default function Dashboard() {
  const [summary, setSummary] = useState<AttendanceSummary | null>(null);
  const [employees, setEmployees] = useState<Map<string, Employee>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('Loading dashboard data...');
        
        // Fetch summary and employees in parallel
        const [summaryData, employeesData] = await Promise.all([
          fetchAttendanceSummary(),
          fetchEmployees()
        ]);

        setSummary(summaryData);

        // Create a map of employees by ID for easy lookup
        const employeeMap = new Map<string, Employee>();
        employeesData.forEach(emp => {
          employeeMap.set(emp._id, emp);
        });
        setEmployees(employeeMap);
        setError(null);
      } catch (err: any) {
        console.error('Error loading dashboard:', err);
        setError(err?.error?.message || err?.message || 'Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const getEmployeeName = (employeeId: string): string => {
    return employees.get(employeeId)?.fullName || 'Unknown';
  };

  if (loading) {
    return <div style={{ padding: '20px', fontSize: '1.1rem', color: '#666' }}>Loading dashboard...</div>;
  }

  if (error) {
    return (
      <div style={{ padding: '20px', color: '#d32f2f', backgroundColor: '#ffebee', borderRadius: '4px' }}>
        Error: {error}
      </div>
    );
  }

  if (!summary) {
    return <div style={{ padding: '20px', color: '#666' }}>No data available</div>;
  }

  return (
    <div style={{ marginTop: '30px' }}>
      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={{ padding: '20px', backgroundColor: '#e3f2fd', borderRadius: '8px', border: '1px solid #90caf9' }}>
          <h3 style={{ marginTop: 0, color: '#1976d2' }}>Total Records</h3>
          <p style={{ fontSize: '2.5rem', margin: '10px 0', color: '#1565c0' }}>{summary.totalRecords}</p>
        </div>
        <div style={{ padding: '20px', backgroundColor: '#e8f5e9', borderRadius: '8px', border: '1px solid #81c784' }}>
          <h3 style={{ marginTop: 0, color: '#388e3c' }}>Present</h3>
          <p style={{ fontSize: '2.5rem', margin: '10px 0', color: '#2e7d32' }}>{summary.presentCount}</p>
        </div>
        <div style={{ padding: '20px', backgroundColor: '#ffebee', borderRadius: '8px', border: '1px solid #ef5350' }}>
          <h3 style={{ marginTop: 0, color: '#d32f2f' }}>Absent</h3>
          <p style={{ fontSize: '2.5rem', margin: '10px 0', color: '#c62828' }}>{summary.absentCount}</p>
        </div>
      </div>

      {/* Per-Employee Summary */}
      <div>
        <h2>Attendance Summary by Employee</h2>
        {summary.summaryByEmployee.length === 0 ? (
          <div style={{ padding: '20px', color: '#666', textAlign: 'center' }}>
            No employee attendance records yet.
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ddd' }}>
                <th style={{ padding: '12px', textAlign: 'left' }}>Employee Name</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>Total Days</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>Present</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>Absent</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>Attendance %</th>
              </tr>
            </thead>
            <tbody>
              {summary.summaryByEmployee.map(record => {
                const attendancePercentage = record.totalDays > 0 
                  ? Math.round((record.presentDays / record.totalDays) * 100) 
                  : 0;
                return (
                  <tr key={record._id} style={{ borderBottom: '1px solid #ddd' }}>
                    <td style={{ padding: '12px' }}>{getEmployeeName(record._id)}</td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>{record.totalDays}</td>
                    <td style={{ padding: '12px', textAlign: 'center', color: '#388e3c', fontWeight: 'bold' }}>
                      {record.presentDays}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center', color: '#d32f2f', fontWeight: 'bold' }}>
                      {record.absentDays}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <span style={{ 
                        padding: '4px 8px', 
                        borderRadius: '4px', 
                        backgroundColor: attendancePercentage >= 80 ? '#e8f5e9' : attendancePercentage >= 60 ? '#fff3e0' : '#ffebee',
                        color: attendancePercentage >= 80 ? '#388e3c' : attendancePercentage >= 60 ? '#f57c00' : '#d32f2f',
                        fontWeight: 'bold'
                      }}>
                        {attendancePercentage}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
