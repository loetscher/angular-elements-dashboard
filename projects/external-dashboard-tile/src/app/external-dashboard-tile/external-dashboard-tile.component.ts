import { Component, Input, ViewEncapsulation, OnInit, AfterViewInit, NgZone, EventEmitter, Output, ElementRef } from '@angular/core';
import { BackendService } from '../service/backend.service';
import { B9e, MessageType } from 'b9e-api';

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
  b9eApi: B9e;
  @Input()
  activityConfId: string;

  private id: string;
  private _vehicle: any;

  constructor(private el: ElementRef,
    private backenService: BackendService,
    private zone: NgZone) {
      console.log('init!');
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

  // Workflow
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

  public startDefaultWorkflow() {
    this.b9eApi.wflEngine.startDefaultWfl('PER', '1005000000002q57');
  }

  public startDefaultSubWfl() {
    this.b9eApi.wflEngine.startDefaultSubWfl('PER');
  }

  public startSubWfl() {
    this.b9eApi.wflEngine.startSubWfl('pp8y', '1005000000002q57');
  }

  private loadVehicle(objId: string, entity = 'VEH') {
    this.backenService.getDetailEntryById(entity, objId).subscribe(record => {
      if (record && record.data) {
        this._vehicle = record.data[0];
      }
  });
  }
}
