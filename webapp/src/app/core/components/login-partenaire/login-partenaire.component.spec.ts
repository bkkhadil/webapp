import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPartenaireComponent } from './login-partenaire.component';

describe('LoginPartenaireComponent', () => {
  let component: LoginPartenaireComponent;
  let fixture: ComponentFixture<LoginPartenaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPartenaireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginPartenaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
