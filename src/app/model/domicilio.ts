import { Localidad } from './localidad';
export class Domicilio {

    id: number;
    calle: string;
    numero: number;
    piso: number;
    departamento: string;
    codigoPostal: number;
    localidad: Localidad;

    constructor(any){
        
        this.id = any.idDomicilio;
        this.calle = any.calle;
        this.piso = any.piso;
        this.departamento = any.departamento;
        this.codigoPostal = any.codigoPostal;
        this.localidad = any.Localidad;
    }
}
