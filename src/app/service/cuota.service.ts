import { Cuota } from "./../model/cuota";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class CuotaService {
  private apiUrl = "http://localhost:8080/api";

  constructor(private http: HttpClient) {}

  crearCuotas(
    idCobertura: number,
    idAnio: number,
    formaDePago: string
  ):Promise<any> {
    const url = `${this.apiUrl}/poliza/cuotas?idCobertura=${idCobertura}&idAnioModelo=${idAnio}&formaDePago=${formaDePago}`;
    return this.http.get<Cuota[]>(url).pipe(
      map(any => {
        let cuotas: Cuota[];

        if (any == undefined) {
          return undefined;
        }
        cuotas = [];
        any.forEach(cuote => {
          var cuota = new Cuota(cuote);
          cuotas.push(cuota);
        });
        return cuotas;
      })
    ).toPromise();
  }

  obtenerCuotas(numeroDePoliza: String): Observable<any>{
    let url = `${this.apiUrl}/pago/cuotas?numeroDePoliza=${numeroDePoliza}`;
    return this.http.get<Cuota[]>(url).pipe(
      map(any => {
        let cuotas: Cuota[];

        if (any == undefined) {
          return undefined;
        }
        cuotas = [];
        any.forEach(cuote => {
          var cuota = new Cuota(cuote);
          cuota.seleccionable=false;
          cuotas.push(cuota);
        });
        cuotas[0].seleccionable=true;
        return cuotas;
      })
    );
  }

  registrarPago(numeroDePoliza: String, cuotas: number[]): Observable<any>{
    let url = `${this.apiUrl}/pago/registrar`;
    let pago = {
      numeroDePoliza: numeroDePoliza,
      cuotasId: cuotas
    }

    return this.http.post<any>(url,pago).pipe(map(
      any => {
        return any;
      }
    ))
  }
}