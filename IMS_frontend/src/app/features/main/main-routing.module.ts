import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecordComponent } from '../record/record.component';
import { MainComponent } from './main.component';
import { AuthGuard } from "./service/auth-guard.service";

const routes: Routes = [
  { path: "", component: MainComponent, children: [
    { path: "", redirectTo: "dashboard", pathMatch: "full"},
    { path: "dashboard", canActivate: [AuthGuard], loadChildren: () => import('../dashboard/dashboard.module').then((e) => e.DashboardModule)},
    { path: 'device', canActivate: [AuthGuard], loadChildren: () => import('../device/device.module').then((e) => e.DeviceModule)},
    { path: 'setting', canActivate: [AuthGuard], loadChildren: () => import('../setting/setting.module').then((e) => e.SettingModule)},
    { path: 'record', canActivate: [AuthGuard], component: RecordComponent},
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}