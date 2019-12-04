import { Cuota } from './../../model/cuota';
import { CuotaService } from './../../service/cuota.service';
import { Cliente } from './../../model/cliente';
import { StateService } from './../../state.service';
import { Poliza } from './../../model/poliza';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmar-poliza',
  templateUrl: './confirmar-poliza.component.html',
  styleUrls: ['./confirmar-poliza.component.css']
})
export class ConfirmarPolizaComponent implements OnInit {

  nuevaPoliza: Poliza;
  cliente: Cliente;
  domicilio: string;
  fechaFin: string;
  fechaInicio: string;
  mensual: Boolean;
  cuotas: Cuota[];

  constructor(private stateService: StateService, private cuotaService: CuotaService) { }

  ngOnInit() {

    let mensaje = this.stateService.getOption('nuevaPoliza');
    console.log(mensaje);
    this.nuevaPoliza = this.stateService.getOption('nuevaPoliza')
    console.log("Nueva poliza: "+this.nuevaPoliza);
    this.cliente = this.nuevaPoliza.cliente;

    this.domicilio = this.cliente.domicilio.calle + this.cliente.domicilio.numero;    
    this.nuevaPoliza.fechaFinVigencia = new Date(this.nuevaPoliza.fechaInicioVigencia);
    this.nuevaPoliza.fechaFinVigencia.setMonth(this.nuevaPoliza.fechaInicioVigencia.getMonth()+6);
    
    this.fechaInicio = this.nuevaPoliza.fechaInicioVigencia.getDay() + "/" + this.nuevaPoliza.fechaInicioVigencia.getMonth() + "/" + this.nuevaPoliza.fechaInicioVigencia.getFullYear();

    this.fechaFin = this.nuevaPoliza.fechaFinVigencia.getDay() + "/" + this.nuevaPoliza.fechaFinVigencia.getMonth() + "/" + this.nuevaPoliza.fechaFinVigencia.getFullYear();

    this.mensual = (this.nuevaPoliza.formaDePago == "mensual") ? true : false;
    console.log("mensual? "+this.mensual);

    this.calcularCuotas();
    
    
  }

  calcularCuotas(){
    
    this.cuotaService.crearCuotas(this.nuevaPoliza.cobertura.id,this.nuevaPoliza.añoVehiculo.id,this.nuevaPoliza.formaDePago).subscribe(lista => { this.cuotas = lista;
    this.cuotas.forEach(cuota => { 
      if(cuota.numeroCuota==1){
        cuota.fechaDeVencimiento = new Date(this.nuevaPoliza.fechaInicioVigencia);
        cuota.fechaDeVencimiento.setDate(cuota.fechaDeVencimiento.getDay()-1);
      }else{
        cuota.fechaDeVencimiento = new Date(this.nuevaPoliza.fechaInicioVigencia);
        cuota.fechaDeVencimiento.setDate(cuota.fechaDeVencimiento.getDay()-1);
        cuota.fechaDeVencimiento.setMonth(cuota.fechaDeVencimiento.getMonth()+cuota.numeroCuota);
      }
      
      
    });

    },
      error => { console.log("no se pudo crear las cuotas");
      });

  }

}
