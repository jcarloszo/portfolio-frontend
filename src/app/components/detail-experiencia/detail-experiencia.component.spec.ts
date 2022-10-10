import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailExperienciaComponent } from './detail-experiencia.component';

describe('DetailExperienciaComponent', () => {
  let component: DetailExperienciaComponent;
  let fixture: ComponentFixture<DetailExperienciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailExperienciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailExperienciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
