import { Provincia } from './../model/provincia';
import { Pais } from './../model/pais';
import { Localidad } from './../model/localidad';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Domicilio } from '../model/domicilio';

@Injectable({
  providedIn: 'root'
})
export class DomicilioService {

  private apiUrl = 'http://localhost:8080/api/domicilio';  // URL to web api

  constructor(private http: HttpClient) { }

  getDomicilio(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Domicilio>(url).pipe(map(any => {
      let domicilio = new Domicilio(any);
      this.getLocalidad(domicilio.idLocalidad).subscribe(localidad => 
        {domicilio.localidad = localidad},
        error => {console.log("No se puede cargar la localidad");
        })
      return domicilio;
    }));
  }

  
  getLocalidad(id: number): Observable<any> {
    const url = `${this.apiUrl}/localidad/${id}`;
    return this.http.get<Localidad>(url).pipe(map(any => {
      let localidad = new Localidad(any);
      this.getProvincia(localidad.idProvincia).subscribe(
        provincia => {localidad.provincia = provincia;},
        error => {console.log("No se pudo obtener pais");
        }
      )
      return localidad;
    }));
  }

  getProvincia(id: number): Observable<any> {
    const url = `${this.apiUrl}/provincia/${id}`;
    return this.http.get<Provincia>(url).pipe(map(any => {
      let provincia = new Provincia(any);
      this.getPais(provincia.idPais).subscribe(
        pais => {provincia.pais;},
        error => {console.log("No se pudo obtener pais");
        }
      )
      return provincia;
    }));
  }

  getPais(id: number): Observable<any> {
    const url = `${this.apiUrl}/pais/${id}`;
    return this.http.get<Pais>(url).pipe(map(any => {
      let pais = new Pais(any);
      return pais;
    }));
  }

  getAllProvincia(): Observable<any> {
    const url = `${this.apiUrl}/provincia`;
    return this.http.get<Provincia[]>(url).pipe(map(any => {
      let provincias: Provincia[];
      console.log("PROVINCIAS");
      console.log(any);
    
    if(any == undefined){
      return undefined
    }
    provincias = [];
    for(let cob of any){    
      let provincia = new Provincia(cob);
      provincias.push(provincia)
    };
    
    return provincias;
    }));
  }

  getAllLocalidad(idProvincia: number): Observable<any> {
    const url = `${this.apiUrl}/provincia/${idProvincia}/localidad`;
    return this.http.get<Localidad[]>(url).pipe(map(any => {
      let localidades: Localidad[];
    
    if(any == undefined){
      return undefined
    }
    localidades = [];
    for(let loc of any){    
      let localidad = new Localidad(loc);
      localidades.push(localidad)
    };
    return localidades;
    }));
  }
}
