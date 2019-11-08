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
  domicilio: Domicilio;

  polizaForm: FormGroup;
  animalControl = new FormControl('', [Validators.required]);
  selectFormControl = new FormControl('', Validators.required);
  animals: Animal[] = [
    {name: 'Dog', sound: 'Woof!'},
    {name: 'Cat', sound: 'Meow!'},
    {name: 'Cow', sound: 'Moo!'},
    {name: 'Fox', sound: 'Wa-pa-pa-pa-pa-pa-pow!'},
  ];



  constructor(private domicilioService: DomicilioService, private ClienteService: ClienteService) { } 

  ngOnInit() {

    this.ClienteService.getCliente(0).subscribe(client => {
      this.cliente = client; console.log(this.cliente);
      this.domicilioService.getDomicilio(this.cliente.domicilio.id).subscribe(domi => {
        this.domicilio = domi;},
        error => {
          console.log("No se puede obtener el domicilio");
      });
    },
      error => {console.log("No se puede obtener el cliente");
      });

    

    this.polizaForm = new FormGroup({
      // 'provinciaSelectFormControl': new FormControl(this.hero.name, [
      //   Validators.required,
      //   Validators.minLength(4),
        //forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
      
      // 'alterEgo': new FormControl(this.hero.alterEgo),
      // 'power': new FormControl(this.hero.power, Validators.required)
    });
  
  }
  
  // get name() { return this.heroForm.get('name'); }
  
  // get power() { return this.heroForm.get('power'); }

}
