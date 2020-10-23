import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { USCasesComponent } from './uscases/uscases.component';
import { CasesByCountryComponent } from './cases-by-country/cases-by-country.component';

const routes: Routes = [
 
  { path: 'USCases', component: USCasesComponent},
  { path : 'casesByCountry', component : CasesByCountryComponent},
  { path: '**', redirectTo: 'USCases', pathMatch:'full' }
  // { path: 'bookList', component: BookComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
