import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ParcoursFormPage } from './parcours-form.page';

describe('ParcoursFormPage', () => {
  let component: ParcoursFormPage;
  let fixture: ComponentFixture<ParcoursFormPage>;

  beforeEach(waitForAsync () => {
    fixture = TestBed.createComponent(ParcoursFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
