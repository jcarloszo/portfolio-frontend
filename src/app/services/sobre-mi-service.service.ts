import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SobreMi } from '../models/SobreMi';
import { uriApi } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class SobreMiServiceService {
  constructor(private http: HttpClient) { }

  reqheaders : HttpHeaders | undefined;

  GetInfo(){
    return this.http.get<SobreMi>(uriApi + "/sobremi");
  }

  UpdateInfo(body: any, token: any){
    const authroizationToken = 'Bearer '.concat(token);
    let headers = new HttpHeaders()
    headers=headers.set('Authorization', authroizationToken)
       
    return this.http.put<any>(uriApi + "/sobremi/editar", body, { 'headers': headers });
  }
}
