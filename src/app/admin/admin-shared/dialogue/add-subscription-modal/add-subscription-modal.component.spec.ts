import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubscriptionModalComponent } from './add-subscription-modal.component';

describe('AddSubscriptionModalComponent', () => {
  let component: AddSubscriptionModalComponent;
  let fixture: ComponentFixture<AddSubscriptionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubscriptionModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSubscriptionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
