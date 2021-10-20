import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendeurcardComponent } from './vendeurcard.component';

describe('VendeurcardComponent', () => {
  let component: VendeurcardComponent;
  let fixture: ComponentFixture<VendeurcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendeurcardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendeurcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
