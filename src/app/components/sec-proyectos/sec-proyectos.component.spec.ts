import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecProyectosComponent } from './sec-proyectos.component';

describe('SecProyectosComponent', () => {
  let component: SecProyectosComponent;
  let fixture: ComponentFixture<SecProyectosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecProyectosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecProyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
