import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCoworkzoneComponent } from './update-coworkzone.component';

describe('UpdateCoworkzoneComponent', () => {
  let component: UpdateCoworkzoneComponent;
  let fixture: ComponentFixture<UpdateCoworkzoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateCoworkzoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCoworkzoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
