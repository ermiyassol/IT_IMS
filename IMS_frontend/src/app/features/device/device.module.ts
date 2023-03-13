import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceRoutingModule } from './device.routing.module';
import { ViewComponent } from './pages/view/view.component';
import { ManageComponent } from './pages/manage/manage.component';
import { BulkFormComponent } from './pages/manage/bulk-form/bulk-form.component';
import { SingleFormComponent } from './pages/manage/single-form/single-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SearchPipe } from './service/search.pipe';
import { AccessoryComponent } from './components/accessory/accessory.component';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
    declarations: [SearchPipe, ViewComponent, ManageComponent, BulkFormComponent, SingleFormComponent, AccessoryComponent],
    imports: [DeviceRoutingModule, SharedModule, FileUploadModule],
    exports: [],
    providers: [],
})
export class DeviceModule {}