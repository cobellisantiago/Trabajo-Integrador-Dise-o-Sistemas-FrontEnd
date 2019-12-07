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
}
