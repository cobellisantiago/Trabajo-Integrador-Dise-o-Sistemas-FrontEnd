import { Cuota } from './../model/cuota';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CuotaService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }


  crearCuotas(idCobertura: number,idAnio: number,formaDePago: string): Observable<any> {
    const url = `${this.apiUrl}/poliza/cuotas?idCobertura=${idCobertura}&idAnioModelo=${idAnio}&formaDePago=${formaDePago}`;
    return this.http.get<Cuota[]>(url).pipe(map(any => {
      let cuotas: Cuota[];
    console.log(any);
    
    if(any == undefined){
      return undefined
    }
    cuotas = [];
    for(let coute of any){    
      let cuota = new Cuota(coute);
      cuotas.push(coute)
    };
    console.log(cuotas);
    
    return cuotas;
    }));
  }

}
