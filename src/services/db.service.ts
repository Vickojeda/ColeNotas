import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AlumnoCurso } from './alumno_curso';
import { Alumno } from './alumno';
import { Asignatura } from './asignatura';
import { CursoAsignatura } from './curso_asignatura';
import { Curso } from './curso';
import { Evaluacion } from './evaluacion';
import { Nota } from './nota';
import { Profesor } from './profesor';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
  })
export class DbService {
  //private storage: SQLiteObject;
  alumnoCursoList: any = new BehaviorSubject([]);
  alumnoList: any = new BehaviorSubject([]);
  asignaturaList: any = new BehaviorSubject([]);
  cursoAsignaturaList: any = new BehaviorSubject([]);
  cursoList: any = new BehaviorSubject([]);
  evaluacionList: any = new BehaviorSubject([]);
  notaList: any = new BehaviorSubject([]);
  profesorList: any = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private platform: Platform,
    //private sqlite: SQLite,
    private httpClient: HttpClient
    //private sqlPorter: SQLitePorter
  ) {}

  async init() {}

  dbState() {
    return this.isDbReady.asObservable();
  }
  fetchAlumnoCurso(): Observable<AlumnoCurso[]> {
    return this.alumnoCursoList.asObservable();
  }
  fetchAlumno(): Observable<Alumno[]> {
    return this.alumnoList.asObservable();
  }
  fetchAsignatura(): Observable<Asignatura[]> {
    return this.asignaturaList.asObservable();
  }
  fetchCursoAsignatura(): Observable<CursoAsignatura[]> {
    return this.cursoAsignaturaList.asObservable();
  }
  fetchCurso(): Observable<Curso[]> {
    return this.cursoList.asObservable();
  }
  fetchEvaluacion(): Observable<Evaluacion[]> {
    return this.evaluacionList.asObservable();
  }
  fetchNota(): Observable<Nota[]> {
    return this.notaList.asObservable();
  }
  fetchProfesor(): Observable<Profesor[]> {
    return this.profesorList.asObservable();
  }

  getProfesorByEmailAndNombre(mail: string, nombre: string): Observable<Profesor> {
    return this.httpClient.get<Profesor>('assets/mock/profesor.json');
  }

  getCursosByProfesor(mail: string): Observable<Profesor> {
    return this.httpClient.get<Profesor>('assets/mock/cursosPorProfesor.json');
  }

  getAsignaturasByCurso(mail: string): Observable<Profesor> {
    return this.httpClient.get<Profesor>('assets/mock/asignaturasPorCursos.json');
  }

  getNotasAlumnoPorCurso(): Observable<Profesor> {
    return this.httpClient.get<Profesor>('assets/mock/notasAlumnoPorCurso.json');
  }

  getDemo(): Observable<Profesor> {
    return this.httpClient.get<Profesor>('assets/mock/demo.json');
  }
  /*
  getFakeDataProfesor() {
    this.httpClient
      .get('assets/dump.sql', { responseType: 'text' })
      .subscribe((data) => {
        this.sqlPorter
          .importSqlToDb(this.storage, data)
          .then((_: any) => {
            this.getProfesores();
            this.isDbReady.next(true);
          })
          .catch((error: any) => console.error(error));
      });
  }

  getProfesores() {
    return this.storage.executeSql('SELECT * FROM profesor', []).then((res) => {
      let items: Profesor[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id,
            correo: res.rows.item(i).correo,
            nombre: res.rows.item(i).nombre,
            apellido: res.rows.item(i).apellido,
            direccion: res.rows.item(i).direccion,
            pass: res.rows.item(i).pass,
          });
        }
      }
      this.profesorList.next(items);
    });
  }

  // Add
  addProfesor(
    correo: any,
    nombre: any,
    apellido: any,
    direccion: any,
    pass: any
  ) {
    let data = [correo, nombre, apellido, direccion, pass];
    return this.storage
      .executeSql(
        'INSERT INTO profesor (correo, nombre, apellido, direccion, pass) VALUES (?, ?, ?, ?, ?)',
        data
      )
      .then((res: any) => {
        this.getProfesores();
      });
  }

  // Get single object
  getProfesor(correo: any): Promise<Profesor> {
      console.log("Entramos?");
    return this.storage
      .executeSql('SELECT * FROM profesor WHERE correo = ?', [correo])
      .then((res: any) => {
        if(res) {
            console.log("RES existe")
        } else {
            console.log("No existe")
        }
        return {
          id: res.rows.item(0).id,
          correo: res.rows.item(0).correo,
          nombre: res.rows.item(0).nombre,
          apellido: res.rows.item(0).apellido,
          direccion: res.rows.item(0).direccion,
          pass: res.rows.item(0).pass,
        };
      });
  }
  // Update
  updateProfesor(id: any, profesor: Profesor) {
    let data = [
      profesor.correo,
      profesor.nombre,
      profesor.apellido,
      profesor.direccion,
      profesor.pass,
    ];
    return this.storage
      .executeSql(
        `UPDATE profesor SET correo = ?, nombre = ?, apellido = ?, direccion = ?, pass = ? WHERE id = ${id}`,
        data
      )
      .then((data: any) => {
        this.getProfesores();
      });
  }

  // Delete
  deleteProfesor(id: any) {
    return this.storage
      .executeSql('DELETE FROM profesor WHERE id = ?', [id])
      .then((_) => {
        this.getProfesores();
      });
  }

  
  getFakeDataNota() {
    this.httpClient
      .get('assets/dump.sql', { responseType: 'text' })
      .subscribe((data) => {
        this.sqlPorter
          .importSqlToDb(this.storage, data)
          .then((_: any) => {
            this.getNota();
            this.isDbReady.next(true);
          })
          .catch((error: any) => console.error(error));
      });
  }

  getNota() {
    return this.storage.executeSql('SELECT * FROM nota', []).then((res) => {
      let items: Nota[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id,
            nota: res.rows.item(i).nota,
            id_curso: res.rows.item(i).id_curso,
            id_evaluacion: res.rows.item(i).id_evaluacion,
            id_alumno: res.rows.item(i).id_alumno,
          });
        }
      }
      this.notaList.next(items);
    });
  }

  getFakeDataEvaluacion() {
    this.httpClient
      .get('assets/dump.sql', { responseType: 'text' })
      .subscribe((data) => {
        this.sqlPorter
          .importSqlToDb(this.storage, data)
          .then((_: any) => {
            this.getEvaluacion();
            this.isDbReady.next(true);
          })
          .catch((error: any) => console.error(error));
      });
  }

  getEvaluacion() {
    return this.storage
      .executeSql('SELECT * FROM evaluacion', [])
      .then((res: any) => {
        let items: Evaluacion[] = [];
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            items.push({
              id: res.rows.item(i).id,
              descripcion: res.rows.item(i).descripcion,
              id_profesor: res.rows.item(i).id_profesor,
              id_asignatura: res.rows.item(i).id_asignatura,
            });
          }
        }
        this.evaluacionList.next(items);
      });
  }

  getFakeDataCurso() {
    this.httpClient
      .get('assets/dump.sql', { responseType: 'text' })
      .subscribe((data) => {
        this.sqlPorter
          .importSqlToDb(this.storage, data)
          .then((_: any) => {
            this.getCurso();
            this.isDbReady.next(true);
          })
          .catch((error: any) => console.error(error));
      });
  }

  getCurso() {
    return this.storage.executeSql('SELECT * FROM curso', []).then((res) => {
      let items: Curso[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id,
            nombre: res.rows.item(i).nombre,
            id_profesor: res.rows.item(i).id_profesor,
          });
        }
      }
      this.cursoList.next(items);
    });
  }

  
  getFakeDataCursoAsignatura() {
    this.httpClient
      .get('assets/dump.sql', { responseType: 'text' })
      .subscribe((data) => {
        this.sqlPorter
          .importSqlToDb(this.storage, data)
          .then((_: any) => {
            this.getCursoAsignatura();
            this.isDbReady.next(true);
          })
          .catch((error: any) => console.error(error));
      });
  }

  getCursoAsignatura() {
    return this.storage
      .executeSql('SELECT * FROM curso_asignatura', [])
      .then((res: any) => {
        let items: CursoAsignatura[] = [];
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            items.push({
              id: res.rows.item(i).id,
              id_asignatura: res.rows.item(i).id_asignatura,
              id_curso: res.rows.item(i).id_curso,
            });
          }
        }
        this.cursoAsignaturaList.next(items);
      });
  }

  getFakeDataAsignatura() {
    this.httpClient
      .get('assets/dump.sql', { responseType: 'text' })
      .subscribe((data) => {
        this.sqlPorter
          .importSqlToDb(this.storage, data)
          .then((_: any) => {
            this.getAsignatura();
            this.isDbReady.next(true);
          })
          .catch((error: any) => console.error(error));
      });
  }

  getAsignatura() {
    return this.storage
      .executeSql('SELECT * FROM asignatura', [])
      .then((res: any) => {
        let items: Asignatura[] = [];
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            items.push({
              id: res.rows.item(i).id,
              descripcion: res.rows.item(i).descripcion,
              id_profesor: res.rows.item(i).id_profesor,
            });
          }
        }
        this.asignaturaList.next(items);
      });
  }

  getFakeDataAlumno() {
    this.httpClient
      .get('assets/dump.sql', { responseType: 'text' })
      .subscribe((data) => {
        this.sqlPorter
          .importSqlToDb(this.storage, data)
          .then((_: any) => {
            this.getAlumno();
            this.isDbReady.next(true);
          })
          .catch((error: any) => console.error(error));
      });
  }

  getAlumno() {
    return this.storage.executeSql('SELECT * FROM alumno', []).then((res) => {
      let items: Alumno[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id,
            rut: res.rows.item(i).rut,
            nombre: res.rows.item(i).nombre,
            edad: res.rows.item(i).edad,
          });
        }
      }
      this.alumnoList.next(items);
    });
  }

  getFakeDataAlumnoCurso() {
    this.httpClient
      .get('assets/dump.sql', { responseType: 'text' })
      .subscribe((data) => {
        this.sqlPorter
          .importSqlToDb(this.storage, data)
          .then((_: any) => {
            this.getAlumnoCurso();
            this.isDbReady.next(true);
          })
          .catch((error: any) => console.error(error));
      });
  }

  getAlumnoCurso() {
    return this.storage
      .executeSql('SELECT * FROM alumno_curso', [])
      .then((res: any) => {
        let items: AlumnoCurso[] = [];
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            items.push({
              id: res.rows.item(i).id,
              id_alumno: res.rows.item(i).id_alumno,
              id_curso: res.rows.item(i).id_curso,
            });
          }
        }
        this.alumnoCursoList.next(items);
      });
  }
  */
}