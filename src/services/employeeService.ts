import type { Employee } from '../types/employee.types';

const API_URL = `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'}/api/employees`;

export async function fetchEmployees(): Promise<Employee[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw await res.json();
  const data = await res.json();
  return data.data;
}

export async function addEmployee(employee: Omit<Employee, '_id' | 'createdAt' | 'updatedAt'>): Promise<Employee> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employee),
  });
  if (!res.ok) throw await res.json();
  const data = await res.json();
  return data.data;
}

export async function deleteEmployee(id: string): Promise<Employee> {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw await res.json();
  const data = await res.json();
  return data.data;
}
