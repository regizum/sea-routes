import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { IRoute } from '@shared/types/routes';
import { DatePipe } from '@angular/common';

/**
 * This component is used to display a modal with route details and chart.
 *
 * Usage example:
 * const modalRef = this.modalService.open(RouteModalComponent, {
 *   size: 'lg',
 * });
 * modalRef.componentInstance.route = this.route;
 */
@Component({
  selector: 'route-modal',
  templateUrl: './route-modal.component.html',
})
export class RouteModalComponent {
  modal = inject(NgbActiveModal);
  @Input() public route: IRoute;

  // Max speed of the route to display in widget
  maxSpeed: number = 0;

  // Average speed of the route to display in widget
  avgSpeed: number = 0;

  // Date of the route to display in widget
  date: string = '';

  // Arrays of time for chart data
  timeArray: string[] = [];

  // Array of speed for chart data
  valuesArray: number[] = [];

  public lineChartData: ChartConfiguration<'line'>['data'];
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
  };
  public lineChartLegend = true;

  constructor(public datepipe: DatePipe) {}

  ngOnInit() {
    this.date = this.formatDate(this.route.points[0][2], 'dd.MM.yyy');
    let speedTotal = 0;

    this.route.points.forEach((point) => {
      let speed = point[3];
      let time = this.formatDate(point[2], 'hh:mm:ss');

      this.timeArray.push(time);
      this.valuesArray.push(speed);

      if (speed > this.maxSpeed) {
        this.maxSpeed = speed;
      }
      speedTotal += speed;
    });

    this.avgSpeed = Math.floor(speedTotal / this.route.points.length);

    this.lineChartData = {
      labels: this.timeArray,
      datasets: [
        {
          data: this.valuesArray,
          label: 'Speed',
          fill: true,
          tension: 0.5,
          borderColor: '#9ec5fe',
          backgroundColor: '#cfe2ff',
        },
      ],
    } as ChartConfiguration<'line'>['data'];
  }

  // Get date or time string from timestamp
  formatDate(timestamp: number, format: string) {
    let dateObject = new Date(timestamp);
    let dateString = this.datepipe.transform(dateObject, 'dd.MM.yyy');
    return dateString ? dateString : '';
  }
}
