import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { LoginPartenaireComponent } from './core/components/login-partenaire/login-partenaire.component';
import { SearchComponent } from './core/components/search/search.component';
import { ContactComponent } from './shared/components/contact/contact.component';
import { DetailsComponent } from './core/components/details/details.component';
import { LoginUtilisateurComponent } from './core/components/login-utilisateur/login-utilisateur.component';
import { RegistrePartenaireComponent } from './core/components/registre-partenaire/registre-partenaire.component';
import { RegistreUtilisateurComponent } from './core/components/registre-utilisateur/registre-utilisateur.component';
import { FormulaireComponent } from './core/components/formulaire/formulaire.component';
import { CrudresponsableComponent } from './core/components/crudresponsable/crudresponsable.component';
import { ListeReservationComponent } from './core/components/liste-reservation/liste-reservation.component';
import { HistoriqueUtilisateurComponent } from './core/components/historique-utilisateur/historique-utilisateur.component';
import { PhotoComponent } from './core/components/photo/photo.component';
import { CoworkspaceFormComponent } from './core/components/coworkspace-form/coworkspace-form.component';
import { EspaceFormComponent } from './core/components/espace-form/espace-form.component';


const routes: Routes =  [
  { path: '', component: HomeComponent },
  
  { path: 'user-sigin-in', component: LoginUtilisateurComponent },
  { path: 'partner-sign-in', component:  LoginPartenaireComponent },
  { path: 'user-search', component: SearchComponent },
  { path: 'partner-sign-up', component:  RegistrePartenaireComponent },
  { path: 'user-sign-up', component:  RegistreUtilisateurComponent },
  { path: 'user/contact', component: ContactComponent },
  { path: 'user/photo', component: PhotoComponent },
  { path: 'partner/details/:id', component: DetailsComponent },
  { path: 'user/historique', component: HistoriqueUtilisateurComponent },
  { path: 'user/espace/:id/:nomEspace', component: FormulaireComponent },
  { path: 'partner/crud', component: CrudresponsableComponent },
  { path: 'coworkspaces', component: CoworkspaceFormComponent },
  { path: 'partner/autorisation', component: ListeReservationComponent },
  { path: 'partner/espace', component: EspaceFormComponent },
  { path: 'partner/coworkspace', component: CoworkspaceFormComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
