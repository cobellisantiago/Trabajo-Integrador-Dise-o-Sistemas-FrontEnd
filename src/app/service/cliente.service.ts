import { map } from 'rxjs/operators';
import { Cliente } from './../model/cliente';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = 'http://localhost:8080/api/cliente';  // URL to web api

  constructor(private http: HttpClient) { }

  getCliente(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Cliente>(url).pipe(map(any => {
      let cliente = new Cliente(any);
      return cliente;
    }));
 }
}
