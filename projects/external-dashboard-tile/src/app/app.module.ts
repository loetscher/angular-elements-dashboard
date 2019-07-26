import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { ExternalDashboardTileComponent } from './external-dashboard-tile/external-dashboard-tile.component';
import { createCustomElement } from '@angular/elements';
import { HttpClientModule } from '@angular/common/http';
import { B9eAgModule } from './components/b9e-ag-grid-encapsulated/b9e-ag-grid.module';

@NgModule({
   imports: [
      BrowserModule,
      HttpClientModule,
        // enables ag-grid wrapped in a web component
        B9eAgModule.withConfiguration({
            usedAsWebComponent: true
        })
        // disabled automatic font-face loading
        // B9eAgModule
   ],
   declarations: [
       ExternalDashboardTileComponent
   ],
   providers: [],
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
