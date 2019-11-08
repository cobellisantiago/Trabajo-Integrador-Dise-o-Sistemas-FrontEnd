import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Domicilio } from '../model/domicilio';

@Injectable({
  providedIn: 'root'
})
export class DomicilioService {

  private apiUrl = 'http://localhost:8080/api/domicilio';  // URL to web api

  constructor(private http: HttpClient) { }

  getDomicilio(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Domicilio>(url).pipe(map(any => {
      let domicilio = new Domicilio(any);
      return domicilio;
    }));
  }
}
