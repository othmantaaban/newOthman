import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { OffresEmploiePage } from './offres-emploie.page';

describe('OffresEmploiePage', () => {
  let component: OffresEmploiePage;
  let fixture: ComponentFixture<OffresEmploiePage>;

  beforeEach(waitForAsync () => {
    fixture = TestBed.createComponent(OffresEmploiePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
