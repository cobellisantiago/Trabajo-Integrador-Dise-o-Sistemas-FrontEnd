import { StateService } from './../../state.service';
import { Poliza } from './../../model/poliza';
import { Cobertura } from './../../model/cobertura';
import { CoberturaService } from './../../service/cobertura.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MAT_STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Router } from '@angular/router';


@Component({
  selector: 'app-seleccion-cobertura',
  templateUrl: './seleccion-cobertura.component.html',
  styleUrls: ['./seleccion-cobertura.component.css'],
  providers: [{
    provide: MAT_STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class SeleccionCoberturaComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  tercerFormGroup: FormGroup;
  checked = false;
  indeterminate = false;
  labelPosition = 'after';
  disabled = false;

  coberturas: Cobertura[];
  nuevaPoliza: Poliza;
  disabledRadioButton: Boolean;
  today = new Date()
  maxDate = new Date(this.today.getFullYear(),this.today.getMonth()+1,this.today.getUTCDate());
  minDate = new Date(this.today.getFullYear(),this.today.getMonth(),this.today.getUTCDate()+1);



  constructor(private _formBuilder: FormBuilder, private coberturaService: CoberturaService, private stateService: StateService, private router: Router) {}

  ngOnInit() {

    let mensaje = this.stateService.getOption('nuevaPoliza');
    console.log(mensaje);
    this.nuevaPoliza = this.stateService.getOption('nuevaPoliza')
    console.log("Nueva poliza: "+this.nuevaPoliza);
    
    if(this.nuevaPoliza.añoVehiculo.anio<2010) this.disabledRadioButton = true;
    
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: [this.minDate, Validators.required]
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

  guardar(){
    console.log( this.coberturas[this.firstFormGroup.get('firstCtrl').value]);
    
    this.nuevaPoliza.cobertura = this.coberturas[this.firstFormGroup.get('firstCtrl').value];
    this.nuevaPoliza.fechaInicioVigencia = this.secondFormGroup.get('secondCtrl').value;
    console.log(this.tercerFormGroup.get('tercerCtrl').value);
    
    this.nuevaPoliza.formaDePago = this.tercerFormGroup.get('tercerCtrl').value;
    this.nuevaPoliza.idCobertura = this.nuevaPoliza.cobertura.id;

    console.log(this.nuevaPoliza);
    this.stateService.setOption('nuevaPoliza', this.nuevaPoliza);
    this.router.navigate(["/confirmar"]);
  }

  getfirstCtrl(){ this.firstFormGroup.get('firstCtrl'); }
  getsecondCtrl(){ this.secondFormGroup.get('secondCtrl'); }
  gettercerCtrl(){ this.tercerFormGroup.get('tercerCtrl'); }
}
