import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  polizaForm: FormGroup;
  animalControl = new FormControl('', [Validators.required]);
  selectFormControl = new FormControl('', Validators.required);
  animals: Animal[] = [
    {name: 'Dog', sound: 'Woof!'},
    {name: 'Cat', sound: 'Meow!'},
    {name: 'Cow', sound: 'Moo!'},
    {name: 'Fox', sound: 'Wa-pa-pa-pa-pa-pa-pow!'},
  ];

  domicilio: string;

  constructor() { } 

  ngOnInit() {
    this.domicilio = "Alvear 5243 - Santa Fe"

    this.polizaForm = new FormGroup({
      'provinciaSelectFormControl': new FormControl(this.hero.name, [
        Validators.required,
        Validators.minLength(4),
        //forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
      ]),
      'alterEgo': new FormControl(this.hero.alterEgo),
      'power': new FormControl(this.hero.power, Validators.required)
    });
  
  }
  
  get name() { return this.heroForm.get('name'); }
  
  get power() { return this.heroForm.get('power'); }

}
