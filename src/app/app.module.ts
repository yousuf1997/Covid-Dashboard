import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TotalCasesComponent } from './total-cases/total-cases.component';
import { USCasesComponent } from './uscases/uscases.component';
import { CasesByCountryComponent } from './cases-by-country/cases-by-country.component';
import { CovidCasesService } from './covid-cases.service';
import { HttpClientModule }     from '@angular/common/http';
import { SorterPipe } from './sorter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TotalCasesComponent,
    USCasesComponent,
    CasesByCountryComponent,
    SorterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [CovidCasesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
