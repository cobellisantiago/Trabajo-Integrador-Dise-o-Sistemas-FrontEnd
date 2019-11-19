export class Cuota {

    id: number;
    numeroCuota: number;
    fechaDeVencimiento: Date;
    valorActual: number;
    valorOriginal: number;

   // Pago pago;  VERIFICAR SI ES NECESARIO DESDE EL FRENTE

  //  Poliza poliza;

  constructor(any){

    this.id = any.idCouta;
    this.numeroCuota = any.numeroCuota;
    this.fechaDeVencimiento = any.fechaDeVencimiento;
    this.valorActual = any.valorActual;
    this.valorOriginal = any.valorOriginal;
    
  }

}
