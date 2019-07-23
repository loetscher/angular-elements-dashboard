import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExternalDashboardTileService {

  private basePath = 'assets/external-dashboard-tile/';

  constructor() { }

  loaded = false;

  load(): void {
    if (this.loaded) {
      return;
    }
    // load css
    // load css is needed for IconMoon Font loading as @font-face: is not supported in shadow dom... :-(
    // see https://bugs.chromium.org/p/chromium/issues/detail?id=336876
    // const styles = document.createElement('link');
    // styles.rel = 'stylesheet';
    // styles.href = `${this.basePath}styles.css`;
    // document.head.appendChild(styles);
    // load js
    const script = document.createElement('script');
    script.src = `${this.basePath}main-es5.js?noCache=${Math.random()}`;
    document.body.appendChild(script);
    this.loaded = true;
  }
}
