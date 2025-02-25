import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common'; 
import { AppComponent } from './app.component';
import { HomeComponent } from './core/components/home/home.component';
import { SearchComponent } from './core/components/search/search.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ContactComponent } from './shared/components/contact/contact.component';
import { DetailsComponent } from './core/components/details/details.component';
import { LoginUtilisateurComponent } from './core/components/login-utilisateur/login-utilisateur.component';
import { LoginPartenaireComponent } from './core/components/login-partenaire/login-partenaire.component';
import { RegistrePartenaireComponent } from './core/components/registre-partenaire/registre-partenaire.component';
import { RegistreUtilisateurComponent } from './core/components/registre-utilisateur/registre-utilisateur.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { FormulaireComponent } from './core/components/formulaire/formulaire.component';
import { CrudresponsableComponent } from './core/components/crudresponsable/crudresponsable.component';

import { HistoriqueUtilisateurComponent } from './core/components/historique-utilisateur/historique-utilisateur.component';
import { ListeReservationComponent } from './core/components/liste-reservation/liste-reservation.component';
import { PhotoComponent } from './core/components/photo/photo.component';
import { CoworkspaceFormComponent } from './core/components/coworkspace-form/coworkspace-form.component';
import { EspaceFormComponent } from './core/components/espace-form/espace-form.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    NavbarComponent,
    FooterComponent,
    ContactComponent,
    DetailsComponent,
    LoginUtilisateurComponent,
    LoginPartenaireComponent,
    RegistrePartenaireComponent,
    RegistreUtilisateurComponent,
    FormulaireComponent,
    CrudresponsableComponent,
  
    HistoriqueUtilisateurComponent,
    ListeReservationComponent,
    
    PhotoComponent,
    CoworkspaceFormComponent,
    EspaceFormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    AppRoutingModule,
    GoogleMapsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [
    DatePipe, // Ajoutez DatePipe ici
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }