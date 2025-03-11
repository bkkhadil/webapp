import { Role } from './role.model';
export interface RegisterRequest {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: Role; // Utilisation de l'enum Role
}