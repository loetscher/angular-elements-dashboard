import { Component, Input, ViewEncapsulation, OnInit, AfterViewInit, NgZone, EventEmitter, Output, ElementRef } from '@angular/core';
import { BackendService } from '../service/backend.service';
import { GridOptions } from 'ag-grid-community';
import { ApiB9e, MessageType } from 'api-b9e';

@Component({
  // selector: 'app-external-dashboard-tile',
  templateUrl: './external-dashboard-tile.component.html',
  styleUrls: ['./external-dashboard-tile.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ExternalDashboardTileComponent implements OnInit, AfterViewInit {

  @Input() a: number;
  @Input() b: number;
  @Input() c: number;


  @Output()
  cancelWfl = new EventEmitter<string>();
  @Input()
  b9eApi: ApiB9e;
  @Input()
  activityConfId: string;

  private id: string;
  private _vehicle: any;
  private _gridOptions: GridOptions;

  constructor(private el: ElementRef,
    private backenService: BackendService,
    private zone: NgZone) {
      console.log('init!');
      this._gridOptions = <GridOptions>{};
      this._gridOptions.columnDefs = [
          {
              headerName: 'ID',
              field: 'id',
              width: 100
          },
          {
              headerName: 'Value',
              field: 'value',
              width: 100
          },

      ];
      this._gridOptions.rowData = [
          {id: 5, value: 10},
          {id: 10, value: 15},
          {id: 15, value: 20}
      ];
  }

  ngOnInit(): void {
    this.zone.run(() => console.log('run zone within angular'));
    this.zone.runOutsideAngular(() => console.log('run zone outside angular'));
  }

  ngAfterViewInit() {
    if (this.activityConfId) {
      this.id = this.activityConfId;
      this.loadVehicle(this.id );
    }
  }

  get vehicle(): any {
    return this._vehicle;
  }

  get gridOptions(): any {
    return this._gridOptions;
  }

  public cancelWorkflowNG() {
    this.cancelWfl.emit('cancel workflow (EventEmmitter)');
  }

  public cancelWorkflow() {
    const customEvent = new CustomEvent('CustomWebcomponentEvent', {
      bubbles: true, cancelable: true, detail: 'cancel workflow (dispatched)' });
    this.el.nativeElement.dispatchEvent(customEvent);
  }

  public cancelWorkflowAPI() {
    this.b9eApi.wflEngine.cancel();
  }

  public showMessage() {
    this.b9eApi.showMessage(MessageType.WARNING, 'Title', 'Message');
  }

  private loadVehicle(objId: string, entity = 'VEH') {
    this.backenService.getDetailEntryById(entity, objId).subscribe(record => {
      if (record && record.data) {
        this._vehicle = record.data[0];
      }
  });
  }
}
