import { Component, QueryList, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as _ from 'lodash';
import { MatTableDataSource } from '@angular/material/table';
import { Staff } from '../staff';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator'
import { MatSort, MatSortModule } from '@angular/material/sort';
import { AfterViewInit, ViewChild } from '@angular/core';
export interface PeriodicElement {
  name: string;
  createdDate: Date;
  createdBy: string
}

let ELEMENT_DATA_STAFF: any;

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Unit 1', createdDate: new Date('12/11/2020'), createdBy: 'John Doe' },
  { name: 'Unit 2', createdDate: new Date('05/11/2022'), createdBy: 'John Doe' },
];



@Component({
  selector: 'viewStaffAssignment',
  templateUrl: 'viewStaffAssignment.html'
})
export class ViewStaffAssignment {
  @ViewChild(MatSort) sort: MatSort;
  public enableStaffView: boolean = false;
  @ViewChildren('myCheckbox') private myCheckboxes: QueryList<any>;
  myControl = new FormControl('');
  dataSourceStaff: MatTableDataSource<Staff>;
  ELEMENT_DATA_STAFF = [
    { name: 'John Doe', staffType: 'BCC Counselor', createdDate: new Date('12/11/2020'), createdBy: 'Paul Xyz' },
    { name: 'John Smith', staffType: 'Counselor', createdDate: new Date('05/11/2022'), createdBy: 'Paul XYZ' },
  ];
  options: string[] = ['Camp Hill', 'Mechanicsburg', 'Carlisle'];
  displayedColumns: string[] = ['name', 'createdDate', 'createdBy', 'view'];
  displayedColumnsStaff: string[] = ['name', 'staffType', 'createdDate', 'createdBy', 'deleteStaff'];
  staffTypeOptions: string[] = ['Counselors', 'BCC Counselors', 'Parole Manager'];
  UnitOptions: string[] = ['Unit A', 'Unit B', 'Unit C'];
  dataSource = ELEMENT_DATA;
  length = 2;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25, 50, 100];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent: PageEvent;
  constructor() {
    this.dataSourceStaff = new MatTableDataSource<Staff>();
  }

  ngOnInit() {
    this.dataSourceStaff.data = this.ELEMENT_DATA_STAFF;
  }

  ngAfterViewInit() {
    this.dataSourceStaff.sort = this.sort;
  }

  selectUnit(data: any, value: any, index: any) {
    let myCheckboxes = this.myCheckboxes.toArray();
    if (value) {
      let count = 0;
      _.forEach(ELEMENT_DATA, function (data) {
        myCheckboxes[count].checked = false;
        count++;
      })
      myCheckboxes[index].checked = true;
      this.enableStaffView = true;
    } else {
      myCheckboxes[index].checked = false;
      this.enableStaffView = false;
    }
  }

  deleteStaff(data: any) {
    _.remove(this.ELEMENT_DATA_STAFF, function (item: any) {
      if (data.name == item.name) {
        return data;
      }
    })
    this.dataSourceStaff.data = this.ELEMENT_DATA_STAFF;
  }

  viewStaff(data: any) {

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
}

