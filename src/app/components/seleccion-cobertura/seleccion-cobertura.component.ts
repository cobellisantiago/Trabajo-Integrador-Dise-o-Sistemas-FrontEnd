import { StateService } from './../../state.service';
import { Poliza } from './../../model/poliza';
import { Cobertura } from './../../model/cobertura';
import { CoberturaService } from './../../service/cobertura.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MAT_STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';


@Component({
  selector: 'app-seleccion-cobertura',
  templateUrl: './seleccion-cobertura.component.html',
  styleUrls: ['./seleccion-cobertura.component.css'],
  providers: [{
    provide: MAT_STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class SeleccionCoberturaComponent implements OnInit {

  nuevaPoliza: Poliza;

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  tercerFormGroup: FormGroup;
  checked = false;
  indeterminate = false;
  labelPosition = 'after';
  disabled = false;

  coberturas: Cobertura[];

  constructor(private _formBuilder: FormBuilder, private coberturaService: CoberturaService, private stateService: StateService) {}

  ngOnInit() {

    let mensaje = this.stateService.getOption();
    console.log(mensaje);
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.tercerFormGroup = this._formBuilder.group({
      tercerCtrl: ['', Validators.required]
    });
    this.coberturas = [];
    this.coberturaService.getAllCobertura().subscribe(lista =>{
      this.coberturas=lista; console.log(this.coberturas);
      
    },
      error => {
        console.log("No se pudo obtener las coberturas");
        
      });
  }
}
