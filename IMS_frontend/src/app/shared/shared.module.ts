import { CommonModule } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { NgZorroAntdModule } from './ng-zorro-antd.module';
import { CapitalizePipe } from './services/capitalize.pipe';

const declaration = [ HeaderComponent, SideNavComponent, FooterComponent, LoadingSpinnerComponent, CapitalizePipe,];
const modules = [CommonModule, FormsModule, RouterModule, ReactiveFormsModule, ReactiveFormsModule, NgZorroAntdModule];

@NgModule({
    imports: [...modules],
    exports: [...modules, ...declaration],
    declarations: [...declaration],
    providers: [],
})
export class SharedModule { }
