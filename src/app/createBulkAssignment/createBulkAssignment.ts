import { Component, QueryList, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as _ from 'lodash';
import { MatTableDataSource } from '@angular/material/table';
import { Staff } from '../staff';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator'
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
export interface PeriodicElement {
  id: number,
  doc: number;
  parole: number;
  name: string;
  housingUnit: string;
  unitManager: string
}

let ELEMENT_DATA_STAFF: any;

const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, doc: 5768979, parole: 203023, name: 'John Paul', housingUnit: 'Unit 1', unitManager: 'John Doe' },
  { id: 2, doc: 9890709, parole: 424280, name: 'John David', housingUnit: 'Unit 2', unitManager: 'John Doe' },
];



@Component({
  selector: 'createBulkAssignment',
  templateUrl: 'createBulkAssignment.html'
})
export class CreateBulkAssignment {
  @ViewChild(MatSort) sort: MatSort;
  public enableStaffView: boolean = false;
  @ViewChildren('myCheckbox') private myCheckboxes: QueryList<any>;
  myControl = new FormControl('');
  dataSourceStaff: MatTableDataSource<Staff>;
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  options: string[] = ['Camp Hill', 'Mechanicsburg', 'Carlisle'];
  staffNameOptions: string[] = ['Koritala, Prasannanjaneyulu', 'Harbart-Thomas, Patricia', 'Chellappa, Umashankar', 'Rajamani, Swaminathan',
    'Wang, Jun', 'Sabulsky, Kathleen', 'Nipple, Beth', 'Shaik, Sheralli'];
  staffTypeOptions: string[] = ['Counselors', 'BCC Counselors', 'Parole Manager'];
  displayedColumns: string[] = ['selectUnit', 'doc', 'parole', 'reentrantName', 'housingUnit', 'unitManager'];

  length = 2;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25, 50, 100];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent: PageEvent;
  constructor(public dialog: MatDialog) {
    this.dataSourceStaff = new MatTableDataSource<Staff>();
    this.dataSource.data = ELEMENT_DATA;
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  selectUnit(data: any, value: any, index: any, element: any) {
    let myCheckboxes = this.myCheckboxes.toArray();
    data ? this.selection.toggle(element) : null
    if (value) {
      myCheckboxes[index].checked = true;
      this.enableStaffView = true;
    } else {
      myCheckboxes[index].checked = false;
      let checkboxEnabled = 0;
      _.forEach(myCheckboxes, function (checkboxValue) {
        if (checkboxValue.checked == true) {
          checkboxEnabled++;
        }
      })
      if (checkboxEnabled == 0) {
        this.enableStaffView = false;
      }
    }
  }

  addStaff() {
    this.dialog.open(ReassignModalPopupBulk);
  }

}

@Component({
  selector: 'reassignModalPopupBulk',
  templateUrl: 'reassignModalPopupBulk.html'
})
export class ReassignModalPopupBulk {
  myControl = new FormControl('');
  staffNameOptions: string[] = ['Koritala, Prasannanjaneyulu', 'Harbart-Thomas, Patricia', 'Chellappa, Umashankar', 'Rajamani, Swaminathan',
    'Wang, Jun', 'Sabulsky, Kathleen', 'Nipple, Beth', 'Shaik, Sheralli'];
}

