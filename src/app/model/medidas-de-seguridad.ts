export class MedidasDeSeguridad {

    id: number;
    alarma: boolean;
    seGuardaEnGarage: boolean;
    rastreo: boolean;
    tuercasAntirobo: boolean;

    constructor(any){
        this.id = any.idMedidasDeSeguridad;
        this.alarma = any.alarma;
        this.seGuardaEnGarage = any.seGuardaEnGarage;
        this.rastreo = any.rastreo;
        this.tuercasAntirobo = any.tuercasAntirobo;
       
    }
}
