export type UserStatus = 'ACTIVE' | 'INACTIVE';
export type UserRole = 'ADMIN' | 'USER' | 'GUEST';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password?: string;
  roles: UserRole;
  status: UserStatus;
}

export interface UserFormValues {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  roles: UserRole;
  status: UserStatus;
}
