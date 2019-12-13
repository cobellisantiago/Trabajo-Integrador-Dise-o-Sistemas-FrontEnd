import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule, MatNativeDateModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatStepperModule} from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';

import { MenuPrincipalComponent } from './components/menu-principal/menu-principal.component';
import { NuevaPolizaComponent } from './components/nueva-poliza/nueva-poliza.component';
import { SeleccionCoberturaComponent } from './components/seleccion-cobertura/seleccion-cobertura.component';
import { RegistrarPagoComponent } from './components/registrar-pago/registrar-pago.component';
import { BuscarClienteComponent } from './components/buscar-cliente/buscar-cliente.component';
import { ConfirmarPolizaComponent } from './components/confirmar-poliza/confirmar-poliza.component';
import { AgregarHijoComponent } from './components/agregar-hijo/agregar-hijo.component';
import { BuscarPolizaComponent } from './components/buscar-poliza/buscar-poliza.component';
import { MontosPagoComponent } from './components/montos-pago/montos-pago.component';
import { IngresarMontoComponent } from './components/ingresar-monto/ingresar-monto.component';
import { MensajeFinalComponent } from './components/mensaje-final/mensaje-final.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuPrincipalComponent,
    NuevaPolizaComponent,
    SeleccionCoberturaComponent,
    RegistrarPagoComponent,
    BuscarClienteComponent,
    ConfirmarPolizaComponent,
    AgregarHijoComponent,
    BuscarPolizaComponent,
    MontosPagoComponent,
    IngresarMontoComponent,
    MensajeFinalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FlexLayoutModule,
    FontAwesomeModule,
    FormsModule, 
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    MatSelectModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule,
    MatRadioModule,
    MatDialogModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [BuscarClienteComponent,AgregarHijoComponent,BuscarPolizaComponent,MontosPagoComponent,MensajeFinalComponent]
})
export class AppModule { }
