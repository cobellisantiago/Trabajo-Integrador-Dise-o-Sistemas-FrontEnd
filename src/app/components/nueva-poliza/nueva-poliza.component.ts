import { PolizaService } from "./../../service/poliza.service";
import { MedidasDeSeguridadService } from "./../../service/medidas-de-seguridad.service";
import { SelectionModel } from "@angular/cdk/collections";
import { AgregarHijoComponent } from "./../agregar-hijo/agregar-hijo.component";
import { MedidasDeSeguridad } from "./../../model/medidas-de-seguridad";
import { StateService } from "./../../state.service";
import { Poliza } from "./../../model/poliza";
import { Hijo } from "./../../model/hijo";
import { Router } from "@angular/router";
import { Modelo } from "./../../model/modelo";
import { AutomovilService } from "./../../service/automovil.service";
import { Marca } from "./../../model/marca";
import { Localidad } from "./../../model/localidad";
import { Provincia } from "./../../model/provincia";
import { ClienteService } from "./../../service/cliente.service";
import { DomicilioService } from "./../../service/domicilio.service";
import { Cliente } from "./../../model/cliente";
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
  NgForm,
  AbstractControl,
  ValidatorFn
} from "@angular/forms";
import { Domicilio } from "src/app/model/domicilio";
import { AñoVehiculo } from "src/app/model/año-vehiculo";
import {
  ErrorStateMatcher,
  MatDialog,
  MatDialogConfig,
  MatTableDataSource
} from "@angular/material";
import { BuscarClienteComponent } from "../buscar-cliente/buscar-cliente.component";

export function patenteValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
}

@Component({
  selector: "app-nueva-poliza",
  templateUrl: "./nueva-poliza.component.html",
  styleUrls: ["./nueva-poliza.component.css"]
})
export class NuevaPolizaComponent implements OnInit {
  //nuevaPoliza: Poliza;
  cliente: Cliente;
  domicilio: String;
  provincias: Provincia[];
  localidades: Localidad[];
  marcas: Marca[];
  modelos: Modelo[];
  anios: AñoVehiculo[];
  hijos: Hijo[];
  cantidadHijos: number;
  sumaAsegurada: number;
  siniestros: string;
  siniestrosValores: string[] = ["1 (uno)", "2 (dos)", ">3 (tres o mas)"];
  medidasSeguridad: MedidasDeSeguridad;

  sexoSelected: string[] = [];
  estadoCivilSelected: string[] = [];
  fechaNacimientoSelected: Date;
  today = new Date();
  startDate = new Date(2001, 0, 1);
  maxDate = new Date(
    this.today.getFullYear() - 18,
    this.today.getMonth(),
    this.today.getUTCDate() - 1
  );
  minDate = new Date(
    this.today.getFullYear() - 30,
    this.today.getMonth(),
    this.today.getUTCDate()
  );

  polizaForm: FormGroup;

  clienteSeleccionado: Cliente;

  displayedColumns: string[] = ["weight", "symbol", "symbol2", "eliminar"];
  dataSource: MatTableDataSource<Hijo>;
  selection = new SelectionModel<Hijo>(false, []);

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
  checkboxLabel(row?: Hijo): string {
    if (!row) {
      return `${this.isAllSelected() ? "select" : "deselect"} all`;
    }
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${
      row.id
    }`;
  }

  constructor(
    private domicilioService: DomicilioService,
    private ClienteService: ClienteService,
    private automovilService: AutomovilService,
    private medidasService: MedidasDeSeguridadService,
    private polizaService: PolizaService,
    private router: Router,
    private stateService: StateService,
    public dialog: MatDialog,
    public diaglogHijo: MatDialog
  ) {}

  ngOnInit() {
    this.showDialog();
    this.hijos = [];
    this.dataSource = new MatTableDataSource(this.hijos);

    this.cantidadHijos = 0;
    this.medidasSeguridad = new MedidasDeSeguridad({
      id: 0,
      seGuardaEnGarage: false,
      rastreo: false,
      alarma: false,
      tuercasAntirobo: false
    });

    this.polizaForm = new FormGroup({
      clienteFormControl: new FormControl(
        { value: this.cliente, disabled: true },
        Validators.required
      ),
      provinciaFormControl: new FormControl("", Validators.required),
      localidadFormControl: new FormControl("", Validators.required),
      marcaFormControl: new FormControl("", Validators.required),
      modeloFormControl: new FormControl("", Validators.required),
      anioFormControl: new FormControl("", Validators.required),
      motorFormControl: new FormControl("", [
        Validators.required,
        Validators.minLength(17)
      ]),
      chasisFormControl: new FormControl("", [
        Validators.required,
        Validators.minLength(17)
      ]),
      patenteFormControl: new FormControl("", [
        Validators.required,
        formatoInvalidoValidator(
          /(^[A-Z][A-Z][A-z][0-9][0-9][0-9]$)|(^[A-Z][A-Z][0-9][0-9][0-9][A-z][A-z]$)/i
        ) // <-- Here's how you pass in the custom validator.
      ]),
      kilometrosFormControl: new FormControl("", [
        Validators.required,
        Validators.max(999999)
      ])
    });

    // let mensaje = this.stateService.getOption();
    // console.log("Cliente recibido en nueva poliza: "+mensaje);

    // this.ClienteService.getCliente(0).subscribe(client => {
    //   this.cliente = client; console.log(this.cliente);
    //   this.domicilio = this.cliente.domicilio.calle + " " + this.cliente.domicilio.numero;
    // },
    //   error => {
    //     console.log("No se puede obtener el cliente");
    //     if (this.cliente == undefined) {
    //       this.polizaForm.controls['clienteFormControl'].setErrors({ 'required': true });
    //     }
    //   });

    this.domicilioService.getAllProvincia().subscribe(
      lista => {
        this.provincias = lista;
      },
      error => {
        console.log("No se pudo cargar las provincias");
      }
    );

    this.automovilService.getAllMarca().subscribe(
      lista => {
        this.marcas = lista;
      },
      error => {
        console.log("No se pudo cargar las marcas");
      }
    );
  }

  showDialog() {
    const dialogRef = this.dialog.open(BuscarClienteComponent, {
      width: "auto",
      height: "auto",
      disableClose: true,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(data => {
      console.log("Dialog output: ", data);
      if (data == undefined) {
        this.polizaForm.controls["clienteFormControl"].setErrors({
          required: true
        });
      } else {
        this.cliente = data;
        this.domicilio =
          this.cliente.domicilio.calle + " " + this.cliente.domicilio.numero;

        this.siniestros = this.siniestrosValores[Math.floor(Math.random() * 3)];
      }

      // this.domicilioService.getDomicilio(this.cliente.idDomicilio).subscribe(dom =>{
      //   this.cliente.domicilio = dom;
      // })
    });
  }

  agregarHijo() {
    const dialogRef = this.diaglogHijo.open(AgregarHijoComponent, {
      width: "auto",
      height: "auto",
      disableClose: true,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(data => {
      console.log("Dialog output: ", data);
      if (data == undefined) {
      } else {
        data.id = this.hijos.length;
        this.hijos.push(data);
        this.dataSource.data = this.hijos;
        console.log(this.hijos);
      }
    });
  }

  confirmar() {
    let nuevaPoliza: Poliza = {
      numeroDePoliza: "",
      fechaInicioVigencia: undefined,
      fechaFinVigencia: undefined,
      fechaDeEmision: new Date(),
      motorVehiculo: this.motorFormControl.value,
      chasisVehiculo: this.chasisFormControl.value,
      sumaAsegurada: this.sumaAsegurada,
      patente: this.patenteFormControl.value,
      kilometrosPorAño: this.kilometrosFormControl.value,
      formaDePago: undefined,
      añoVehiculo: this.anios.find(
        anio => anio.id == this.anioFormControl.value
      ),
      estadoPoliza: undefined,
      cliente: this.cliente,
      modelo: this.modelos.find(
        model => model.id == this.modeloFormControl.value
      ),
      cobertura: undefined,
      cuotas: undefined,
      hijos: this.hijos,
      domicilioDeRiesgo: this.localidades.find(
        localidad => localidad.id == this.localidadFormControl.value
      ),
      idLocalidad: this.localidades.find(
        localidad => localidad.id == this.localidadFormControl.value
      ).id,
      idModelo: this.modelos.find(
        model => model.id == this.modeloFormControl.value
      ).id,
      anioFabricacion: this.anios.find(
        anio => anio.id == this.anioFormControl.value
      ).anio,
      idCobertura: null,
      idCliente: this.cliente.id,
      medidasDeSeguridad: this.medidasSeguridad,
      idMedidasDeSeguridad: undefined,
      numeroDeSiniestros: this.cliente.numeroSiniestrosUltimoAño
    };
    this.medidasService
      .getMedidasSeguridad(
        this.medidasSeguridad.seGuardaEnGarage,
        this.medidasSeguridad.rastreo,
        this.medidasSeguridad.tuercasAntirobo,
        this.medidasSeguridad.alarma
      )
      .then(
        any => {
          nuevaPoliza.idMedidasDeSeguridad = any.id;
        },
        error => {
          console.log("No se puede obtener medidas de seguridad");
        }
      );

    console.log(nuevaPoliza);

    this.stateService.setOption("nuevaPoliza", nuevaPoliza);
    this.router.navigate(["/cobertura"]);
  }
  //Se ejecuta cada vez que la provincia seleccionada cambia
  //Altera la lista de localidades
  selectProvinciaChange(provincia) {
    if (provincia != undefined) {
      this.domicilioService.getAllLocalidad(provincia).subscribe(
        lista => {
          this.localidades = lista;
        },
        error => {
          console.log("No se pudo cargar las localidades");
        }
      );
    }
  }

  //Se ejecuta cada vez que la marca seleccionada cambia
  //Altera la lista de modelos
  selectMarcaChange(marca) {
    if (marca != undefined) {
      console.log(marca);

      this.automovilService.getAllModelo(marca).subscribe(
        lista => {
          this.modelos = lista;
        },
        error => {
          console.log("No se pudo cargar las localidades");
        }
      );
    }
  }

  //Se ejecuta cada vez que el modelo seleccionada cambia
  //Altera la lista de años
  selectModeloChange(modelo) {
    if (modelo != undefined) {
      console.log("Modelo " + modelo);

      this.automovilService.getAllAño(modelo).subscribe(
        lista => {
          this.anios = lista;
        },
        error => {
          console.log("No se pudo cargar los años");
        }
      );
    }
  }

  //Se ejecuta cada vez que el anio seleccionada cambia
  //Altera la suma asegurada
  selectAnioChange(anio) {
    console.log("anio: " + anio);

    if (anio != undefined) {
      this.sumaAsegurada = this.anios.find(
        year => year.id == anio
      ).sumaAsegurada;
    }
  }

  // agregarHijo() {
  //   this.cantidadHijos++;
  //   let hijo: Hijo = {
  //     id: this.cantidadHijos,
  //     fechaDeNacimiento: null,
  //     sexo: null,
  //     estadoCivil: null
  //   };
  //   this.hijos.push(hijo);
  //   console.log(this.hijos);
  // }

  // guardarHijo(i) {
  //   let hijo = this.hijos[i];
  //   hijo.sexo = this.sexoSelected[i];
  //   hijo.estadoCivil = this.estadoCivilSelected[i];

  //   console.log(this.fechaNacimientoSelected);

  //   //hijo.fechaDeNacimiento = this.fechaNacimientoSelected;

  //   console.log(this.hijos);
  // }

  borrarHijo(i) {
    console.log(i);

    let hijo = this.hijos[i];
    console.log(hijo);

    this.hijos = this.hijos.filter(obj => obj.id !== hijo.id);
    console.log("Borre un hijo");
    
  }

  verificarPoliza(event, id) {
    console.log(event);

    if (event != undefined) {
      this.polizaService
        .obtenerPoliza(
          this.motorFormControl.value,
          this.chasisFormControl.value,
          this.patenteFormControl.value
        )
        .then(resultado => {
          console.log(resultado);
          if (resultado == true) {
            // if(id=="motor") this.motorFormControl.setErrors('')
          }
        });
    }
  }

  public customPatternValid(config: any): ValidatorFn {
    return (control: FormControl) => {
      let urlRegEx: RegExp = config.pattern;
      if (control.value && !control.value.match(urlRegEx)) {
        return {
          invalidMsg: config.msg
        };
      } else {
        return null;
      }
    };
  }
  sexo(num: number) {
    return num == 1 ? "Femenino" : "Masculino";
  }
  estado(num: number) {
    switch (num) {
      case 0:
        return "Casado";
      case 1:
        return "Soltero";
      case 2:
        return "Separado";
      case 3:
        return "Divorciado";
      case 4:
        return "Viudo";
    }
  }

  garage(value) {
    this.medidasSeguridad.seGuardaEnGarage = value.checked;
  }

  tracking(value) {
    this.medidasSeguridad.rastreo = value.checked;
  }

  tuercas(value) {
    this.medidasSeguridad.tuercasAntirobo = value.checked;
  }
  alarma(value) {
    this.medidasSeguridad.alarma = value.checked;
  }

  get provinciaFormControl() {
    return this.polizaForm.get("provinciaFormControl");
  }
  get localidadFormControl() {
    return this.polizaForm.get("localidadFormControl");
  }
  get marcaFormControl() {
    return this.polizaForm.get("marcaFormControl");
  }
  get modeloFormControl() {
    return this.polizaForm.get("modeloFormControl");
  }
  get clienteFormControl() {
    return this.polizaForm.get("clienteFormControl");
  }
  get anioFormControl() {
    return this.polizaForm.get("anioFormControl");
  }
  get motorFormControl() {
    return this.polizaForm.get("motorFormControl");
  }
  get chasisFormControl() {
    return this.polizaForm.get("chasisFormControl");
  }
  get kilometrosFormControl() {
    return this.polizaForm.get("kilometrosFormControl");
  }
  get patenteFormControl() {
    return this.polizaForm.get("patenteFormControl");
  }
  // get power() { return this.heroForm.get('power'); }
}

export function formatoInvalidoValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? null : { formatoInvalido: { value: control.value } };
  };
}
