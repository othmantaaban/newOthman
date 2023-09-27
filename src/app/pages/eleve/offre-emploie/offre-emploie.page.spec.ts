import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { OffreEmploiePage } from './offre-emploie.page';

describe('OffreEmploiePage', () => {
  let component: OffreEmploiePage;
  let fixture: ComponentFixture<OffreEmploiePage>;

  beforeEach(waitForAsync () => {
    fixture = TestBed.createComponent(OffreEmploiePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
