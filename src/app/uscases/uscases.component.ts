import { Component, OnInit } from '@angular/core';
import { USCases } from '../uscases';
import { CovidCasesService } from '../covid-cases.service';

@Component({
  selector: 'app-uscases',
  templateUrl: './uscases.component.html',
  styleUrls: ['./uscases.component.scss']
})
export class USCasesComponent implements OnInit {

  usCasesArray: USCases[] = [];
  updatedMinutes = -1

  //&uarr;  --> Up
  //&darr; 
  upArrow = "↑"
  downArrow = "↓"
  default = "⇵"
  activeSortIcon = this.default
  recoveredSortIcon = this.default
  deathSortIcon = this.default
  defaultIconSort   = this.upArrow
  sortOption: string = "default"

  constructor(private covidCasesService: CovidCasesService) { }

  ngOnInit(): void {
    this.getUSCases()
     let time2 = setInterval(() => { if (this.updatedMinutes != -1) this.updatedMinutes++ }, 1000)
    let timerId = setInterval(() => {
      this.getUSCases();
    }
      , 1000 * 60);

  }
  getUSCases() {
    this.covidCasesService.getUSCovidCases().then(
      (totalCases) => {
        console.log("Updating the  array")
        this.usCasesArray = totalCases
        this.updatedMinutes = 0
      },
      (error) => {

      }
    )
  }

  activeSort() {
    console.log("Inside the activeSort()")
    this.deathSortIcon = this.default
    this.recoveredSortIcon = this.default
    this.defaultIconSort   = this.default


    if (this.activeSortIcon === this.default || this.activeSortIcon === this.upArrow ) {
      this.activeSortIcon = this.downArrow
      this.sortOption = "active"
    }
    else if (this.activeSortIcon === this.downArrow) {
      this.activeSortIcon = this.upArrow
      this.sortOption = "revActive"
    }
  }

  recoveredSort() {
    console.log("Inside the recoveredSort()")
    this.deathSortIcon = this.default
    this.activeSortIcon = this.default
    this.defaultIconSort   = this.default

    if (this.recoveredSortIcon === this.default || this.recoveredSortIcon === this.upArrow ) {
      this.recoveredSortIcon = this.downArrow
      this.sortOption = "recovered"
    }
    else if (this.recoveredSortIcon === this.downArrow) {
      this.recoveredSortIcon = this.upArrow
      this.sortOption = "revRecovered"
    }
  }
  deathSortSort() {
    console.log("Inside the recoveredSort()")
    this.recoveredSortIcon = this.default
    this.activeSortIcon = this.default
    this.defaultIconSort   = this.default

    if (this.deathSortIcon === this.default || this.deathSortIcon === this.upArrow ) {
      this.deathSortIcon = this.downArrow
      this.sortOption = "death"
    }
    else if (this.deathSortIcon === this.downArrow) {
      this.deathSortIcon = this.upArrow
      this.sortOption = "revDeath"
    }
  }
  defaultSort(){
    this.recoveredSortIcon = this.default
    this.activeSortIcon = this.default
    this.deathSortIcon = this.default

    if(this.defaultIconSort  === this.upArrow || this.defaultIconSort   === this.default){
          this.sortOption = "rDefault"    
          this.defaultIconSort = this.downArrow
    }else{
      this.sortOption = "default"    
      this.defaultIconSort = this.upArrow
    }
  }
}
