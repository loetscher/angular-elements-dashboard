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
    const styles = document.createElement('link');
    styles.rel = 'stylesheet';
    styles.href = `${this.basePath}styles.css`;
    document.head.appendChild(styles);
    // load js
    const script = document.createElement('script');
    script.src = `${this.basePath}external-dashboard-tile.bundle.js`;
    document.body.appendChild(script);
    this.loaded = true;
  }
}
