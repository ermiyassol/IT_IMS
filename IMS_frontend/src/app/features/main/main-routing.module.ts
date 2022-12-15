import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MainComponent } from './main.component';

const routes: Routes = [
  { path: "", component: MainComponent, children: [
    { path: "", redirectTo: "dashboard", pathMatch: "full"},
    { path: "dashboard", component: DashboardComponent },
    { path: 'device', loadChildren: () => import('../device/device.module').then((e) => e.DeviceModule)},
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}