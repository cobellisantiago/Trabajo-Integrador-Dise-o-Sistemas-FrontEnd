import { PolizaService } from './../../service/poliza.service';
import { Cuota } from "./../../model/cuota";
import { CuotaService } from "./../../service/cuota.service";
import { Cliente } from "./../../model/cliente";
import { StateService } from "./../../state.service";
import { Poliza } from "./../../model/poliza";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-confirmar-poliza",
  templateUrl: "./confirmar-poliza.component.html",
  styleUrls: ["./confirmar-poliza.component.css"]
})
export class ConfirmarPolizaComponent implements OnInit {
  nuevaPoliza: Poliza;
  cliente: Cliente;
  domicilio: string;
  fechaFin: string;
  fechaInicio: string;
  mensual: Boolean;
  cuotas: Cuota[];
  ultimoDiaPago: Date;
  montoTotal: number;
  premio: number;
  descuento: number;

  constructor(
    private stateService: StateService,
    private cuotaService: CuotaService,
    private polizaService: PolizaService
  ) {}

  ngOnInit() {
    this.nuevaPoliza = this.stateService.getOption("nuevaPoliza");
    console.log("Nueva poliza: " + this.nuevaPoliza);
    this.cliente = this.nuevaPoliza.cliente;

    this.domicilio =
      this.cliente.domicilio.calle + this.cliente.domicilio.numero;
    this.nuevaPoliza.fechaFinVigencia = new Date(
      this.nuevaPoliza.fechaInicioVigencia
    );
    this.nuevaPoliza.fechaFinVigencia.setMonth(
      this.nuevaPoliza.fechaInicioVigencia.getMonth() + 6
    );

    this.mensual = this.nuevaPoliza.formaDePago == "mensual" ? true : false;

    this.calcularCuotas();

    this.premio = this.nuevaPoliza.sumaAsegurada * 0.005;
    this.descuento = this.nuevaPoliza.sumaAsegurada * 0.01;
  }

  calcularCuotas() {
    this.cuotaService
      .crearCuotas(
        this.nuevaPoliza.cobertura.id,
        this.nuevaPoliza.añoVehiculo.id,
        this.nuevaPoliza.formaDePago
      )
      .then(
        lista => {
          this.cuotas = [];
          for (let coute of lista) {
            this.cuotas.push(coute);
          }
          this.montoTotal = 0;
          this.cuotas.forEach(cuota => {
            this.montoTotal += cuota.valorActual;
            if (cuota.numeroCuota == 1) {
              cuota.fechaDeVencimiento = new Date(
                this.nuevaPoliza.fechaInicioVigencia
              );
              cuota.fechaDeVencimiento.setDate(
                cuota.fechaDeVencimiento.getDate() - 1
              );
            } else {
              cuota.fechaDeVencimiento = new Date(
                this.nuevaPoliza.fechaInicioVigencia
              );
              cuota.fechaDeVencimiento.setDate(
                cuota.fechaDeVencimiento.getDate() - 1
              );
              cuota.fechaDeVencimiento.setMonth(
                cuota.fechaDeVencimiento.getMonth() + cuota.numeroCuota - 1
              );
            }
          });
          if (this.mensual) {
            this.ultimoDiaPago = this.cuotas.find( cuota => cuota.numeroCuota == 6).fechaDeVencimiento;
          } else {
            this.ultimoDiaPago = this.cuotas.find( cuota => cuota.numeroCuota == 1).fechaDeVencimiento;
          }
          this.montoTotal = this.montoTotal - this.descuento - this.premio;
        },
        error => {
          console.log("no se pudo crear las cuotas");
        }
      );
  }

  guardar(){
    console.log(this.nuevaPoliza);
    this.polizaService.altaPoliza(this.nuevaPoliza,this.nuevaPoliza.hijos).then(pol => {
      console.log(pol);
      
    },
    error => { console.log("error guardando la poliza");
     });
  }
}
