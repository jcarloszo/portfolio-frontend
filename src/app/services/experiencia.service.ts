import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Experiencia } from '../models/Experiencia';
import { uriApi } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {

  constructor(private http: HttpClient) { }

  GetExperiencias(){
    return this.http.get<Experiencia[]>(uriApi + "/experiencia/traer");
  }
  
  GetExperienciaById(id: any){
    return this.http.get<Experiencia>(uriApi + "/experiencia/" + id);
  }

  CreateExp(body: any, token: any){
    const authroizationToken = 'Bearer '.concat(token);
    let headers = new HttpHeaders();
    headers=headers.set('Authorization', authroizationToken)
       
    return this.http.post(uriApi + "/experiencia/crear", body, { 'headers': headers });
  }

  EditExp(id: any, body: any, token: any){
    const authroizationToken = 'Bearer '.concat(token);
    let headers = new HttpHeaders();
    headers=headers.set('Authorization', authroizationToken)
    return this.http.put<Experiencia>(uriApi + "/experiencia/editar/" + id, body, { 'headers': headers });
  }

  DeleteExp(id: any, token: any){
    const authroizationToken = 'Bearer '.concat(token);
    let headers = new HttpHeaders();
    headers=headers.set('Authorization', authroizationToken);

    return this.http.delete(uriApi + "/experiencia/borrar/" + id, { 'headers': headers });
  }
}
