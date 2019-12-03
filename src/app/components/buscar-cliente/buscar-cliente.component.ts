import { StateService } from './../../state.service';
import { Cliente } from './../../model/cliente';
import { ClienteService } from './../../service/cliente.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatTableDataSource, MatDialogRef } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';



@Component({
  selector: 'app-buscar-cliente',
  templateUrl: './buscar-cliente.component.html',
  styleUrls: ['./buscar-cliente.component.css']
})

export class BuscarClienteComponent implements OnInit {

  tiposDocumento: String[];
  clientes: Cliente[];

  id: number;
  nombre: string;
  apellido: string;
  tipoDocumento: string;
  numeroDocumento: number;
  clienteSeleccionado: Cliente;

  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol','symbol2'];
  dataSource: MatTableDataSource<Cliente>;
  selection = new SelectionModel<Cliente>(false, []);

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
  checkboxLabel(row?: Cliente): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }

  constructor( public dialogRef: MatDialogRef<BuscarClienteComponent>,private clienteServicie: ClienteService) { }

     

  ngOnInit() {

  this.clienteServicie.getTiposDocumento().subscribe(lista => { this.tiposDocumento = lista; },
    error => {
      console.log("No se pudo cargar los tipos de documento");
    });

  

  }

  buscar(){
    if(this.apellido=="")this.apellido = undefined;
    if(this.nombre=="")this.nombre = undefined;
    
    this.clienteServicie.getClientes(this.id,this.apellido,this.nombre,this.tipoDocumento,this.numeroDocumento).subscribe(lista => {
      this.clientes = lista;
      this.dataSource = new MatTableDataSource(this.clientes);
      console.log(this.clientes);
      
  },
  error => { console.log("No se puede cargar la lista de clientes");
  });
  }

  seleccionarCliente(){
    this.dialogRef.close(this.selection.selected[0]);
  }

}
