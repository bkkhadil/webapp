import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrePartenaireComponent } from './registre-partenaire.component';

describe('RegistrePartenaireComponent', () => {
  let component: RegistrePartenaireComponent;
  let fixture: ComponentFixture<RegistrePartenaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrePartenaireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrePartenaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
