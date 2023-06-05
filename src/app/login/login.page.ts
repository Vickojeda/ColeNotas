import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AnimationController } from "@ionic/angular"

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild("sign", { read: ElementRef, static: true }) sign: ElementRef
  @ViewChild('help', { read: ElementRef }) help: ElementRef;

  constructor(private animationCtrl: AnimationController) {}

   ngAfterViewInit() {
    this.pulseButton()
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
  }

}
