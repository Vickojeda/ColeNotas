import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from '../../services/db.service';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  records: any;
  cursos: any;
  asignaturas: any;
  alumnos: any;
  id_curso: any;
  id_asignatura: any;

  tableHeader: string = 'header-dark';
  tableTheme: string = 'bootstrap-table';

  email:string;
  ubicacion:string;
  constructor(private router: Router, private db: DbService, private animationCtrl: AnimationController) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {email: string};
    this.email = state.email;
  }

   ngOnInit() {

    this.db.getCursosByProfesor(this.email).subscribe(data => {
      this.cursos = data;
    })

    this.db.getAsignaturasByCurso(this.email).subscribe(data => {
      this.asignaturas = data;
    })
  }

  changeTablaPorCurso( event: any ) {
    this.id_curso = event.target.value;
    if(this.id_asignatura) {
      this.db.getNotasAlumnoPorCurso().subscribe(data => {
        this.alumnos = data;
      })
    } 
  }

  changeTablaPorAsignatura( event: any ) {
    this.id_asignatura = event.target.value;
    if(this.id_curso) {
      this.db.getNotasAlumnoPorCurso().subscribe(data => {
        this.alumnos = data;
        
      })
    }
  }

  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    if(root) {
      const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);

      return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
    } 

    return this.animationCtrl
    .create()
    .addElement(baseEl)
    .easing('ease-out')
    .duration(500)
  };

  leaveAnimation = (baseEl: HTMLElement) => {
    if(this && this.enterAnimation(baseEl)) {
      return this.enterAnimation(baseEl).direction('reverse');
    }
    return
  };

}