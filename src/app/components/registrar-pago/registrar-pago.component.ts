import { MontosPagoComponent } from './../montos-pago/montos-pago.component';
import { element } from 'protractor';
import { CuotaService } from "./../../service/cuota.service";
import { MatTableDataSource, MatDialog } from "@angular/material";
import { SelectionModel } from "@angular/cdk/collections";
import { Cuota } from "./../../model/cuota";
import { Poliza } from "./../../model/poliza";
import { BuscarPolizaComponent } from "./../buscar-poliza/buscar-poliza.component";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-registrar-pago",
  templateUrl: "./registrar-pago.component.html",
  styleUrls: ["./registrar-pago.component.css"]
})
export class RegistrarPagoComponent implements OnInit {
  poliza: Poliza;
  cuotas: Cuota[];
  total: number;
  cuotasId: number[];

  displayedColumns: string[] = [
    "select",
    "numeroCuota",
    "valorActual",
    "valorOriginal"
  ];
  dataSource: MatTableDataSource<Cuota>;
  selection = new SelectionModel<Cuota>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Cuota): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    //Primera cuota
    if(row==this.cuotas[0]){
      let siguiente = this.cuotas.find(cuota => cuota.numeroCuota == (row.numeroCuota+1));
      if(this.selection.isSelected(row)){ //Esta seleccionada
        if(siguiente!=undefined) siguiente.seleccionable = true; //Habilito la cuota siguiente
      }else{
        if(siguiente != undefined) siguiente.seleccionable = false;
        if(this.selection.isSelected(siguiente)){ //La siguiente esta seleccionada
          this.selection.toggle(siguiente); //Desactivo la siguiente
        }
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.numeroCuota}`;
    }else{ //No es la primer cuota
      if(row!=this.cuotas[this.cuotas.length-1]){ //No es la ultima
        let siguiente = this.cuotas.find(cuota => cuota.numeroCuota == (row.numeroCuota+1));
      if(this.selection.isSelected(row)){ //Esta seleccionada
        if(siguiente!=undefined) siguiente.seleccionable = true; //Habilito la cuota siguiente
      }else{
        if(siguiente != undefined) siguiente.seleccionable = false;
        if(this.selection.isSelected(siguiente)){ //La siguiente esta seleccionada
          this.selection.toggle(siguiente); //Desactivo la siguiente
        }
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.numeroCuota}`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.numeroCuota}`;
    }
    
    
  }

  constructor(
    public dialog: MatDialog,
    public diaglogPoliza: MatDialog,
    private cuotaService: CuotaService
  ) {}

  ngOnInit() {
    this.showDialog();
    this.cuotasId = [];
  }

  pagar(){
    this.total=0;
    this.selection.selected.forEach(element => {this.total+=element.valorActual;
    this.cuotasId.push(element.id);
    });
    this.showMontoDialog();
  }

  showMontoDialog() {
    const dialogRef = this.dialog.open(MontosPagoComponent, {
      width: "auto",
      height: "auto",
      disableClose: true,
      autoFocus: true,
      data:{
        total: this.total,
        numeroDePoliza: this.poliza.numeroDePoliza,
        cuotas: this.cuotasId,
      }
    });

    dialogRef.afterClosed().subscribe(data => {
      console.log("Dialog output: ", data);
      if (data == undefined) {
      } else {
     
      }
    });
  }


  showDialog() {
    const dialogRef = this.dialog.open(BuscarPolizaComponent, {
      width: "auto",
      height: "auto",
      disableClose: true,
      autoFocus: true,
    });

    dialogRef.afterClosed().subscribe(data => {
      console.log("Dialog output: ", data);
      if (data == undefined) {
      } else {
        this.poliza = data;
        this.cuotaService.obtenerCuotas(this.poliza.numeroDePoliza).subscribe(
          cuotas => {
            this.cuotas = cuotas;
            console.log(this.cuotas);
            this.dataSource = new MatTableDataSource(this.cuotas);
          },
          error => {
            console.log("No se pudo obtener las cuotas");
          }
        );
      }

      // this.domicilioService.getDomicilio(this.cliente.idDomicilio).subscribe(dom =>{
      //   this.cliente.domicilio = dom;
      // })
    });
  }
}
