import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-partenaire',
  standalone: false,
  templateUrl: './login-partenaire.component.html',
  styleUrl: './login-partenaire.component.css'
})
export class LoginPartenaireComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    console.log(this.loginForm.value);
    // Logique de connexion ici
  }

  navigateToEnregistrement() {
    this.router.navigate(['/partner-sign-up']);
  }

  goToEnregistrement() {
    this.router.navigate(['/partner-sign-up']);  
  }
 
}
