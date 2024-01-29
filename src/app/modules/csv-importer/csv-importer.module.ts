import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CsvImporterComponent } from './components/csv-importer/csv-importer.component';
import { CsvService } from './services/csv.service';
import { HttpService } from './services/http.service';

/**
 * This module is used to import the CSV file.
 */
@NgModule({
  declarations: [CsvImporterComponent],
  providers: [CsvService, HttpService],
  imports: [CommonModule, HttpClientModule, FormsModule],
  exports: [CsvImporterComponent],
})
export class CsvImporterModule {}
