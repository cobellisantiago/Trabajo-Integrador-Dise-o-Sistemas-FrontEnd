import { Router } from '@angular/router';
import { Modelo } from './../../model/modelo';
import { AutomovilService } from './../../service/automovil.service';
import { Marca } from './../../model/marca';
import { Localidad } from './../../model/localidad';
import { Provincia } from './../../model/provincia';
import { ClienteService } from './../../service/cliente.service';
import { DomicilioService } from './../../service/domicilio.service';
import { Cliente } from './../../model/cliente';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Domicilio } from 'src/app/model/domicilio';

export interface Animal {
  name: string;
  sound: string;
}

@Component({
  selector: 'app-nueva-poliza',
  templateUrl: './nueva-poliza.component.html',
  styleUrls: ['./nueva-poliza.component.css']
})


export class NuevaPolizaComponent implements OnInit{

  cliente: Cliente;
  domicilio: String;
  provincias: Provincia[];
  localidades: Localidad[];
  marcas: Marca[];
  modelos: Modelo[];

  cantidadHijos: boolean[];
  

  polizaForm: FormGroup;
  animalControl = new FormControl('', [Validators.required]);
  selectFormControl = new FormControl('', Validators.required);
  animals: Animal[] = [
    {name: 'Dog', sound: 'Woof!'},
    {name: 'Cat', sound: 'Meow!'},
    {name: 'Cow', sound: 'Moo!'},
    {name: 'Fox', sound: 'Wa-pa-pa-pa-pa-pa-pow!'},
  ];



  constructor(private domicilioService: DomicilioService, private ClienteService: ClienteService, private automovilService: AutomovilService, private router: Router) { } 

  ngOnInit() {

    this.cantidadHijos=[true];
    this.polizaForm = new FormGroup({
      clienteFormControl: new FormControl({value: this.cliente, disabled: true},Validators.required),
      provinciaFormControl: new FormControl('',Validators.required),
      localidadFormControl: new FormControl('',Validators.required),
      marcaFormControl: new FormControl('',Validators.required),
      modeloFormControl: new FormControl('',Validators.required)     
    });
    
    this.ClienteService.getCliente(0).subscribe(client => {
      this.cliente = client; console.log(this.cliente); 
      console.log("Domicilio: "+this.cliente.domicilio);
      this.domicilio = this.cliente.domicilio.calle + " "+ this.cliente.domicilio.numero;      
      // this.domicilioService.getDomicilio(this.cliente.domicilio.id).subscribe(domi => {
      //   this.domicilio = domi;},
      //   error => {
      //     console.log("No se puede obtener el domicilio");
      // });
      if(this.cliente == undefined){
        this.polizaForm.controls['clienteFormControl'].setErrors({'required': true});
      }
    },
      error => {console.log("No se puede obtener el cliente");
      });

    this.domicilioService.getAllProvincia().subscribe(
      lista => {this.provincias = lista;},
      error => {console.log("No se pudo cargar las provincias");
      });
      
      this.automovilService.getAllMarca().subscribe(
        lista => { this.marcas = lista; },
        error => {
          console.log("No se pudo cargar las marcas");
        }
      );  

 
  
    
  }
  
  selectProvinciaChange(provincia){
    if(provincia!=undefined){
      console.log("Id provincia: ");
      console.log(this.provincias[provincia].id);
      
      
      this.domicilioService.getAllLocalidad(this.provincias[provincia].id).subscribe(
        lista => {this.localidades = lista;},
        error => {console.log("No se pudo cargar las localidades");
        });
    }
    
  }

  selectMarcaChange(marca){
    if(marca!=undefined){
      console.log(marca);
      
      this.automovilService.getAllModelo(this.marcas[marca].id).subscribe(
        lista => {this.modelos = lista;},
        error => {console.log("No se pudo cargar las localidades");
        });
    }
    
  }

  agregarHijo(){
    this.cantidadHijos.push(true);
    console.log("puto");
  }

  borrarHijo(a){
    this.cantidadHijos[this.cantidadHijos.indexOf(a)]=false;
    this.cantidadHijos = this.cantidadHijos.filter(obj => obj !== false);
  }

  confirmar(){
    this.router.navigate(["/cobertura"]);
  }
  // get name() { return this.heroForm.get('name'); }
    get provinciaFormControl(){ return this.polizaForm.get('provinciaFormControl'); }
    get localidadFormControl(){ return this.polizaForm.get('localidadFormControl'); }
    get marcaFormControl(){ return this.polizaForm.get('marcaFormControl'); }
    get modeloFormControl(){ return this.polizaForm.get('modeloFormControl'); }
    get clienteFormControl(){ return this.polizaForm.get('clienteFormControl'); }
  // get power() { return this.heroForm.get('power'); }

}
