export class Hijo {

    id: number;
    fechaDeNacimiento: Date;
    estadoCivil: string;
    sexo: string;

    constructor(any){
        this.id = any.id;
        this.fechaDeNacimiento = any.fechaDeNacimiento;
        this.sexo = any.sexo;
        this.estadoCivil = any.estadoCivil;
    }
}
