import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerAuthComponent } from './partner-auth.component';

describe('PartnerAuthComponent', () => {
  let component: PartnerAuthComponent;
  let fixture: ComponentFixture<PartnerAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PartnerAuthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartnerAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
