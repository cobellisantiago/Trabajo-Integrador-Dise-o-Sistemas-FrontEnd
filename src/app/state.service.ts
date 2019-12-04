import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private data = {};  

  constructor() { }

  public setOption(option, value){  
   // debugger;  
    this.data[option] = value;  
  }  

  public getOption(option) {  
    return this.data[option];  
  }
}
  
  
  