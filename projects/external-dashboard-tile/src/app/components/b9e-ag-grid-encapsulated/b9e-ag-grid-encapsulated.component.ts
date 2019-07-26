import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GridOptions, ColDef } from 'ag-grid-community';
import { balhamFontFace } from './configuration/fontface-style';

function createFlagImg(flag) {
  return '<img border="0" width="15" height="10" src="https://flags.fmcdn.net/data/flags/mini/' + flag + '.png"/>';
}

@Component({
  selector: 'app-b9e-ag-grid-encapsulated',
  templateUrl: './b9e-ag-grid-encapsulated.component.html',
  styleUrls: ['./b9e-ag-grid-encapsulated.component.scss'],
  encapsulation: ViewEncapsulation.Native
})
export class B9eAgGridEncapsulatedComponent implements OnInit {

  private _gridOptions: GridOptions;
  columnDefs: ColDef[];
  rowData: any;

  constructor(private http: HttpClient) {
    this.columnDefs = [
      { headerName: 'Make', suppressMenu: false, field: 'make', sortable: true, editable: true, resizable: true },
      { headerName: 'Model', menuTabs: ['filterMenuTab', 'generalMenuTab', 'columnsMenuTab'],
        field: 'model', sortable: true, editable: true, resizable: true },
      { headerName: 'Price', field: 'price', sortable: true, editable: true }
    ];
  }

  ngOnInit(): void {
    this.rowData = this.http.get('https://api.myjson.com/bins/ly7d1');
  }

  onGridReady(params) {
    // const gridColumnApi = params.columnApi;
    // const allColumnIds = [];
    // gridColumnApi.getAllColumns().forEach(column => allColumnIds.push(column.colId));
    // gridColumnApi.autoSizeColumns(allColumnIds);
    params.api.sizeColumnsToFit();
  }

  get gridOptions(): any {
    return this._gridOptions;
  }

  public injectFont() {
    // load css is needed for IconMoon Font loading as @font-face: is not supported in shadow dom... :-(
    // see https://bugs.chromium.org/p/chromium/issues/detail?id=336876
    const fontFaceStyle = document.createElement('style');
    fontFaceStyle.type = 'text/css';
    fontFaceStyle.appendChild(document.createTextNode(balhamFontFace));
    document.head.appendChild(fontFaceStyle);
  }

  getContextMenuItems(params) {
    const result = [
      {
        name: 'Alert ' + params.value,
        action: function() {
          window.alert('Alerting about ' + params.value);
        },
        cssClasses: ['redFont', 'bold']
      },
      {
        name: 'Always Disabled',
        disabled: true,
        tooltip: 'Very long tooltip, did I mention that I am very long, well I am! Long!  Very Long!'
      },
      {
        name: 'Country',
        subMenu: [
          {
            name: 'Ireland',
            action: function() {
              console.log('Ireland was pressed');
            },
            icon: createFlagImg('ie')
          },
          {
            name: 'UK',
            action: function() {
              console.log('UK was pressed');
            },
            icon: createFlagImg('gb')
          },
          {
            name: 'France',
            action: function() {
              console.log('France was pressed');
            },
            icon: createFlagImg('fr')
          }
        ]
      },
      {
        name: 'Person',
        subMenu: [
          {
            name: 'Niall',
            action: function() {
              console.log('Niall was pressed');
            }
          },
          {
            name: 'Sean',
            action: function() {
              console.log('Sean was pressed');
            }
          },
          {
            name: 'John',
            action: function() {
              console.log('John was pressed');
            }
          },
          {
            name: 'Alberto',
            action: function() {
              console.log('Alberto was pressed');
            }
          },
          {
            name: 'Tony',
            action: function() {
              console.log('Tony was pressed');
            }
          },
          {
            name: 'Andrew',
            action: function() {
              console.log('Andrew was pressed');
            }
          },
          {
            name: 'Kev',
            action: function() {
              console.log('Kev was pressed');
            }
          },
          {
            name: 'Will',
            action: function() {
              console.log('Will was pressed');
            }
          },
          {
            name: 'Armaan',
            action: function() {
              console.log('Armaan was pressed');
            }
          }
        ]
      },
      'separator',
      {
        name: 'Windows',
        shortcut: 'Alt + W',
        action: function() {
          console.log('Windows Item Selected');
        },
        icon: ''
      },
      {
        name: 'Mac',
        shortcut: 'Alt + M',
        action: function() {
          console.log('Mac Item Selected');
        },
        icon: ''
      },
      'separator',
      {
        name: 'Checked',
        checked: true,
        action: function() {
          console.log('Checked Selected');
        },
        icon: ''
      },
      'copy',
      'separator',
      'chartRange'
    ];
    return result;
  }

}
