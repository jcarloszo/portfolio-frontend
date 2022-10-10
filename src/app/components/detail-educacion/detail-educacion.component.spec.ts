import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEducacionComponent } from './detail-educacion.component';

describe('DetailEducacionComponent', () => {
  let component: DetailEducacionComponent;
  let fixture: ComponentFixture<DetailEducacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailEducacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailEducacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
