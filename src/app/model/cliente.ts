import { Domicilio } from './domicilio';
export class Cliente {

    id: number;
    tipoDeDocumento: string;
    numeroDeDocumento: string;
    apellido: string;
    nombre: string;
    numeroSiniestrosUltimoAño: number;
    condicionIVA: string;
    profesion: string;
    añoDeRegistro: number;
    sexo: string;
    fechaDeNacimiento: Date;
    cuil: string;
    correoElectronico: string;
    estadoCivil: string;
    estado: string;
    idDomicilio:  number;
    domicilio: Domicilio;

    constructor(any){ 
        this.id = any.idCliente;
        this.tipoDeDocumento = any.tipoDeDocumento;
        this.numeroDeDocumento = any.numeroDeDocumento;
        this.apellido = any.apellido;
        this.nombre = any.nombre;
        this.numeroSiniestrosUltimoAño = any.numeroSiniestrosUltimoAño;
        this.condicionIVA = any.condicionIVA;
        this.profesion = any.profesion;
        this.añoDeRegistro = any.añoDeRegistro;
        this.sexo = any.sexo;
        this.fechaDeNacimiento = any.fechaDeNacimiento; //OJO CON LA FECHA
        this.cuil = any.cuil;
        this.correoElectronico = any.correoElectronico;
        this.estadoCivil = any.estadoCivil;
        this.estado = any.estado;
        this.idDomicilio = any.idDomicilio;
        this.domicilio = any.domicilio;
        
    }
}
