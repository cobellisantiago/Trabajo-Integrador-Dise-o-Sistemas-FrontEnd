import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private data = {};  

  constructor() { }

  public setOption(option, value) {  
    debugger;  
    this.data[option] = value;  
  }  

  public getOption() {  
    return this.data;  
  }
}
  
  
  