import { ComponentFixture, TestBed, async, fakeAsync, flush, tick } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { DbService } from '../../services/db.service';
import { delay, of } from 'rxjs';

const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
const loginServiceSpy = jasmine.createSpyObj('DbService', ['getProfesorByEmailAndNombre']);
let loginServiceMock = {
  getProfesorByEmailAndNombre: of({} as Event),
};
const testUserData = {
  id: 1,
  correo: "profesor@test.cl",
  nombre: "Victoria",
  apellido: "Ojeda",
  direccion: "congui",
  pass: "profesor"
}

describe('Login Component Isolated Test', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  const validUser = {
    email: 'vaoc85@hotmail.com',
    password: '123456'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule 
      ],
      declarations: [
        LoginPage
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  function updateForm(userEmail: string, userPassword: string) {
    component.loginForm.controls['email'].setValue(userEmail);
    component.loginForm.controls['password'].setValue(userPassword);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('component initial state', () => {
    expect(component.submitted).toBeFalsy();
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.invalid).toBeTruthy();
    expect(component.authError).toBeFalsy();
    expect(component.authErrorMsg).toBeUndefined();
  });

  it('submitted should be true when onSubmit()', () => {
    component.onSubmit({
      email: '',
      password: ''
    });
    expect(component.submitted).toBeTruthy();
    expect(component.authError).toBeFalsy();
  });

  it('form value should update from when u change the input', (() => {
    updateForm(validUser.email, validUser.password);
    expect(component.loginForm.value).toEqual(validUser);
  }));

});

describe('Login Component Shallow Test', () => { 
  let fixture: ComponentFixture<LoginPage>;

  function updateForm(userEmail: string, userPassword: string) {
    fixture.componentInstance.loginForm.controls['email'].setValue(userEmail);
    fixture.componentInstance.loginForm.controls['password'].setValue(userPassword);
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule,
        IonicModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule
      ],
      declarations: [
        LoginPage
      ],
      providers: [
        FormBuilder
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(LoginPage);
  }));

  it('created a form with email and password input and login button', () => {
    const usernameContainer = fixture.debugElement.nativeElement.querySelector('#email');
    const passwordContainer = fixture.debugElement.nativeElement.querySelector('#password');
    const loginBtnContainer = fixture.debugElement.nativeElement.querySelector('#sign');
    expect(usernameContainer).toBeDefined();
    expect(passwordContainer).toBeDefined();
    expect(loginBtnContainer).toBeDefined();
  });

  it('Display email Error Msg when email is blank', async () => {
    updateForm('', '123');
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('#sign');
    await button.click();
    fixture.detectChanges();

    const emailErrorMsg = fixture.debugElement.nativeElement.querySelector('#blank-email-error');
    expect(emailErrorMsg).toBeDefined();
  });

  it('Display Password Error Msg when pass is blank', async() => {
    updateForm('vaoc', '');
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('#sign');
    await button.click();
    fixture.detectChanges();

    const passwordErrorMsg = fixture.debugElement.nativeElement.querySelector('#blank-password-error');
    expect(passwordErrorMsg).toBeDefined();
  });
})


