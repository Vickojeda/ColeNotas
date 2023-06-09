import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) { }

  config = {
    headers: {
      apikey: "f82779ddfbf8ccd5f1d48cc4986fd2d9",
      "Access-Control-Allow-Origin": "*"
    },
  };

  url = `https://restcountries.com/v3.1/alpha/cl`;


  getUbicacion() {
    return this.http.get(this.url, { headers: this.config.headers });
  }

}
