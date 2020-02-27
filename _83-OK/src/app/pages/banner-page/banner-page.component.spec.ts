import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerPageComponent } from './banner-page.component';

describe('BannerComponent', () => {
  let component: BannerPageComponent;
  let fixture: ComponentFixture<BannerPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
