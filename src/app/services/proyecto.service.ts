import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proyecto } from '../models/Proyecto';
import { uriApi } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  constructor(private http: HttpClient) { }

  GetProyectos(){
    return this.http.get<Proyecto[]>(uriApi + "/proyecto/traer");
  }
  
  GetProyectoById(id: any){
    return this.http.get<Proyecto>(uriApi + "/proyecto/" + id);
  }

  CreateProy(body: any, token: any){
    const authroizationToken = 'Bearer '.concat(token);
    let headers = new HttpHeaders();
    headers=headers.set('Authorization', authroizationToken)
       
    return this.http.post(uriApi + "/proyecto/crear", body, { 'headers': headers });
  }

  EditProy(id: any, body: any, token: any){
    const authroizationToken = 'Bearer '.concat(token);
    let headers = new HttpHeaders();
    headers=headers.set('Authorization', authroizationToken)

    return this.http.put<Proyecto>(uriApi + "/proyecto/editar/" + id, body, { 'headers': headers });
  }

  DeleteProy(id: any, token: any){
    const authroizationToken = 'Bearer '.concat(token);
    let headers = new HttpHeaders();
    headers=headers.set('Authorization', authroizationToken);

    return this.http.delete(uriApi + "/proyecto/borrar/" + id, { 'headers': headers });
  }
}
