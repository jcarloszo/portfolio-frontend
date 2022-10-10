import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { uriApi } from './utils';
import { RespAuth } from './models/RespAuth';

@Injectable({
  providedIn: 'root'
})


export class AuthService {
 constructor(private http: HttpClient, private router: Router) { }

  header = new HttpHeaders();

  login(email: string, password: string){
    this.header.set('Access-Control-Allow-Origin', '*');
    this.http.post<RespAuth>(uriApi + "/usuario/login", {email: email, password: password}, {headers: this.header}).subscribe(response => {
      if(response.status == "OK"){
        window.location.href = "";
        localStorage.setItem("auth_token", response.token);
      } else {
        alert("Credenciales incorrectas");
      }
    });
  }

  logout(){
    window.location.href = "";
    localStorage.removeItem('auth_token');
  }

  public get logIn(): boolean {
    return localStorage.getItem('auth_token') !== null;
  }
}
