import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms'; 
import { RouterModule, Routes } from '@angular/router'; 

import { ApiService } from './services/api.service'; 
import { AuthService } from './services/api.service'; 
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';  
import { provideHttpClient } from '@angular/common/http';



import { ChartOptions, ChartType, ChartDataset } from 'chart.js';  
import { BaseChartDirective } from 'ng2-charts';
import { ChartsModule } from 'ng2-charts';
import { NgChartsModule } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Chart } from 'chart.js/auto';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { routes } from './app.routes';  

@NgModule({
  declarations: [AppComponent,NavbarComponent,LoginComponent],
  imports: [
    CommonModule,
    FormsModule, 
    AppRoutingModule,
    HttpClientModule,  
    BrowserModule,
    RouterModule.forRoot([]),

    ChartOptions,
    ChartType,
    ChartDataset,
    BaseChartDirective,
    ChartsModule,
    NgxChartsModule,
    NgChartsModule,
    BrowserAnimationsModule,
    Chart  
  ],
  providers: [ApiService,
  AuthService,
  provideCharts(withDefaultRegisterables())],
  bootstrap: [AppComponent]
})
export class AppModule { }
