import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullPageLayoutComponent } from './full-page-layout.component';

describe('ExternalLayoutComponent', () => {
  let component: FullPageLayoutComponent;
  let fixture: ComponentFixture<FullPageLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullPageLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullPageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
