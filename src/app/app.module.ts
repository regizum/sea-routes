import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CsvImporterModule } from '@modules/csv-importer/csv-importer.module';
import { RoutesListModule } from '@modules/routes-list/routes-list.module';

import { AppComponent } from './app.component';
import { GMapComponent } from './components/g-map/g-map.component';

@NgModule({
  declarations: [AppComponent, GMapComponent],
  imports: [BrowserModule, CsvImporterModule, RoutesListModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
