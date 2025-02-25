import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginUtilisateurComponent } from './login-utilisateur.component';

describe('LoginUtilisateurComponent', () => {
  let component: LoginUtilisateurComponent;
  let fixture: ComponentFixture<LoginUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginUtilisateurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
