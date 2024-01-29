import { Component, Input, Output, EventEmitter } from '@angular/core';

import { IRoute } from '@shared/types/routes';
import { CsvService } from '../../services/csv.service';
import { HttpService } from '../../services/http.service';

/**
 * This component is responsible for importing data from CSV file.
 * It has two methods for importing data:
 * 1. importDataFromUploadedFile - imports data from file uploaded by user
 * 2. importDataFromPreloadedFile - imports data from preloaded file (assets/web_challenge.csv)
 *
 * Usage example:
 * <csv-importer
 *  [fileSrc]="fileSrc"
 *  (onDataImport)="onDataImport($event)"
 *  (onLoadStart)="onLoadStart()"
 *  (onLoadEnd)="onLoadEnd()"
 *  ></csv-importer>
 */
@Component({
  selector: 'csv-importer',
  templateUrl: './csv-importer.component.html',
})
export class CsvImporterComponent {
  @Input() fileSrc: string;
  @Output() onDataImport: EventEmitter<IRoute[]> = new EventEmitter<IRoute[]>();
  @Output() onLoadStart: EventEmitter<void> = new EventEmitter<void>();
  @Output() onLoadEnd: EventEmitter<void> = new EventEmitter<void>();

  public routes: IRoute[] = [];

  constructor(
    private _csvService: CsvService,
    private _httpService: HttpService,
  ) {}

  // Import data from file uploaded by user
  public async importDataFromUploadedFile(event: any) {
    this.onLoadStart.emit();
    let fileContent = await this.getTextFromFile(event);
    this.routes = this._csvService.importDataFromCSV(fileContent);
    this.onDataImport.emit(this.routes);
    this.onLoadEnd.emit();
  }

  // Get text from file uploaded by user
  private async getTextFromFile(event: any) {
    const file: File = event.target.files[0];
    let fileContent = await file.text();

    return fileContent;
  }

  // Import data from preloaded file (assets/web_challenge.csv)
  public importDataFromPreloadedFile() {
    this.onLoadStart.emit();
    this._httpService.getFileFromLocalFolder(this.fileSrc).subscribe(
      (data) => {
        this.routes = this._csvService.importDataFromCSV(data);
        this.onDataImport.emit(this.routes);
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.onLoadEnd.emit();
      },
    );
  }
}
