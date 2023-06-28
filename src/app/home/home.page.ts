import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  email:string;
  ubicacion:string;
  constructor(private router: Router, private apiService: ApiServiceService) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {email: string};
    this.email = state.email;
    this.getUbicacion();
  }

   ngOnInit() {
  }

  getUbicacion(){

    this.apiService.getUbicacion().subscribe({
      next: (res: any) => {
        console.log(res[0]);
        
        this.ubicacion = res[0].name.common;

      },
      error: (error: any) => {

      }
    })
  }

}

