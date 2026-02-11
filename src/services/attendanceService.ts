import type { Attendance, AttendanceStatus } from '../types/attendance.types';

const API_URL = `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'}/api/attendance`;

export async function markAttendance(
  employeeId: string,
  date: string,
  status: AttendanceStatus
): Promise<Attendance> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ employeeId, date, status }),
  });
  if (!res.ok) throw await res.json();
  const data = await res.json();
  return data.data;
}

export async function fetchAttendanceByEmployee(employeeId: string): Promise<Attendance[]> {
  const res = await fetch(`${API_URL}/employee/${employeeId}`);
  if (!res.ok) throw await res.json();
  const data = await res.json();
  return data.data;
}

export async function fetchAllAttendance(): Promise<Attendance[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw await res.json();
  const data = await res.json();
  return data.data;
}

export async function fetchAttendanceByDateRange(startDate: string, endDate: string): Promise<Attendance[]> {
  const params = new URLSearchParams({ startDate, endDate });
  const res = await fetch(`${API_URL}/filter?${params}`);
  if (!res.ok) throw await res.json();
  const data = await res.json();
  return data.data;
}

export async function fetchAttendanceSummary(): Promise<{
  totalRecords: number;
  presentCount: number;
  absentCount: number;
  summaryByEmployee: Array<{
    _id: string;
    totalDays: number;
    presentDays: number;
    absentDays: number;
  }>;
}> {
  const res = await fetch(`${API_URL}/summary`);
  if (!res.ok) throw await res.json();
  const data = await res.json();
  return data.data;
}
