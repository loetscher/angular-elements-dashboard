import { NgModule, ModuleWithProviders, APP_INITIALIZER } from '@angular/core';
import { B9eAgGridEncapsulatedComponent } from './b9e-ag-grid-encapsulated.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { B9eAgGridConfig } from './configuration/b9e-ag-grid-configuration';
import { B9eAgGridInitService, B9eAgGridConfigService } from './configuration/b9e-ag-grid-configuration.service';


export function initializeModule(appInitService: B9eAgGridInitService) {
    const result = (): Promise<any> => {
        return appInitService.initClient();
    }
    return result;
}

@NgModule({
    declarations: [B9eAgGridEncapsulatedComponent],
    imports: [
        CommonModule,
        BrowserModule,
        HttpClientModule,
        AgGridModule.withComponents([]),
    ],
    exports: [B9eAgGridEncapsulatedComponent]
})
export class B9eAgModule {
    static withConfiguration(config: B9eAgGridConfig): ModuleWithProviders {
        return {
            ngModule: B9eAgModule,
            providers: [
                B9eAgGridInitService,
                {
                    provide: B9eAgGridConfigService,
                    useValue: config
                },
                { provide: APP_INITIALIZER, useFactory: initializeModule, deps: [B9eAgGridInitService], multi: true }
            ]
        };
    }
}
