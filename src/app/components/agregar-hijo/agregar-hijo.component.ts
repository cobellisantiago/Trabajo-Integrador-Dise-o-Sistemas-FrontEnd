import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Hijo } from './../../model/hijo';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agregar-hijo',
  templateUrl: './agregar-hijo.component.html',
  styleUrls: ['./agregar-hijo.component.css']
})
export class AgregarHijoComponent implements OnInit {

  today = new Date();
  startDate = new Date(2001, 0, 1);
  maxDate = new Date(this.today.getFullYear()-18,this.today.getMonth(),this.today.getUTCDate()-1);
  minDate = new Date(this.today.getFullYear()-30,this.today.getMonth(),this.today.getUTCDate());
  hijo: Hijo;
  sexoSelected: string;
  estadoCivilSelected: string;
  fechaNacimientoSelected: Date = new Date(this.maxDate);

  constructor(public dialogRef: MatDialogRef<AgregarHijoComponent>) { }

  hijoForm: FormGroup;

  ngOnInit() {
    this.hijoForm = new FormGroup({
      sexoFormControl: new FormControl("",Validators.required),
      estadoFormControl: new FormControl("", Validators.required),
      edadFormControl: new FormControl("", Validators.required),
    });
  }

  confirmar(){
    console.log(this.fechaNacimientoSelected);
    
    this.hijo={
      id: undefined,
      sexo: undefined,
      estadoCivil: 1,
      fechaDeNacimiento: new Date(this.fechaNacimientoSelected)
    }
    if(this.sexoSelected=="Masculino"){
      this.hijo.sexo = 0
      }else{
        this.hijo.sexo = 1
    }

    this.dialogRef.close(this.hijo);
  }

  get sexoFormControl() {
    return this.hijoForm.get("sexoFormControl");
  }
  get estadoFormControl() {
    return this.hijoForm.get("estadoFormControl");
  }
  get edadFormControl() {
    return this.hijoForm.get("edadFormControl");
  }


}
