import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BerechnungenComponent } from "./berechnungen/berechnungen.component";
import { NewBerechnungComponent } from "./new-berechnung/new-berechnung.component";

const routes: Routes = [
  {
    path: "",
    component: BerechnungenComponent,
  },
  {
    path: "berchnen",
    component: NewBerechnungComponent,
  },
  {
    path: "**",
    pathMatch: "prefix",
    redirectTo: "/",
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: "enabled",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
