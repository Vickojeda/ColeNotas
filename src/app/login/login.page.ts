import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController } from "@ionic/angular"
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { DbService } from '../../services/db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  submitted = false;
  loginForm: FormGroup;
  authError = false;
  authErrorMsg: string;

  @ViewChild("sign", { read: ElementRef, static: true }) sign: ElementRef;
  @ViewChild('help', { read: ElementRef }) help: ElementRef;

  constructor(private animationCtrl: AnimationController, 
    private router:Router, 
    public formBuilder: FormBuilder,
    private db: DbService,
    ) {
   this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngAfterViewInit() {
    this.pulseButton()
  }

  onSubmit(loginData: any) {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    
    this.db.getProfesorByEmailAndNombre(loginData.email, loginData.password).subscribe(data => {
      if(data) {
        this.router.navigate(['./home'], { state: { email: loginData.email, password: loginData.password } })
      }
      else {
        this.authError = true;
        this.authErrorMsg = "reason";
      }
    })

  }

  public pulseButton() {
    const animation = this.animationCtrl
      .create()
      .addElement(this.sign.nativeElement)
      .duration(1500)
      .iterations(Infinity)
      .keyframes([
        { offset: 0, boxShadow: "0 0 0 0 rgba(44, 103, 255, 0.4)" },
        { offset: 0.7, boxShadow: "0 0 0 10px rgba(44, 103, 255, 0)" },
        { offset: 1, boxShadow: "0 0 0 0 rgba(44, 103, 255, 0)" }
      ]);

    animation.play();
  }

  ngOnInit() {}

  get f() {
    return this.loginForm.controls;
  }

}