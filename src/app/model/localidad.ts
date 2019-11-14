import { Provincia } from './provincia';
export class Localidad {

    id: number;
    nombre: string;
    porcentajeRobo: number;
    idProvincia: number;
    provincia: Provincia;

    constructor(any){

        this.id = any.idLocalidad;
        this.nombre = any.nombre;
        this.porcentajeRobo = any.porcentajeRobo;
        this.idProvincia = this.idProvincia;
        this.provincia = any.provincia;
    }
}
