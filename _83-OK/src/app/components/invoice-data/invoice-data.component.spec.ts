import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceDataComponent } from './invoice-data.component';

describe('InvoiceDataComponent', () => {
  let component: InvoiceDataComponent;
  let fixture: ComponentFixture<InvoiceDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
