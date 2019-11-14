import { Modelo } from './../model/modelo';
import { Marca } from './../model/marca';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutomovilService {

  private apiUrl = 'http://localhost:8080/api';  // URL to web api

  constructor(private http: HttpClient) { }


  getAllMarca(): Observable<any> {
    const url = `${this.apiUrl}/marca`;
    return this.http.get<Marca[]>(url).pipe(map(any => {
      let marcas: Marca[];
    console.log(any);
    
    if(any == undefined){
      return undefined
    }
    marcas = [];
    for(let marc of any){    
      let marca = new Marca(marc);
      marcas.push(marca)
    };
    console.log(marcas);
    
    return marcas;
    }));
  }

  getAllModelo(idMarca: number): Observable<any> {
    const url = `${this.apiUrl}/marca/${idMarca}/modelo`;
    return this.http.get<Modelo[]>(url).pipe(map(any => {
      let modelos: Modelo[];
    console.log(any);
    
    if(any == undefined){
      return undefined
    }
    modelos = [];
    for(let model of any){    
      let modelo = new Modelo(model);
      modelos.push(modelo)
    };
    console.log(modelos);
    
    return modelos;
    }));
  }

}
