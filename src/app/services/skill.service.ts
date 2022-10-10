import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Skill } from '../models/Skill';
import { uriApi } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(private http: HttpClient) { }

  GetSkills(){
    return this.http.get<Skill[]>(uriApi + "/skill/traer");
  }
  
  GetSkillById(id: any){
    return this.http.get<Skill>(uriApi + "/skill/" + id);
  }

  CreateSkill(body: any, token: any){
    const authroizationToken = 'Bearer '.concat(token);
    let headers = new HttpHeaders();
    headers=headers.set('Authorization', authroizationToken)
       
    return this.http.post(uriApi + "/skill/crear", body, { 'headers': headers });
  }

  EditSkill(id: any, body: any, token: any){
    const authroizationToken = 'Bearer '.concat(token);
    let headers = new HttpHeaders();
    headers=headers.set('Authorization', authroizationToken)

    return this.http.put<Skill>(uriApi + "/skill/editar/" + id, body, { 'headers': headers });
  }

  DeleteSkill(id: any, token: any){
    const authroizationToken = 'Bearer '.concat(token);
    let headers = new HttpHeaders();
    headers=headers.set('Authorization', authroizationToken);

    return this.http.delete(uriApi + "/skill/borrar/" + id, { 'headers': headers });
  }
}
