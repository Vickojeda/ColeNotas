import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from '../../services/db.service';
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
  constructor(private router: Router, private db: DbService) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {email: string};
    this.email = state.email;
  }

   ngOnInit() {

    this.db.getCursosByProfesor(this.email).subscribe(data => {
      console.log(data);
      this.cursos = data;
    })

    this.db.getAsignaturasByCurso(this.email).subscribe(data => {
      console.log(data);
      this.asignaturas = data;
    })
  }

  changeTablaPorCurso( event: any ) {
    console.log(event.target.value);
    this.id_curso = event.target.value;
    if(this.id_asignatura) {
      this.db.getNotasAlumnoPorCurso().subscribe(data => {
        console.log(data);
        this.alumnos = data;
      })
    } 
  }

  changeTablaPorAsignatura( event: any ) {
    console.log(event.target.value);
    this.id_asignatura = event.target.value;
    if(this.id_curso) {
      this.db.getNotasAlumnoPorCurso().subscribe(data => {
        console.log(data);
        this.alumnos = data;
      })
    }
  }

}