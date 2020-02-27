import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverAccountPageComponent } from './recover-account-page.component';

describe('RecoverAccountPageComponent', () => {
  let component: RecoverAccountPageComponent;
  let fixture: ComponentFixture<RecoverAccountPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecoverAccountPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoverAccountPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
