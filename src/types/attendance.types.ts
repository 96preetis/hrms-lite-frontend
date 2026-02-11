export type AttendanceStatus = 'Present' | 'Absent';

export interface EmployeeInfo {
  _id: string;
  employeeId: string;
  fullName: string;
  email: string;
  department: string;
}

export interface Attendance {
  _id: string;
  employee: EmployeeInfo | string; // Can be populated object or just ID
  date: string;
  status: AttendanceStatus;
  createdAt?: string;
  updatedAt?: string;
}
