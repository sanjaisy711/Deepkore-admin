import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewsletterModalComponent } from './add-newsletter-modal.component';

describe('AddNewsletterModalComponent', () => {
  let component: AddNewsletterModalComponent;
  let fixture: ComponentFixture<AddNewsletterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewsletterModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewsletterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
