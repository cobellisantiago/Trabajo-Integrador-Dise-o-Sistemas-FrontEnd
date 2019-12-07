import { MedidasDeSeguridad } from './../model/medidas-de-seguridad';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: "root"
})
export class MedidasDeSeguridadService {
  private apiUrl = "http://localhost:8080/api/medidas"; // URL to web api

  constructor(private http: HttpClient) {}

  getMedidasSeguridad(
    garage: Boolean,
    tracking: Boolean,
    tuercas: Boolean,
    alarma: Boolean
  ): Promise<MedidasDeSeguridad> {
    let url = `${this.apiUrl}?garage=${garage}&tracking=${tracking}&tuercas=${tuercas}&alarma=${alarma}`;

    return this.http
      .get<any>(url)
      .pipe(
        map(any => {
          if (any == undefined) {
            return any;
          }
          var medidas = new MedidasDeSeguridad(any);
          
          return medidas;
        })
      )
      .toPromise<MedidasDeSeguridad>();
  }


}
