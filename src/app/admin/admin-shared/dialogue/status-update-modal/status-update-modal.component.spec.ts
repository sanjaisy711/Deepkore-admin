import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusUpdateModalComponent } from './status-update-modal.component';

describe('StatusUpdateModalComponent', () => {
  let component: StatusUpdateModalComponent;
  let fixture: ComponentFixture<StatusUpdateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusUpdateModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
