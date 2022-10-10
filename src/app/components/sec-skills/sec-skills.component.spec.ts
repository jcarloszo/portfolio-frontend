import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecSkillsComponent } from './sec-skills.component';

describe('SecSkillsComponent', () => {
  let component: SecSkillsComponent;
  let fixture: ComponentFixture<SecSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecSkillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
