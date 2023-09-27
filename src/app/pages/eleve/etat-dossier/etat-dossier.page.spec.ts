import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { EtatDossierPage } from './etat-dossier.page';

describe('EtatDossierPage', () => {
  let component: EtatDossierPage;
  let fixture: ComponentFixture<EtatDossierPage>;

  beforeEach(waitForAsync () => {
    fixture = TestBed.createComponent(EtatDossierPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
