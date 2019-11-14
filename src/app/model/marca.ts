export class Marca {

    id: number;
    nombre: string;
    porcentajeRobo: number;
    
    constructor(any){
        this.id = any.idMarca
        this.nombre = any.nombre;
        this.porcentajeRobo = any.porcentajeRobo;
    }
}
