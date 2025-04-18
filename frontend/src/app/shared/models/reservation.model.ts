import { Espace } from "./espace.model";
import { User } from "../../../models/user.model";
export interface Reservation {
  id: number;
  dateStart: Date;
  dateEnd: Date;
  nbrePlaces: number;
  status: string;
  espace: Espace; // <-- Assurez-vous que cette propriété existe
  user: User;
  total:number;
}