import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { CardComponent } from './components/card/card.component';
import { TopCardsComponent } from './sections/top-cards/top-cards.component';
import { ColumnChartComponent } from './components/column-chart/column-chart.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AdvancedPieChartComponent } from './components/advanced-pie-chart/advanced-pie-chart.component';
import { GroupedColumnChartComponent } from './components/grouped-column-chart/grouped-column-chart.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { MainSectionComponent } from './sections/main-section/main-section.component';
import { SpecificContentComponent } from './sections/main-section/specific-content/specific-content.component';
import { GeneralContentComponent } from './sections/main-section/general-content/general-content.component';
import { TableComponent } from './components/table/table.component';

import * as CanvasJSAngularChart from '../../../assets/canvasjs-3.7.5/canvasjs.angular.component';
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;
 
@NgModule({
    declarations: [DashboardComponent, CardComponent, TopCardsComponent, ColumnChartComponent, PieChartComponent, AdvancedPieChartComponent, GroupedColumnChartComponent, LineChartComponent, MainSectionComponent, SpecificContentComponent, GeneralContentComponent, TableComponent, CanvasJSChart],
    imports: [SharedModule, NgxChartsModule,],
    exports: [],
    providers: [],
})

export class DashboardModule {}