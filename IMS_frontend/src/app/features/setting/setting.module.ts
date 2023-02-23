import { NgModule } from '@angular/core';
import { SettingRoutingModule } from './setting.routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserComponent } from './pages/user/user.component';
import { ManageEnumComponent } from './pages/manage-enum/manage-enum.component';
import { DependentEntryComponent } from './pages/manage-enum/dependent-entry/dependent-entry.component';
import { IndependentEntryComponent } from './pages/manage-enum/independent-entry/independent-entry.component';
import { PurchaseOrderEntryComponent } from './pages/manage-enum/purchase-order-entry/purchase-order-entry.component';
import { AccessoryComponent } from './pages/accessory/accessory.component';


@NgModule({
    declarations: [UserComponent, ManageEnumComponent, DependentEntryComponent, IndependentEntryComponent, PurchaseOrderEntryComponent, AccessoryComponent],
    imports: [SettingRoutingModule, SharedModule],
    exports: [],
    providers: [],
})
export class SettingModule {}