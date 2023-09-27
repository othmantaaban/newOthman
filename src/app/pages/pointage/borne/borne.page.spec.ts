import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BornePage } from './borne.page';

describe('BornePage', () => {
  let component: BornePage;
  let fixture: ComponentFixture<BornePage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(BornePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
