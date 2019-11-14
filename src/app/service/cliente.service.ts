import { DomicilioService } from './domicilio.service';
import { map, switchMap, flatMap, mergeAll } from 'rxjs/operators';
import { Cliente } from './../model/cliente';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Domicilio } from '../model/domicilio';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = 'http://localhost:8080/api/cliente';  // URL to web api

  constructor(private http: HttpClient, private domicilioService: DomicilioService) { }

  getCliente(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Cliente>(url).pipe(map( any => {
      console.log(any);
      let cliente = new Cliente(any);
      this.domicilioService.getDomicilio(any.idDomicilio).subscribe(dom =>{cliente.domicilio = new Domicilio(dom)},
        error => {console.log("No se puede obtener el domicilio");
        }); //TODO deberia ser un DTOCliente lo que se recibe!!!!
      
      
      return cliente;
    }));
  }
}
