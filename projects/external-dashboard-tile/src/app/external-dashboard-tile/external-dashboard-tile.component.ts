import { Component, Input, ViewEncapsulation, OnInit, AfterViewInit, NgZone, EventEmitter, Output, ElementRef } from '@angular/core';
import { BackendService } from '../service/backend.service';

@Component({
  // selector: 'app-external-dashboard-tile',
  templateUrl: './external-dashboard-tile.component.html',
  styleUrls: ['./external-dashboard-tile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ExternalDashboardTileComponent implements OnInit, AfterViewInit {

  @Input() a: number;
  @Input() b: number;
  @Input() c: number;


  @Output()
  cancelWfl = new EventEmitter<string>();
  @Input()
  activityConf: any;
  @Input()
  activityConfId: string;

  private id: string;
  private _vehicle: any;

  constructor(private el: ElementRef,
    private backenService: BackendService,
    private zone: NgZone) {
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
  public cancelWorkflowNG() {
    this.cancelWfl.emit('cancel workflow (EventEmmitter)');
  }

  public cancelWorkflow() {
    const customEvent = new CustomEvent('CustomWebcomponentEvent', {
      bubbles: true, cancelable: true, detail: 'cancel workflow (dispatched)' });
    this.el.nativeElement.dispatchEvent(customEvent);
  }

  private loadVehicle(objId: string, entity = 'VEH') {
    this.backenService.getDetailEntryById(entity, objId).subscribe(record => {
      if (record && record.data) {
        this._vehicle = record.data[0];
      }
  });
  }
}
