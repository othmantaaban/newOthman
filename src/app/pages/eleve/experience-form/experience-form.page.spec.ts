import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ExperienceFormPage } from './experience-form.page';

describe('ExperienceFormPage', () => {
  let component: ExperienceFormPage;
  let fixture: ComponentFixture<ExperienceFormPage>;

  beforeEach(waitForAsync () => {
    fixture = TestBed.createComponent(ExperienceFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
