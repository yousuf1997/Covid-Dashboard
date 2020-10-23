import { Component, OnInit } from '@angular/core';
import { WorldWideCases } from '../world-wide-cases';
import { CovidCasesService } from '../covid-cases.service';

@Component({
  selector: 'app-cases-by-country',
  templateUrl: './cases-by-country.component.html',
  styleUrls: ['./cases-by-country.component.scss']
})
export class CasesByCountryComponent implements OnInit {
  
  worldWideCasesArray: WorldWideCases[] = []
  updatedMinutes = -1
  constructor(private covidCasesService : CovidCasesService) { }

  ngOnInit(): void {
    this.getCasesByCountry()
    let time2 = setInterval(() =>{ if(this.updatedMinutes != -1) this.updatedMinutes++}, 1000)
    let timerId = setInterval(() => {
      this.getCasesByCountry();
    }
    , 1000 * 60);
  }

  getCasesByCountry(){
    this.covidCasesService.getCasesByCountry().then(
      (totalCases) => {
             this.worldWideCasesArray = totalCases
             this.updatedMinutes = 0
      },
      (error)  =>  {

      }
    )
  }
 }

