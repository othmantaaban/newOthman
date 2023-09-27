import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PfePage } from './pfe.page';

describe('PfePage', () => {
  let component: PfePage;
  let fixture: ComponentFixture<PfePage>;

  beforeEach(waitForAsync () => {
    fixture = TestBed.createComponent(PfePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
