import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeeklyPage } from './weekly.page';

describe('WeeklyPage', () => {
  let component: WeeklyPage;
  let fixture: ComponentFixture<WeeklyPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WeeklyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
