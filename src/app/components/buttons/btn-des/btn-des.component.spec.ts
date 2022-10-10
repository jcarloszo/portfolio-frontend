import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnDesComponent } from './btn-des.component';

describe('BtnDesComponent', () => {
  let component: BtnDesComponent;
  let fixture: ComponentFixture<BtnDesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnDesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnDesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
