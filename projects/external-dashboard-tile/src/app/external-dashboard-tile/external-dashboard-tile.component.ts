import { Component,
  Input,
  ViewEncapsulation,
  OnDestroy,
  OnInit,
  AfterViewInit,
  NgZone,
  EventEmitter,
  Output,
  ElementRef } from '@angular/core';
import { BackendService } from '../service/backend.service';
import { B9e, MessageType, DeploymentEnvironment} from 'b9e-api';
import { applyTheme, Theme } from '@bison/biskin-kit';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  // selector: 'app-external-dashboard-tile',
  templateUrl: './external-dashboard-tile.component.html',
  styleUrls: ['./external-dashboard-tile.component.scss'],
  // encapsulation: ViewEncapsulation.Emulated
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ExternalDashboardTileComponent implements OnInit, OnDestroy, AfterViewInit {

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
    private zone: NgZone,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
      console.log('init!');
      this.b9eApi = {
        user: {
          language: 'de',
          locale: 'de-CH'
        },
        deploymentEnvironment: 'dev'
      } as B9e;

      this.router.events.subscribe(e => {
          console.log(e);
      });
      console.log(`activated route is: ${this.activatedRoute.pathFromRoot}`);
  }

  ngOnInit(): void {
    this.zone.run(() => console.log('run zone within angular'));
    this.zone.runOutsideAngular(() => console.log('run zone outside angular'));
  }

  ngOnDestroy(): void {
    console.log('web component destroyed');
  }

  ngAfterViewInit() {
    console.log(this.b9eApi);
    if (this.activityConfId) {
      this.id = this.activityConfId;
      this.loadVehicle(this.id );
    }

    if (this.b9eApi && this.b9eApi.deploymentEnvironment) {
      let theme: Theme;
      const deploymentEnvironment = this.b9eApi.deploymentEnvironment;
      switch (deploymentEnvironment) {
        case DeploymentEnvironment.DEV:
          theme = 'dev';
          break;
        case DeploymentEnvironment.EDUC:
          theme = 'educ';
          break;
        case DeploymentEnvironment.REL:
          theme = 'rel';
          break;
        case DeploymentEnvironment.TEST:
          theme = 'test';
          break;
        case DeploymentEnvironment.PROD:
        default:
            theme = 'prod';

      }
      applyTheme(theme);
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
    let msgType: MessageType;
    msgType = MessageType.INFORMATION;
    this.b9eApi.showMessage(msgType, 'Title', 'Message');
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
