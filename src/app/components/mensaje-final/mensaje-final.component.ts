import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-mensaje-final',
  templateUrl: './mensaje-final.component.html',
  styleUrls: ['./mensaje-final.component.css']
})
export class MensajeFinalComponent implements OnInit {

  numeroDePoliza: String;

  constructor(
    public dialogRef: MatDialogRef<MensajeFinalComponent>,@Inject(MAT_DIALOG_DATA) public data: any,
    
  ) {}

  ngOnInit() {
    console.log(this.data)
    this.numeroDePoliza = this.data.total;
  }

  cancelar(){
    this.dialogRef.close();
  }


}
