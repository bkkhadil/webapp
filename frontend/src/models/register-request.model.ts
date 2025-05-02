import { Role } from './role.model';
export interface RegisterRequest {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: Role; // Utilisation de l'enum Role
  companyName?: string;         // Uniquement pour les partenaires
  taxIdentificationNumber?: string; // Uniquement pour les partenaires

}