import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnAddComponent } from './btn-add.component';

describe('BtnAddComponent', () => {
  let component: BtnAddComponent;
  let fixture: ComponentFixture<BtnAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
