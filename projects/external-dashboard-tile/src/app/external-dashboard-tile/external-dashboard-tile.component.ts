import { Component, Input, ViewEncapsulation, OnInit, AfterViewInit, NgZone, EventEmitter, Output, ElementRef } from '@angular/core';
import { BackendService } from '../service/backend.service';
import { GridOptions } from 'ag-grid-community';
import { B9e, MessageType } from 'b9e-api';
import { HttpClient } from '@angular/common/http';

@Component({
  // selector: 'app-external-dashboard-tile',
  templateUrl: './external-dashboard-tile.component.html',
  styleUrls: ['./external-dashboard-tile.component.scss'],
  encapsulation: ViewEncapsulation.Native
})
export class ExternalDashboardTileComponent implements OnInit, AfterViewInit {

  @Input() a: number;
  @Input() b: number;
  @Input() c: number;


  @Output()
  cancelWfl = new EventEmitter<string>();
  @Input()
  b9eApi: B9e;
  @Input()
  activityConfId: string;

  private id: string;
  private _vehicle: any;
  private _gridOptions: GridOptions;
  columnDefs: any;
  autoGroupColumnDef: any;
  rowData: any;

  constructor(private el: ElementRef,
    private http: HttpClient,
    private backenService: BackendService,
    private zone: NgZone) {
      console.log('init!');
      this.columnDefs = [
        { headerName: 'Make', field: 'make', sortable: true, editable: true, resizable: true },
        { headerName: 'Model', field: 'model', sortable: true, editable: true, resizable: true },
        { headerName: 'Price', field: 'price', sortable: true, editable: true }
      ];
  }

  ngOnInit(): void {
    this.zone.run(() => console.log('run zone within angular'));
    this.zone.runOutsideAngular(() => console.log('run zone outside angular'));
    this.rowData = this.http.get('https://api.myjson.com/bins/ly7d1');
  }

  ngAfterViewInit() {
    if (this.activityConfId) {
      this.id = this.activityConfId;
      this.loadVehicle(this.id );
    }
  }

  onGridReady(params) {
    // const gridColumnApi = params.columnApi;
    // const allColumnIds = [];
    // gridColumnApi.getAllColumns().forEach(column => allColumnIds.push(column.colId));
    // gridColumnApi.autoSizeColumns(allColumnIds);
    params.api.sizeColumnsToFit();
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
