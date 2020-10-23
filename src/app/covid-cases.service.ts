import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { USCases } from './uscases';
import { WorldWideCases } from './world-wide-cases';
import { TotalCases } from './total-cases';

@Injectable({
  providedIn: 'root'
})
export class CovidCasesService {

  private usCasesArray: USCases[] = [];
  private worldWideCasesArray: WorldWideCases[] = []
  private totalWorldCases: TotalCases = null
  private URL = "https://coronavirus.m.pipedream.net"

  constructor(private http: HttpClient) {

  }

  getTotalCases() {
    var promise = new Promise<TotalCases>((resolve, reject) => {
      var covidData: Observable<any> = this.http.get<any>(this.URL);
      covidData.subscribe(
        (data) => {
          console.log("[CovideCaseService]")

          this.totalWorldCases = new TotalCases()

          this.totalWorldCases.confirmedCases = data.summaryStats.global.confirmed
          this.totalWorldCases.deathCases = data.summaryStats.global.deaths
          this.totalWorldCases.recoveredCases = data.summaryStats.global.recovered
          resolve(this.totalWorldCases)
        },
        (error) => {
          console.log("[CovideCaseService] something went wrong")
          reject("Something went wrong inside the API call for total cases.")
        },
      )
    });
    return promise;
  }

  getUSCovidCases() {
    // if (this.usCasesArray.length > 0) {
    //   return Promise.resolve(this.usCasesArray)
    // }
    var promise = new Promise<USCases[]>((resolve, reject) => {
      var covidData: Observable<any> = this.http.get<any>(this.URL);
      covidData.subscribe(
        (data) => {
          console.log("[CovideCaseService]")
          var rawDataArray = data.rawData.filter(data => data.Country_Region == "US")
          console.log("getUSCovidCases")

          var usStateMap = new Map()

          for (var index = 0; index < rawDataArray.length; index++) {
            if (usStateMap.has(rawDataArray[index].Province_State)) {
              if (rawDataArray[index].Active.length == 0) rawDataArray[index].Active = 0
              if (rawDataArray[index].Deaths.length == 0) rawDataArray[index].Deaths = 0
              if (rawDataArray[index].Recovered.length == 0) rawDataArray[index].Recovered = 0


              usStateMap.get(rawDataArray[index].Province_State).activeCases += parseInt(rawDataArray[index].Active)
              usStateMap.get(rawDataArray[index].Province_State).deathCases += parseInt(rawDataArray[index].Deaths)
              usStateMap.get(rawDataArray[index].Province_State).recoveredCases += parseInt(rawDataArray[index].Recovered)
            } else {
              var newUseCaseState = new USCases()
              newUseCaseState.state = rawDataArray[index].Province_State
              newUseCaseState.activeCases = parseInt(rawDataArray[index].Active)
              newUseCaseState.deathCases = parseInt(rawDataArray[index].Deaths)
              newUseCaseState.recoveredCases = parseInt(rawDataArray[index].Recovered)
              usStateMap.set(rawDataArray[index].Province_State, newUseCaseState)
            }
          }
          this.usCasesArray = []
          for (let value of usStateMap.values()) {
                  if(value.state != "Recovered")
                       this.usCasesArray.push(value)
          }
          resolve(this.usCasesArray)
        },
        (error) => {
          console.log("[CovideCaseService] something went wrong")
          reject("Something went wrong inside the API call for total cases.")
        },
      )

    });

    return promise;
  }

  getCasesByCountry() {
    // if (this.worldWideCasesArray.length > 0) {
    //   return Promise.resolve(this.worldWideCasesArray)
    // }
    var promise = new Promise<WorldWideCases[]>((resolve, reject) => {
      var covidData: Observable<any> = this.http.get<any>(this.URL);
      covidData.subscribe(
        (data) => {


          console.log("[CovideCaseService]")


          /**
           * Following code gets the  all of the countries
           */
          var countriesListSet = new Set()
          for (var index = 0; index < data.rawData.length; index++) {
            countriesListSet.add(data.rawData[index].Country_Region)

          }

          for (let country of countriesListSet) {
            var countryCasesArray = data.rawData.filter(data => data.Country_Region === country)

            var activeCases = 0
            var recoveredCases = 0
            var deathCases = 0
            for (var index = 0; index < countryCasesArray.length; index++) {

              if (countryCasesArray[index].Active.length == 0) countryCasesArray[index].Active = 0
              if (countryCasesArray[index].Deaths.length == 0) countryCasesArray[index].Deaths = 0
              if (countryCasesArray[index].Recovered.length == 0) countryCasesArray[index].Recovered = 0

              activeCases += parseInt(countryCasesArray[index].Active)
              deathCases += parseInt(countryCasesArray[index].Deaths)
              recoveredCases += parseInt(countryCasesArray[index].Recovered)
            }

            var newCountryCases = new WorldWideCases()
            newCountryCases.country = "" + country
            newCountryCases.activeCases = activeCases
            newCountryCases.recoveredCases = recoveredCases
            newCountryCases.deathCases = deathCases

            this.worldWideCasesArray.push(newCountryCases)
          }

          resolve(this.worldWideCasesArray)
        },
        (error) => {
          console.log("[CovideCaseService] something went wrong")
          reject("Something went wrong inside the API call for total cases.")
        },
      )

    });

    return promise;
  }

}
