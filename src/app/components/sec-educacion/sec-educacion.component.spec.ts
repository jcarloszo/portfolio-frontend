import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecEducacionComponent } from './sec-educacion.component';

describe('SecEducacionComponent', () => {
  let component: SecEducacionComponent;
  let fixture: ComponentFixture<SecEducacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecEducacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecEducacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
