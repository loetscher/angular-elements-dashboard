import { Injectable, Inject, InjectionToken } from '@angular/core';
import { B9eAgGridConfig } from './b9e-ag-grid-configuration';
import { balhamFontFace, balhamVersion } from './fontface-style';


/**
 * This is not a real service, but it looks like it from the outside.
 * It's just an InjectionTToken used to import the config object, provided from the outside
 */
export const B9eAgGridConfigService = new InjectionToken<B9eAgGridConfig>('B9eAgGridConfig');

const agGridFontFaceMarker = 'data-balham-font';

@Injectable()
export class B9eAgGridInitService {

  constructor(@Inject(B9eAgGridConfigService) private config: B9eAgGridConfig) {
    console.log('client will be initialised...');
    // this.initClient();
  }

  /**
   * Initializes the client
   */
  public initClient(): Promise<void> {

    return new Promise<void>((resolve, reject) => {
      console.table(this.config);
      console.log('B9eAgGridService.initClient() called');

      if (this.config.usedAsWebComponent) {
        const fontFaceElements = document.querySelectorAll(`[${agGridFontFaceMarker}='${balhamVersion}']`);
        if (fontFaceElements.length === 0) {
          // load css is needed for IconMoon Font loading as @font-face: is not supported in shadow dom... :-(
          // see https://bugs.chromium.org/p/chromium/issues/detail?id=336876
          const fontFaceStyle = document.createElement('style');
          fontFaceStyle.setAttribute(agGridFontFaceMarker, balhamVersion);
          fontFaceStyle.type = 'text/css';
          fontFaceStyle.appendChild(document.createTextNode(balhamFontFace));
          document.head.appendChild(fontFaceStyle);
        }
      }
      resolve();
  });
  }
}
