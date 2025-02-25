import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistreUtilisateurComponent } from './registre-utilisateur.component';

describe('RegistreUtilisateurComponent', () => {
  let component: RegistreUtilisateurComponent;
  let fixture: ComponentFixture<RegistreUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistreUtilisateurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistreUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
