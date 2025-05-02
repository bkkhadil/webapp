import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudresponsableComponent } from './crudresponsable.component';

describe('CrudresponsableComponent', () => {
  let component: CrudresponsableComponent;
  let fixture: ComponentFixture<CrudresponsableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrudresponsableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudresponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
