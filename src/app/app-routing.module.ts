import { ConfirmarPolizaComponent } from "./components/confirmar-poliza/confirmar-poliza.component";
import { BuscarClienteComponent } from "./components/buscar-cliente/buscar-cliente.component";
import { RegistrarPagoComponent } from "./components/registrar-pago/registrar-pago.component";
import { SeleccionCoberturaComponent } from "./components/seleccion-cobertura/seleccion-cobertura.component";
import { NuevaPolizaComponent } from "./components/nueva-poliza/nueva-poliza.component";
import { MenuPrincipalComponent } from "./components/menu-principal/menu-principal.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "menu",
    component: MenuPrincipalComponent
  },
  {
    path: "nueva",
    component: NuevaPolizaComponent
  },
  {
    path: "cobertura",
    component: SeleccionCoberturaComponent
  },
  {
    path: "pago",
    component: RegistrarPagoComponent
  },
  {
    path: "cliente",
    component: BuscarClienteComponent
  },
  {
    path: "confirmar",
    component: ConfirmarPolizaComponent
  },
  {
    path: "pago",
    component: RegistrarPagoComponent
  },
  {
    path: "",
    redirectTo: "/menu",
    pathMatch: "prefix"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
