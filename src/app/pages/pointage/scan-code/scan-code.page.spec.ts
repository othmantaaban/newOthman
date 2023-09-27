import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ScanCodePage } from './scan-code.page';

describe('ScanCodePage', () => {
  let component: ScanCodePage;
  let fixture: ComponentFixture<ScanCodePage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(ScanCodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
