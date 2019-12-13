export class Cuota {

    id: number;
    numeroCuota: number;
    fechaDeVencimiento: Date;
    valorActual: number;
    valorOriginal: number;
    seleccionable: Boolean;

   // Pago pago;  VERIFICAR SI ES NECESARIO DESDE EL FRENTE

  //  Poliza poliza;

  constructor(any){

    this.id = any.id;
    this.numeroCuota = any.numeroCuota;
    if(any.fechaDeVencimiento == undefined){
      this.fechaDeVencimiento = new Date()
    }else{
      this.fechaDeVencimiento = new Date(any.fechaDeVencimiento);
    }
    this.valorActual = any.valorActual;
    this.valorOriginal = any.valorOriginal;
  }

}
