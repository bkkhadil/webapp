import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { SearchComponent } from './core/components/search/search.component';
import { ContactComponent } from './shared/components/contact/contact.component';
import { DetailsComponent } from './core/components/details/details.component';
import { FormulaireComponent } from './core/components/formulaire/formulaire.component';
import { CrudresponsableComponent } from './core/components/crudresponsable/crudresponsable.component';
import { ListeReservationComponent } from './core/components/liste-reservation/liste-reservation.component';
import { HistoriqueUtilisateurComponent } from './core/components/historique-utilisateur/historique-utilisateur.component';
import { PhotoComponent } from './core/components/photo/photo.component';
import { CoworkspaceFormComponent } from './core/components/coworkspace-form/coworkspace-form.component';
import { EspaceFormComponent } from './core/components/espace-form/espace-form.component';
import { UpdateEspaceComponent } from './core/components/update-espace/update-espace.component';
import { UpdateCoworkzoneComponent } from './core/components/update-coworkzone/update-coworkzone.component';
import { AuthGuard } from '../app/guards/auth.guard';
import { Role } from '../models/role.model';
import { UserAuthComponent } from './auth/user-auth/user-auth.component';
import { PartnerRegisterComponent } from './auth/partner-register/partner-register.component';
import { UserRegisterComponent } from './auth/user-register/user-register.component';
import { PartnerAuthComponent } from './auth/partner-auth/partner-auth.component';
import { NoAuthGuard } from './guards/no-auth.guard';
import { ProfileComponent } from './auth/profile/profile.component';
import { ServicesComponent } from './core/components/services/services.component';


const routes: Routes = [

  { path: 'user/photo', component: PhotoComponent },
  {
    path: 'register/partner',
    component: PartnerRegisterComponent,
    canActivate: [NoAuthGuard], // Appliquer le garde ici
  },
  {
    path: 'services',
    component: ServicesComponent,
  
  },
  
 
  {
    path: 'register/user',
    component: UserRegisterComponent,
    canActivate: [NoAuthGuard], // Appliquer le garde ici
  },
  {
    path: 'login/partner',
    component: PartnerAuthComponent,
    canActivate: [NoAuthGuard], // Appliquer le garde ici
  },
  {
    path: 'login/user',
    component: UserAuthComponent,
    canActivate: [NoAuthGuard], // Appliquer le garde ici
  },
  { path: '', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'contact', component: ContactComponent },
 
  { 
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'user',
    canActivate: [AuthGuard],
    data: { roles: [Role.USER] },
    children: [
      { path: 'home', component: HomeComponent },
     { 
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
      },
     
      
      { path: 'historique', component: HistoriqueUtilisateurComponent },
      {
        path: 'espace/:espaceId', // Suppression du :nomEspace inutilisé
        component: FormulaireComponent 
      },
      { path: 'details/:id', component: DetailsComponent }
    ]
  },

  // Partner-protected routes
  {
    path: 'partner',
    canActivate: [AuthGuard],
    data: { roles: [Role.PARTNER] },
    children: [
      { path: 'crud', component: CrudresponsableComponent },
      { path: 'autorisation', component: ListeReservationComponent },
      { 
        path: 'espace', // Doit correspondre au paramètre capturé
        component:  EspaceFormComponent
      },
   
     { 
        path: 'espace/:id', // Ajout du paramètre d'ID
        component: EspaceFormComponent
      },
      { path: 'coworkspace', component: CoworkspaceFormComponent },
      { path: 'updatecoworkzone/:id', component: UpdateCoworkzoneComponent },
      { 
        path: 'update-espace/:coworkspaceId/:espaceId',
        component: UpdateEspaceComponent 
      },
      
    ]
  },

 
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }