import { Modelo } from "./../model/modelo";
import { Marca } from "./../model/marca";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AñoVehiculo } from "../model/año-vehiculo";

@Injectable({
  providedIn: "root"
})
export class AutomovilService {
  private apiUrl = "http://localhost:8080/api"; // URL to web api

  constructor(private http: HttpClient) {}

  getAllMarca(): Observable<any> {
    const url = `${this.apiUrl}/marcas`;
    return this.http.get<Marca[]>(url).pipe(
      map(any => {
        let marcas: Marca[];
        console.log(any);

        if (any == undefined) {
          return undefined;
        }
        marcas = [];
        for (let marc of any) {
          let marca = new Marca(marc);
          marcas.push(marca);
        }
        console.log(marcas);

        return marcas;
      })
    );
  }
  getModelo(id: number): Observable<any> {
    const url = `${this.apiUrl}/modelo?id=${id}`;
    return this.http.get<Modelo>(url).pipe(
      map(any => {
        if (any == undefined) {
          return undefined;
        }

        let modelo = new Modelo(any);
        this.getMarca(modelo.idMarca).subscribe(
          brand => {
            modelo.marca = brand;
          },
          error => {
            console.log("No se puede obtener la marca");
          }
        );
        console.log(any);

        return modelo;
      })
    );
  }
  getMarca(id: number): Observable<any> {
    const url = `${this.apiUrl}/marca?id=${id}`;
    return this.http.get<Marca>(url).pipe(
      map(any => {
        if (any == undefined) {
          return undefined;
        }

        let marca = new Marca(any);
        console.log(any);

        return marca;
      })
    );
  }

  getAllModelo(idMarca: number): Observable<any> {
    const url = `${this.apiUrl}/marca/${idMarca}/modelo`;
    return this.http.get<Modelo[]>(url).pipe(
      map(any => {
        let modelos: Modelo[];
        console.log(any);

        if (any == undefined) {
          return undefined;
        }
        modelos = [];
        for (let model of any) {
          let modelo = new Modelo(model);
          this.getMarca(modelo.idMarca).subscribe(
            marca => {
              modelo.marca = marca;
            },
            error => {
              console.log("No se puede obtener la marca");
            }
          );

          modelos.push(modelo);
        }
        console.log(modelos);

        return modelos;
      })
    );
  }

  getAllAño(idModelo: number): Observable<any> {
    const url = `${this.apiUrl}/modelo/${idModelo}/aniosFabricacion`;
    return this.http.get<AñoVehiculo[]>(url).pipe(
      map(any => {
        let añosFabricacion: AñoVehiculo[];
        console.log(any);

        if (any == undefined) {
          return undefined;
        }
        añosFabricacion = [];
        for (let anio of any) {
          let año = new AñoVehiculo(anio);
          añosFabricacion.push(año);
        }
        console.log(añosFabricacion);

        return añosFabricacion;
      })
    );
  }
}
