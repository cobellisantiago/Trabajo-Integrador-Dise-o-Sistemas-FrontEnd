export class Cobertura {

    id: number;
    nombre: string;
    descripcion: string;


    constructor(any){

        this.id = any.idCobertura;
        this.nombre = any.nombre;
        this.descripcion = any.descripcion;
    }
}
