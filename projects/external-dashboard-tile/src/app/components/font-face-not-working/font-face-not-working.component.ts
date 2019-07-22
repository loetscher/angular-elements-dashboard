import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-font-face-not-working',
  templateUrl: './font-face-not-working.component.html',
  styleUrls: ['./font-face-not-working.component.scss'],
  encapsulation: ViewEncapsulation.Native
})
export class FontFaceNotWorkingComponent implements OnInit {

  private basePath = 'assets/external-dashboard-tile/';

  constructor() { }

  ngOnInit() {
  }


  public loadWebFond() {
    // load css is needed for IconMoon Font loading as @font-face: is not supported in shadow dom... :-(
    // see https://bugs.chromium.org/p/chromium/issues/detail?id=336876
    const styles = document.createElement('link');
    styles.rel = 'stylesheet';
    styles.href = `${this.basePath}styles.css`;
    document.head.appendChild(styles);
  }

}
