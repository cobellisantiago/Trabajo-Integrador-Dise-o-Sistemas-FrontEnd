import { Pais } from './pais';
export class Provincia {

    id: number;
    nombre: string;
    porcentajeRobo: number;
    idPais: number;
    pais: Pais;

    constructor(any){
        this.id = any.idProvincia;
        this.nombre = any.nombre;
        this.porcentajeRobo = any.porcentajeRobo;
        this.idPais = any.idPais;
        this.pais = any.pais;
    }

}
