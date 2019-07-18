import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GridOptions, ColDef } from 'ag-grid-community';
import { ViewEncapsulation } from '@angular/compiler/src/core';

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
      { headerName: 'Make', field: 'make', sortable: true, editable: true, resizable: true },
      { headerName: 'Model', field: 'model', sortable: true, editable: true, resizable: true },
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
}
