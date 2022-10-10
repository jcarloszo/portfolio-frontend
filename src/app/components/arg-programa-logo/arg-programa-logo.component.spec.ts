import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArgProgramaLogoComponent } from './arg-programa-logo.component';

describe('ArgProgramaLogoComponent', () => {
  let component: ArgProgramaLogoComponent;
  let fixture: ComponentFixture<ArgProgramaLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArgProgramaLogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArgProgramaLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
