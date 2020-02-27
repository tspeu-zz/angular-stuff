import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconsMenuComponent } from './icons-menu.component';

describe('IconsMenuComponent', () => {
  let component: IconsMenuComponent;
  let fixture: ComponentFixture<IconsMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconsMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
