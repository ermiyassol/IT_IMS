import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { MainModule } from './features/main/main.module';
import { DeviceModule } from './features/device/device.module';
import { HomeModule } from './features/home/home.module';
import { SettingModule } from './features/setting/setting.module';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { RecordComponent } from './features/record/record.component';
import { RecordSearchPipe } from './features/record/record-search.pipe';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent, RecordComponent, RecordSearchPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    MainModule,
    DeviceModule,
    HomeModule,
    SettingModule,
    DashboardModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
