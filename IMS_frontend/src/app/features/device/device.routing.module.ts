import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageComponent } from './pages/manage/manage.component';
import { SingleFormComponent } from './pages/manage/single-form/single-form.component';
import { ViewComponent } from './pages/view/view.component';

const routes: Routes = [
  { path: "", redirectTo: "view", pathMatch: "full" },
  { path: "view", component: ViewComponent},
  { path: "add", component: ManageComponent},
  { path: "view/:id/detail", component: SingleFormComponent},
  { path: "issue/devices/:detail", component: SingleFormComponent},
  // { path: ":id/edit", component: ManageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceRoutingModule { }