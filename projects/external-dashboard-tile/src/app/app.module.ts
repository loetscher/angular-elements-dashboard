import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ExternalDashboardTileComponent } from './external-dashboard-tile/external-dashboard-tile.component';
import { createCustomElement } from '@angular/elements';
import { HttpClientModule } from '@angular/common/http';
import { BackendService } from './service/backend.service';
import { FontFaceNotWorkingComponent } from './components/font-face-not-working/font-face-not-working.component';
import { B9eAgModule } from './components/b9e-ag-grid-encapsulated/b9e-ag-grid.module';
// import { /*BsKitModule, BsAgGridModule,*/ BsKitWebComponentsModule } from '@bison/biskin-kit';
import { AboutComponent } from './components/about/about.component';
import { TestComponent } from './components/test/test.component';
// import { BsAgGridModule } from '@bison/biskin-kit/lib/ag-grid/bs-ag-grid.module';

const appRoutes: Routes = [
    { path: ':id',
      component: AboutComponent
    },
    { path: '', component: TestComponent },
    // ,
    // { path: ':id',
    //     component: TestComponent
    // }
  ];

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        // enables ag-grid wrapped in a web component
        B9eAgModule.withConfiguration({
            usedAsWebComponent: true
        }),
        // BsKitWebComponentsModule,
        // BsKitModule,
        // BsAgGridModule.withConfiguration({
        //     enableWebComponentSupport: true
        // }),
        // BsAgGridModule,
        // disabled automatic font-face loading
        // B9eAgModule
    ],
    declarations: [
        ExternalDashboardTileComponent,
        FontFaceNotWorkingComponent,
        AboutComponent,
        TestComponent
    ],
    providers: [BackendService,
        { provide: LocationStrategy, useClass: HashLocationStrategy}
    ],
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
