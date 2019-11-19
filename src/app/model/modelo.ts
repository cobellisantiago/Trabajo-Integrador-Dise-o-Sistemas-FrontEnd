import { Marca } from './marca';
import { AñoVehiculo } from './año-vehiculo';
export class Modelo {

    id: number;
    nombre: string;
    porcentajeRobo: number;
    añosFabricacion: AñoVehiculo[];
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
