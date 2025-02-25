import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoworkspaceFormComponent } from './coworkspace-form.component';

describe('CoworkspaceFormComponent', () => {
  let component: CoworkspaceFormComponent;
  let fixture: ComponentFixture<CoworkspaceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoworkspaceFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoworkspaceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
