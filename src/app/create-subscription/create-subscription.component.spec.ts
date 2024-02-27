import { ComponentFixture, TestBed } from '@angular/core/testing';

import {createSubscriptionComponent } from './create-subscription.component';

describe('CreateSubscriptionComponent', () => {
  let component: createSubscriptionComponent;
  let fixture: ComponentFixture<createSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [createSubscriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(createSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
