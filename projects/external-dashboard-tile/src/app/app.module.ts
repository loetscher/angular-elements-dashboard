import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { ExternalDashboardTileComponent } from './external-dashboard-tile/external-dashboard-tile.component';
import { createCustomElement } from '@angular/elements';
import { HttpClientModule } from '@angular/common/http';
import { BackendService } from './service/backend.service';
import { AgGridModule } from 'ag-grid-angular';
import { B9eAgGridEncapsulatedComponent } from './components/b9e-ag-grid-encapsulated/b9e-ag-grid-encapsulated.component';

@NgModule({
   imports: [
      BrowserModule,
      HttpClientModule,
      AgGridModule.withComponents([])
   ],
   declarations: [
    ExternalDashboardTileComponent,
    B9eAgGridEncapsulatedComponent
   ],
   providers: [BackendService],
   bootstrap: [],
   entryComponents: [
       ExternalDashboardTileComponent
   ]
})
export class AppModule {

    constructor(private injector: Injector) {
    }

    ngDoBootstrap() {
        const externalTileCE = createCustomElement(ExternalDashboardTileComponent, { injector: this.injector });
        customElements.define('b9e-web-component', externalTileCE);
    }

}
