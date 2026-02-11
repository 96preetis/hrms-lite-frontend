import { useState } from 'react';
import { addEmployee } from '../services/employeeService';
import type { Employee } from '../types/employee.types';

const initialState = { employeeId: '', fullName: '', email: '', department: '' };

type FormState = typeof initialState;

export default function AddEmployee({ onAdded }: { onAdded?: (e: Employee) => void }) {
  const [form, setForm] = useState<FormState>(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      console.log('Adding employee:', form);
      const emp = await addEmployee(form);
      console.log('Employee added:', emp);
      setForm(initialState);
      onAdded?.(emp);
    } catch (err: any) {
      console.error('Error adding employee:', err);
      setError(err?.error?.message || err?.message || 'Add failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px', border: '1px solid #ddd' }}>
      <h3 style={{ marginTop: 0 }}>Add New Employee</h3>
      <div style={{ marginBottom: '15px' }}>
        <input 
          name="employeeId" 
          placeholder="Employee ID" 
          value={form.employeeId} 
          onChange={handleChange} 
          required
          style={{ width: '100%', padding: '10px', fontSize: '1rem', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <input 
          name="fullName" 
          placeholder="Full Name" 
          value={form.fullName} 
          onChange={handleChange} 
          required
          style={{ width: '100%', padding: '10px', fontSize: '1rem', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <input 
          name="email" 
          placeholder="Email" 
          value={form.email} 
          onChange={handleChange} 
          required 
          type="email"
          style={{ width: '100%', padding: '10px', fontSize: '1rem', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <input 
          name="department" 
          placeholder="Department" 
          value={form.department} 
          onChange={handleChange} 
          required
          style={{ width: '100%', padding: '10px', fontSize: '1rem', borderRadius: '4px', border: '1px solid #ccc' }}
        />
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
        {loading ? 'Adding...' : 'Add Employee'}
      </button>
      {error && <div style={{ color: '#d32f2f', marginTop: '10px', padding: '10px', backgroundColor: '#ffebee', borderRadius: '4px' }}>Error: {error}</div>}
    </form>
  );
}
