import { Marca } from './marca';
export class Modelo {

    id: number;
    nombre: string;
    porcentajeRobo: number;
    añosFabricacion: number[];
    idMarca: number;
    marca: Marca;

    constructor(any){

        this.id = any.idModelo;
        this.nombre = any.nombre;
        this.porcentajeRobo = any.porcentajeRobo;
        this.añosFabricacion = any.añosFabricacion;
        this.idMarca = any.idMarca
        this.marca = any.marca;
    }
}
