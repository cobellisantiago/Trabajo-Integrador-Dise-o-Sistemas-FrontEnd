import { Cliente } from "./../../model/cliente";
import { PolizaService } from "./../../service/poliza.service";
import { SelectionModel } from "@angular/cdk/collections";
import { Poliza } from "./../../model/poliza";
import { MatDialogRef, MatTableDataSource } from "@angular/material";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-buscar-poliza",
  templateUrl: "./buscar-poliza.component.html",
  styleUrls: ["./buscar-poliza.component.css"]
})
export class BuscarPolizaComponent implements OnInit {
  nombre: String;
  apellido: String;
  polizas: Poliza[];
  numeroPoliza: String;
  estadoSeleccionado: number;
  vigenciaDesde: Date;
  vigenciaHasta: Date;
  marca: number;
  modelo: number;
  patente: String;

  displayedColumns: string[] = [
    "select",
    "numeroCliente",
    "numeroPoliza",
    "apellido",
    "nombre",
    "tipoDocumento",
    "numeroDocumento",
  ];
  dataSource: MatTableDataSource<Poliza>;
  selection = new SelectionModel<Poliza>(false, []);


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Poliza): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.numeroDePoliza}`;
  }

  constructor(
    public dialogRef: MatDialogRef<BuscarPolizaComponent>,
    private polizaService: PolizaService
  ) {}

  ngOnInit() {
    this.polizas = undefined;
    
  }

  buscar() {
    this.polizaService
      .buscarPoliza(
        // this.nombre,
        // this.apellido,
        this.numeroPoliza,
        // this.estadoSeleccionado,
        // this.vigenciaDesde,
        // this.vigenciaHasta,
        // this.marca,
        // this.modelo,
        // this.patente
      )
      .subscribe(
        poliza => {
          this.polizas = [];
          this.polizas.push(poliza);
          console.log(this.polizas);
          this.dataSource = new MatTableDataSource(this.polizas);
        },
        error => {
          console.log("No se puede cargar las polizas: "+error);
        }
      );
    // if(this.id=="")this.id = undefined;
    // if(this.apellido=="")this.apellido = undefined;
    // if(this.nombre=="")this.nombre = undefined;
    // this.clienteServicie.getClientes(this.id,this.apellido,this.nombre,this.tipoDocumento,this.numeroDocumento).subscribe(lista => {
    //   this.clientes = lista;
    //   this.dataSource = new MatTableDataSource(this.clientes);
    //   console.log(this.clientes);
    // },
    // error => { console.log("No se puede cargar la poliza buscada");
    // });
  }

  seleccionarPoliza() {
    this.dialogRef.close(this.selection.selected[0]);
  }
}
