import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceFormComponent } from './espace-form.component';

describe('EspaceFormComponent', () => {
  let component: EspaceFormComponent;
  let fixture: ComponentFixture<EspaceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EspaceFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspaceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
