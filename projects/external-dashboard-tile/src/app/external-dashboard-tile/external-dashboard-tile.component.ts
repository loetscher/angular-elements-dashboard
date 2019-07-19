import { Component, Input, ViewEncapsulation, ElementRef } from '@angular/core';

@Component({
  // selector: 'app-external-dashboard-tile',
  templateUrl: './external-dashboard-tile.component.html',
  styleUrls: ['./external-dashboard-tile.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ExternalDashboardTileComponent {

  @Input() a: number;
  @Input() b: number;
  @Input() c: number;

  private id: string;
  private _vehicle: any;

  constructor(private el: ElementRef) {
  }
}
