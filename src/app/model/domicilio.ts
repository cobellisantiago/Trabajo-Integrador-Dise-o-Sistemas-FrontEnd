import { Localidad } from './localidad';
export class Domicilio {

    id: number;
    calle: string;
    numero: number;
    piso: number;
    departamento: string;
    codigoPostal: number;
    idLocalidad: number;
    localidad: Localidad;

    constructor(any){
        
        this.id = any.idDomicilio;
        this.calle = any.calle;
        this.numero = any.numero;
        this.piso = any.piso;
        this.departamento = any.departamento;
        this.codigoPostal = any.codigoPostal;
        this.idLocalidad = any.idLocalidad;
        this.localidad = any.Localidad;
    }
}
