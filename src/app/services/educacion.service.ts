import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Educacion } from '../models/Educacion';
import { uriApi } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {

  constructor(private http: HttpClient) { }

  GetEducacions(){
    return this.http.get<Educacion[]>(uriApi + "/educacion/traer");
  }
  
  GetEducacionById(id: any){
    return this.http.get<Educacion>(uriApi + "/educacion/" + id);
  }

  CreateEdu(body: any, token: any){
    const authroizationToken = 'Bearer '.concat(token);
    let headers = new HttpHeaders();
    headers=headers.set('Authorization', authroizationToken)
       
    return this.http.post(uriApi + "/educacion/crear", body, { 'headers': headers });
  }

  EditEdu(id: any, body: any, token: any){
    const authroizationToken = 'Bearer '.concat(token);
    let headers = new HttpHeaders();
    headers=headers.set('Authorization', authroizationToken)

    return this.http.put<Educacion>(uriApi + "/educacion/editar/" + id, body, { 'headers': headers });
  }

  DeleteEdu(id: any, token: any){
    const authroizationToken = 'Bearer '.concat(token);
    let headers = new HttpHeaders();
    headers=headers.set('Authorization', authroizationToken);

    return this.http.delete(uriApi + "/educacion/borrar/" + id, { 'headers': headers });
  }
}