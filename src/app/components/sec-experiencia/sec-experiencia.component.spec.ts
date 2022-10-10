import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecExperienciaComponent } from './sec-experiencia.component';

describe('SecExperienciaComponent', () => {
  let component: SecExperienciaComponent;
  let fixture: ComponentFixture<SecExperienciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecExperienciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecExperienciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
