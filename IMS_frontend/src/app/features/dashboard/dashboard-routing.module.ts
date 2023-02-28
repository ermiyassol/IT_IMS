import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { GeneralContentComponent } from './sections/main-section/general-content/general-content.component';
import { SpecificContentComponent } from './sections/main-section/specific-content/specific-content.component';


const routes: Routes = [
  { path: "", component: DashboardComponent, children: [
    { path: "", redirectTo: "general", pathMatch: "full"},
    { path: "general", component: GeneralContentComponent },
    { path: "specific/:deviceType", component: SpecificContentComponent }
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}