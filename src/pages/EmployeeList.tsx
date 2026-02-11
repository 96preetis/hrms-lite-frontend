import { useEffect, useState } from 'react';
import type { Employee } from '../types/employee.types';
import { fetchEmployees, deleteEmployee } from '../services/employeeService';

export default function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('Fetching employees...');
    fetchEmployees()
      .then(data => {
        console.log('Employees fetched:', data);
        setEmployees(data);
      })
      .catch(err => {
        console.error('Error fetching employees:', err);
        setError(err?.error?.message || err?.message || 'Failed to load employees');
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this employee?')) return;
    try {
      await deleteEmployee(id);
      setEmployees(employees.filter(e => e._id !== id));
    } catch (e: any) {
      setError(e?.error?.message || 'Delete failed');
    }
  };

  if (loading) return <div style={{ padding: '20px', fontSize: '1.1rem' }}>Loading employees...</div>;
  if (error) return <div style={{ padding: '20px', color: '#d32f2f', backgroundColor: '#ffebee', borderRadius: '4px' }}>Error: {error}</div>;
  if (!employees.length) return <div style={{ padding: '20px', color: '#666' }}>No employees found. Add one to get started.</div>;

  return (
    <div style={{ marginTop: '30px' }}>
      <h2>Employees ({employees.length})</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ddd' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>Employee ID</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Email</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Department</th>
            <th style={{ padding: '12px', textAlign: 'center' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp._id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '12px' }}>{emp.employeeId}</td>
              <td style={{ padding: '12px' }}>{emp.fullName}</td>
              <td style={{ padding: '12px' }}>{emp.email}</td>
              <td style={{ padding: '12px' }}>{emp.department}</td>
              <td style={{ padding: '12px', textAlign: 'center' }}>
                <button 
                  onClick={() => handleDelete(emp._id)}
                  style={{ padding: '6px 12px', backgroundColor: '#d32f2f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
