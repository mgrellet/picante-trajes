import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateRentPage } from './update-rent.page';

describe('UpdateRentPage', () => {
  let component: UpdateRentPage;
  let fixture: ComponentFixture<UpdateRentPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdateRentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
