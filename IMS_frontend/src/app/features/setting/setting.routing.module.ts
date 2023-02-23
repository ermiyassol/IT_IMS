import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageEnumComponent } from './pages/manage-enum/manage-enum.component';
import { AccessoryComponent } from './pages/accessory/accessory.component';
import { UserComponent } from './pages/user/user.component';

const routes: Routes = [
  { path: "", redirectTo: "**", pathMatch: "full" }, //! where to redirect
  { path: "manage_users", component: UserComponent},
  { path: "manage_enum_data", component: ManageEnumComponent},
  { path: "manage_accessory", component: AccessoryComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }