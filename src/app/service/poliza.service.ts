import { AutomovilService } from "./automovil.service";
import { ClienteService } from "./cliente.service";
import { AltaPoliza } from "./../model/alta-poliza";
import { Observable, forkJoin } from "rxjs";
import { Hijo } from "./../model/hijo";
import { Poliza } from "./../model/poliza";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class PolizaService {
  private apiUrl = "http://localhost:8080/api/poliza"; // URL to web api

  constructor(
    private http: HttpClient,
    private clienteService: ClienteService,
    private automovilService: AutomovilService
  ) {}

  altaPoliza(nuevaPoliza: Poliza, hijos: Hijo[]): Promise<Poliza> {
    const url = `${this.apiUrl}/new`;
    if (nuevaPoliza == undefined) {
      console.log("poliza vacia");
    }
    if (hijos == undefined) {
      hijos = [];
    }
    let container: AltaPoliza = {
      dtoPoliza: nuevaPoliza,
      dtoHijos: hijos,
      dtoMedidasDeSeguridad: undefined
    };
    console.log("Deberia mandar la poliza");

    return this.http
      .post<Poliza>(url, container)
      .pipe(
        map(any => {
          var apiResponse = any;
          if (!apiResponse) return null;

          let poliza = new Poliza(apiResponse);
          return poliza;
        })
      )
      .toPromise<Poliza>();
  }

  obtenerPoliza(
    numeroMotor: String,
    numeroChasis: String,
    patente: String
  ): Promise<any> {
    let url = `${this.apiUrl}/vigente?`;
    if (numeroMotor != undefined) url += `numeroMotor=${numeroMotor}&`;
    if (numeroChasis != undefined) url += `numeroChasis=${numeroChasis}&`;
    if (patente != undefined) url += `patente=${patente}`;
    return this.http
      .get(url)
      .pipe(
        map(any => {
          if (any == undefined) return undefined;
          let resultado = any;
          return resultado;
        })
      )
      .toPromise();
  }

  buscarPoliza(
    // nombreCliente: String,
    // apellidoCliente: String,
    numeroPoliza: String
    // estadoSeleccionado: number,
    // vigenciaDesde: Date,
    // vigenciaHasta: Date,
    // marca: number,
    // modelo: number,
    // patente: String
  ): Observable<Poliza> {
    let url = `${this.apiUrl}?numeroPoliza=${numeroPoliza}`;
    // if (nombreCliente != undefined) url += `nombreCliente=${nombreCliente}&`;
    // if (apellidoCliente != undefined)
    //   url += `apellidoCliente=${apellidoCliente}&`;
    // if (estadoSeleccionado != undefined) url += `estado=${estadoSeleccionado}&`;
    // if (vigenciaDesde != undefined) url += `vigenciaDesde=${vigenciaDesde}&`;
    // if (vigenciaHasta != undefined) url += `vigenciaHasta=${vigenciaHasta}&`;
    // if (marca != undefined) url += `marca=${marca}&`;
    // if (modelo != undefined) url += `modelo=${modelo}&`;
    // if (patente != undefined) url += `patente=${patente}`;

    return this.http.get<any>(url).pipe(
      map(any => {
        if (any == undefined) return undefined;
        let poliza: Poliza;
        poliza = new Poliza(any);
        this.clienteService.getCliente(poliza.idCliente).subscribe(
          cliente => {
            poliza.cliente = cliente;
          },
          error => {
            console.log("No se pudo obtener el cliente");
          }
        );
        this.automovilService.getModelo(poliza.idModelo).subscribe(
          model => {
            poliza.modelo = model;
          },
          error => {
            console.log("No se pudo obtener el modelo");
          }
        );
        
        return poliza;
      })
    );
  }
}
