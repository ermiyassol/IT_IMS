import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeRoutingModule } from './home.routing.module';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
    declarations: [LoginComponent],
    imports: [HomeRoutingModule, SharedModule],
    exports: [],
    providers: [],
})
export class HomeModule {}