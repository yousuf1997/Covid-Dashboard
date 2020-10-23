import { Pipe, PipeTransform } from '@angular/core';
import { USCases } from './uscases';
import { WorldWideCases } from './world-wide-cases';

@Pipe({
  name: 'sorter'
})
export class SorterPipe implements PipeTransform {

  transform( cases: any[], sortColumn: String): any[] {

    if (sortColumn === "active") {
      return cases.sort(
        (a: any, b: any) => {
          if (a.activeCases < b.activeCases) {
            return -1;
          } else if (a.activeCases > b.activeCases) {
            return 1;
          } else {
            return 0;
          }
        }
      )
    } else if (sortColumn === "recovered") {
      return cases.sort(
        (a: any, b: any) => {
          if (a.recoveredCases < b.recoveredCases) {
            return -1;
          } else if (a.recoveredCases > b.recoveredCases) {
            return 1;
          } else {
            return 0;
          }
        }
      )
    } else if (sortColumn === "death") {
      return cases.sort(
        (a: any, b: any) => {
          if (a.deathCases < b.deathCases) {
            return -1;
          } else if (a.deathCases > b.deathCases) {
            return 1;
          } else {
            return 0;
          }
        }
      )
    }else if(sortColumn === "default"){
      return cases.sort(
        (a: any, b: any) => {
          if (a.state < b.state) {
            return -1;
          } else if (a.state > b.state) {
            return 1;
          } else {
            return 0;
          }
        }
      )}
      else if(sortColumn === "rDefault"){
        return cases.sort(
          (a: any, b: any) => {
            if (a.state < b.state) {
              return 1;
            } else if (a.state > b.state) {
              return -1;
            } else {
              return 0;
            }
          }
        )}
        else if (sortColumn === "defaultB"){
        return cases.sort(
          (a: any, b: any) => {
            if (a.country < b.country) {
              return -1;
            } else if (a.country > b.country) {
              return 1;
            } else {
              return 0;
            }
          }
        )
      } else if (sortColumn === "rDefaultB"){
        return cases.sort(
          (a: any, b: any) => {
            if (a.country < b.country) {
              return 1;
            } else if (a.country > b.country) {
              return -1;
            } else {
              return 0;
            }
          }
        )
      } 
      else if (sortColumn === "revActive") {
        return cases.sort(
          (a: any, b: any) => {
            if (a.activeCases < b.activeCases) {
              return 1;
            } else if (a.activeCases > b.activeCases) {
              return -1;
            } else {
              return 0;
            }
          }
        )
      } else if (sortColumn === "revRecovered") {
        return cases.sort(
          (a: any, b: any) => {
            if (a.recoveredCases < b.recoveredCases) {
              return 1;
            } else if (a.recoveredCases > b.recoveredCases) {
              return -1;
            } else {
              return 0;
            }
          }
        )
      } else if (sortColumn === "revDeath") {
        return cases.sort(
          (a: any, b: any) => {
            if (a.deathCases < b.deathCases) {
              return 1;
            } else if (a.deathCases > b.deathCases) {
              return -1;
            } else {
              return 0;
            }
          }
        )
      }

    return null;
  }

}
