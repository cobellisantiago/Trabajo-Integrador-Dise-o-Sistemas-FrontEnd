import { DomicilioService } from "./domicilio.service";
import { map, switchMap, flatMap, mergeAll } from "rxjs/operators";
import { Cliente } from "./../model/cliente";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Domicilio } from "../model/domicilio";
import { Response } from "selenium-webdriver/http";

@Injectable({
  providedIn: "root"
})
export class ClienteService {
  private apiUrl = "http://localhost:8080/api/cliente"; // URL to web api

  constructor(
    private http: HttpClient,
    private domicilioService: DomicilioService
  ) {}

  getCliente(id: String): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Cliente>(url).pipe(
      map(any => {
        console.log("Cliente recibidio: " + any);
        let cliente = new Cliente(any);
        this.domicilioService.getDomicilio(any.idDomicilio).subscribe(
          dom => {
            console.log("Domicilio obtenido buscando cliente: " + dom);

            cliente.domicilio = new Domicilio(dom);
          },
          error => {
            console.log("No se puede obtener el domicilio");
          }
        ); //TODO deberia ser un DTOCliente lo que se recibe!!!!

        return cliente;
      })
    );
  }

  getTiposDocumento(): Observable<any> {
    const url = `${this.apiUrl}/tiposDocumento`;
    return this.http.get<String>(url);
  }

  getClientes(
    id: string,
    apellido: string,
    nombre: string,
    tipoDeDocumento: String,
    numeroDeDocumento: number
  ): Observable<any> {
    let url = `${this.apiUrl}?`;
    if (id != undefined) url += `id=${id.toString()}&`;
    if (apellido != undefined) url += `apellido=${apellido}&`;
    if (nombre != undefined) url += `nombre=${nombre}&`;
    if (tipoDeDocumento != undefined)
      url += `tipoDeDocumento=${tipoDeDocumento}&`;
    if (numeroDeDocumento != undefined)
      url += `numeroDeDocumento=${numeroDeDocumento.toString()}&`;
    return this.http.get<any>(url).pipe(
      map(any => {
        // console.log("Cliente recibidio: "+response);
        let clientes: Cliente[];

        if (any == undefined) {
          return undefined;
        }
        clientes = [];
        any.forEach(cliente => {
          clientes.push(new Cliente(cliente));
        });
        clientes.forEach(cliente => {
          this.domicilioService.getDomicilio(cliente.idDomicilio).subscribe(
            dom => {
              console.log("Domicilio obtenido buscando cliente: " + dom);
              cliente.domicilio = new Domicilio(dom);
            },
            error => {
              console.log("No se puede obtener el domicilio");
            }
          ); //TODO deberia ser un DTOCliente lo que se recibe!!!!
        });
        return clientes;
      })
    );
  }
}
