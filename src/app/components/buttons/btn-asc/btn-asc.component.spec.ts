import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnAscComponent } from './btn-asc.component';

describe('BtnAscComponent', () => {
  let component: BtnAscComponent;
  let fixture: ComponentFixture<BtnAscComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnAscComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnAscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
