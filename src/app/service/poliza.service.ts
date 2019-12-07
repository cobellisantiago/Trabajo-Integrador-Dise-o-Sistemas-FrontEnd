import { AltaPoliza } from './../model/alta-poliza';
import { Observable } from 'rxjs';
import { Hijo } from './../model/hijo';
import { Poliza } from './../model/poliza';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PolizaService {

  private apiUrl = 'http://localhost:8080/api/poliza';  // URL to web api

  constructor(private http: HttpClient) { }

  altaPoliza(nuevaPoliza: Poliza, hijos: Hijo[]): Promise<Poliza> {
    const url = `${this.apiUrl}/new`;
    if(nuevaPoliza == undefined){
      console.log("poliza vacia");
    }
    if(hijos==undefined){
      hijos=[];
    }
    let container: AltaPoliza={
      dtoPoliza: nuevaPoliza,
      dtoHijos: hijos,
      dtoMedidasDeSeguridad: undefined
    }
    console.log("Deberia mandar la poliza");
    
    return this.http.post<Poliza>(url,container).pipe(map( any => {
      var apiResponse = any;
      if(!apiResponse) return null;

      let poliza = new Poliza(apiResponse);
      return poliza;
     })
    ).toPromise<Poliza>();
  }
}
