import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceRegisterComponent } from './invoice-register.component';

describe('InvoiceRegisterComponent', () => {
  let component: InvoiceRegisterComponent;
  let fixture: ComponentFixture<InvoiceRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceRegisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvoiceRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
