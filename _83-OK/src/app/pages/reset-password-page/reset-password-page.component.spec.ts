import { async, ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD:src/app/pages/reset-password-page/reset-password-page.component.spec.ts
import { ResetPasswordPageComponent } from './reset-password-page.component';

describe('ResetPasswordPageComponent', () => {
  let component: ResetPasswordPageComponent;
  let fixture: ComponentFixture<ResetPasswordPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPasswordPageComponent ]
=======
import { AccountCreatedPageComponent } from './account-created-page.component';

describe('ConfirmMailComponent', () => {
  let component: AccountCreatedPageComponent;
  let fixture: ComponentFixture<AccountCreatedPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountCreatedPageComponent ]
>>>>>>> dev:src/app/pages/register/account-created-page/account-created-page.component.spec.ts
    })
    .compileComponents();
  }));

  beforeEach(() => {
<<<<<<< HEAD:src/app/pages/reset-password-page/reset-password-page.component.spec.ts
    fixture = TestBed.createComponent(ResetPasswordPageComponent);
=======
    fixture = TestBed.createComponent(AccountCreatedPageComponent);
>>>>>>> dev:src/app/pages/register/account-created-page/account-created-page.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
