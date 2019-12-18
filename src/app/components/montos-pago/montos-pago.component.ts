import { CuotaService } from './../../service/cuota.service';
import { PolizaService } from './../../service/poliza.service';
import { MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-montos-pago',
  templateUrl: './montos-pago.component.html',
  styleUrls: ['./montos-pago.component.css']
})
export class MontosPagoComponent implements OnInit {

  total: number;
  vuelto: number;
  monto: number;
  resultado = false;

  constructor(
    public dialogRef: MatDialogRef<MontosPagoComponent>,@Inject(MAT_DIALOG_DATA) public data: any,
    private cuotaService: CuotaService
  ) {}

  ngOnInit() {
    console.log(this.data)
    this.total = this.data.total;
    this.monto = 0;
  }

  calcularVuelto(){

    this.vuelto = this.monto - this.total;
    console.log(this.monto);
    
  }

  cancelar(){
    this.dialogRef.close();
  }

  finalizar() {
    this.cuotaService.registrarPago(this.data.numeroDePoliza,this.data.cuotas).then(
      any => {this.resultado=true;
      console.log(any);
      },
      error => { console.log("No se pudo registrar el pago");
      }
    );
  }

}
