import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BienvenidaPageComponent } from './bienvenida-page.component';

describe('BienvenidaPageComponent', () => {
  let component: BienvenidaPageComponent;
  let fixture: ComponentFixture<BienvenidaPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BienvenidaPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BienvenidaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
