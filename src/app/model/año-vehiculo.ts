export class AñoVehiculo {

    id: number;
    anio: number;
    sumaAsegurada: number;

    constructor(any){
        this.id = any.id;
        this.anio = any.año;
        this.sumaAsegurada = any.sumaAsegurada;
    }
}
