import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController } from "@ionic/angular"
import { FormGroup, FormBuilder, FormControl } from "@angular/forms"

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formData:FormGroup;

  @ViewChild("sign", { read: ElementRef, static: true }) sign: ElementRef;
  @ViewChild('help', { read: ElementRef }) help: ElementRef;

  constructor(private animationCtrl: AnimationController, 
    private router:Router, 
    public formBuilder: FormBuilder) {
   
  }

  ngAfterViewInit() {
    this.pulseButton()
  }

  login() {
    let email = this.formData.value.email
    this.router.navigate(['./home'], { state: { email } })
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

    const loadingAnimation = this.animationCtrl.create()
      .addElement(this.help.nativeElement)
      .duration(1500)
      .iterations(Infinity)
      .fromTo('opacity', '1', '0.1');

    loadingAnimation.play();
    animation.play();
  }

  ngOnInit() {
    this.formData = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

}
