import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalCardComponent } from './external-card.component';

describe('ExternalCardComponent', () => {
  let component: ExternalCardComponent;
  let fixture: ComponentFixture<ExternalCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExternalCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
