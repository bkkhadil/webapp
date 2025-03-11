import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEspaceComponent } from './update-espace.component';

describe('UpdateEspaceComponent', () => {
  let component: UpdateEspaceComponent;
  let fixture: ComponentFixture<UpdateEspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateEspaceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateEspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
