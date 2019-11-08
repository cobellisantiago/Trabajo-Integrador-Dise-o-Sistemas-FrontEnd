import { Provincia } from './provincia';
export class Localidad {

    id: number;
    nombre: string;
    porcentajeRobo: number;
    Provincia: Provincia;

    constructor(any){

        this.id = any.idLocalidad;
        this.nombre = any.nombre;
        this.porcentajeRobo = any.porcentajeRobo;
        this.Provincia = any.provincia;
    }
}
