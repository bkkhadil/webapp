import { NgModule } from '@angular/core';
import { JwtInterceptor } from '../app/core/jwt.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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







import { GoogleMapsModule } from '@angular/google-maps';
import { FormulaireComponent } from './core/components/formulaire/formulaire.component';
import { CrudresponsableComponent } from './core/components/crudresponsable/crudresponsable.component';

import { HistoriqueUtilisateurComponent } from './core/components/historique-utilisateur/historique-utilisateur.component';
import { ListeReservationComponent } from './core/components/liste-reservation/liste-reservation.component';
import { PhotoComponent } from './core/components/photo/photo.component';
import { CoworkspaceFormComponent } from './core/components/coworkspace-form/coworkspace-form.component';
import { EspaceFormComponent } from './core/components/espace-form/espace-form.component';
import { CommonModule } from '@angular/common';

import { UpdateCoworkzoneComponent } from './core/components/update-coworkzone/update-coworkzone.component';
import { UpdateEspaceComponent } from './core/components/update-espace/update-espace.component';

import { PartnerRegisterComponent } from './auth/partner-register/partner-register.component';
import { UserRegisterComponent } from './auth/user-register/user-register.component';
import { PartnerAuthComponent } from './auth/partner-auth/partner-auth.component';
import { UserAuthComponent } from './auth/user-auth/user-auth.component';

import { ProfileComponent } from './auth/profile/profile.component';
import { ServicesComponent } from './core/components/services/services.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    NavbarComponent,
    FooterComponent,
    ContactComponent,
    DetailsComponent,
   
    FormulaireComponent,
    CrudresponsableComponent,
  
    HistoriqueUtilisateurComponent,
    ListeReservationComponent,
    
    PhotoComponent,
    CoworkspaceFormComponent,
    EspaceFormComponent,
   
    UpdateCoworkzoneComponent,
         UpdateEspaceComponent,
         
         PartnerRegisterComponent,
         UserRegisterComponent,
         PartnerAuthComponent,
         UserAuthComponent,
       
         ProfileComponent,
                  ServicesComponent,
     
   
  ],
  imports: [
    RouterModule.forRoot([]),
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
    DatePipe,  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }