import { Component, OnInit } from '@angular/core';
import { CovidCasesService } from '../covid-cases.service'
import { TotalCases } from '../total-cases';
import { USCases } from '../uscases';

@Component({
  selector: 'app-total-cases',
  templateUrl: './total-cases.component.html',
  styleUrls: ['./total-cases.component.scss']
})
export class TotalCasesComponent implements OnInit {

  /**
   * Default Values 
   */
  totalNumberofCases = 0
  totalNumberofRecoveries = 0
  totalNumberOfDeaths = 0
  updatedMinutes = -1

  resultUpdated = false

  constructor(private covidCasesService : CovidCasesService) { }
   
  ngOnInit(): void {

     this.getTotalCases()

     let time2 = setInterval(() =>{ if(this.updatedMinutes != -1) this.updatedMinutes++}, 1000)
     let timerId = setInterval(() => {
       this.getTotalCases();
     }
     , 1000 * 60);
     
  }
  getTotalCases(){
  //  this.totalNumberOfDeaths = this.totalNumberOfDeaths + 1;
      console.log("[TotalCasesComponent] Calling the covid services API")
      this.covidCasesService.getTotalCases().then(
        (totalCases) => {
                this.totalNumberofCases = totalCases.confirmedCases
                this.totalNumberofRecoveries =  totalCases.recoveredCases
                this.totalNumberOfDeaths = totalCases.deathCases
                this.resultUpdated  = true
                this.updatedMinutes = 0
        },
        (error)  =>  {

        }
      )
  }

 

}
