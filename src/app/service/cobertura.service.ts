import { Cobertura } from './../model/cobertura';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoberturaService {

  private apiUrl = 'http://localhost:8080/api/coberturas';  // URL to web api

  constructor(private http: HttpClient) { }

  getCobertura(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Cobertura>(url).pipe(map(any => {
      let domicilio = new Cobertura(any);
      return domicilio;
    }));
 }

 getAllCobertura(): Observable<any> {
  const url = this.apiUrl;
  return this.http.get<Cobertura[]>(url).pipe(map(any => {
    let coberturas: Cobertura[];
    console.log(any);
    
    if(any == undefined){
      return undefined
    }
    coberturas = [];
    for(let cob of any){    
      let cobertura = new Cobertura(cob);
      coberturas.push(cobertura)
      
    };
    
    return coberturas;
  }));
}
}
