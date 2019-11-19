import { MedidasDeSeguridad } from './medidas-de-seguridad';
import { Cuota } from './cuota';
import { Localidad } from './localidad';
import { Hijo } from './hijo';
import { Cobertura } from './cobertura';
import { Modelo } from './modelo';
import { Cliente } from './cliente';
import { AñoVehiculo } from './año-vehiculo';

export class Poliza {

    numeroDePoliza: string;
    fechaInicioVigencia: Date;
    fechaFinVigencia: Date;
    fechaDeEmision: Date;
    motorVehiculo: string;
    chasisVehiculo: string;
    sumaAsegurada: number;
    patente: string;
    kilometrosPorAño: number;
    formaDePago: string;
    //TODO la clase 
    añoVehiculo: AñoVehiculo;
    estadoPoliza: string;
    //FactoresCaracteristicosOriginarios factoresCaracteristicosOriginarios; Creo que no es necesario tenerlo

    // Me parece inecesario desde el fretne
    //SolicitudDePoliza solicitudDePoliza;

  
    cliente: Cliente;
    modelo: Modelo;

   // Premio premio;
   // Descuentos descuentos;
    medidasDeSeguridad: MedidasDeSeguridad;
    cobertura: Cobertura;
    cuotas: Cuota[];
    hijos: Hijo[];
    domicilioDeRiesgo: Localidad;

    constructor(any){

    this.numeroDePoliza = any.numeroDePoliza;
    this.fechaInicioVigencia = any.fechaInicioVigencia;
    this.fechaFinVigencia = any.fechaFinVigencia;
    this.fechaDeEmision = any.fechaDeEmision;
    this.motorVehiculo = any.motorVehiculo;
    this.chasisVehiculo = any.chasisVehiculo;
    this.sumaAsegurada = any.sumaAsegurada;
    this.patente = any.patente;
    this. kilometrosPorAño = any.kilometrosPorAño;
    this.formaDePago = any.formaDePago;
    this.añoVehiculo = any.añoVehiculo;
    this.estadoPoliza = any.estadoPoliza;
    this.cliente = any.cliente;
    this.modelo = any.modelo;
    this.medidasDeSeguridad = any.medidasDeSeguridad
    this.cobertura = any.cobertura;
    this.cuotas = any.coutas;
    this.hijos = any.hijos;
    this.domicilioDeRiesgo = any.domicilioDeRiesgo;

    }
    
}
