import { Component, Input } from '@angular/core';

@Component({
  selector: 'widget',
  standalone: true,
  imports: [],
  templateUrl: './widget.component.html',
})
export class WidgetComponent {
  @Input() public title: string = '';
  @Input() public subtitle: string = '';
  @Input() public iconClasses: string = 'fa fa-cog';
  @Input() public color: string = 'primary';
}
