import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarVendeurComponent } from './toolbar-vendeur.component';

describe('ToolbarVendeurComponent', () => {
  let component: ToolbarVendeurComponent;
  let fixture: ComponentFixture<ToolbarVendeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolbarVendeurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarVendeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
