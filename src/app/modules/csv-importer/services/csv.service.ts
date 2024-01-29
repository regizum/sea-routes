import { Injectable } from '@angular/core';
import { IRoute } from '@shared/types/routes';

/**
 * This service is used to import data from CSV file.
 */
@Injectable({ providedIn: 'root' })
export class CsvService {
  // Import data from CSV file uploaded by user and return array of objects (IRoute).
  public importDataFromCSV(csvText: string): Array<any> {
    let propertyNames = csvText.slice(0, csvText.indexOf('\n')).split(',');
    const dataRows = csvText.slice(csvText.indexOf('\n') + 1).split('\n');

    propertyNames = propertyNames.map((propertyName: string) =>
      this.clearPropertyName(propertyName),
    );

    let dataArray: IRoute[] = [];
    dataRows.forEach((row) => {
      if (row) {
        let values = this.getValues(row);

        let obj: any = new Object();

        for (let index = 0; index < propertyNames.length; index++) {
          const propertyName: string = propertyNames[index];

          let val: any = values[index];
          if (val === '') {
            val = null;
          }

          obj[propertyName] = val;
        }

        dataArray.push(obj);
      }
    });

    return dataArray;
  }

  // Get values from CSV row
  private getValues(string: string) {
    let values = [];

    for (let i = 0; i < 4; i++) {
      let separatorIndex = string.indexOf(',');
      let value = string.slice(1, separatorIndex - 1);
      values.push(value);
      string = string.slice(separatorIndex + 1);
    }

    values.push(this.getPointsValues(string));

    return values;
  }

  // Get points values from CSV row
  private getPointsValues(string: string) {
    let points: Array<number[]> = [];

    string = string.slice(3, -4);

    let pointsStringArray: string[] = string.split('], [');

    for (let i = 0; i < pointsStringArray.length; i++) {
      let tempPoints: string[] = pointsStringArray[i].split(', ');
      let pointArray: number[] = [];

      tempPoints.forEach((pointValue, index) => {
        if (pointValue && pointValue !== 'null') {
          pointArray.push(+pointValue);
        } else {
          pointArray.push(0);
        }
      });

      points.push(pointArray);
    }

    return points;
  }

  // Remove quotes from property name
  private clearPropertyName(string: string) {
    return string.trim().slice(1, -1);
  }
}
