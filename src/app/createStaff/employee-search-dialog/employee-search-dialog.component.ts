import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-employee-search-dialog',
  templateUrl: './employee-search-dialog.component.html',
  styleUrls: ['./employee-search-dialog.component.scss']
})
export class EmployeeSearchDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EmployeeSearchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  pbppImageSrc = '../assets/img/PBPP_Resampled.png';
  docImageSrc = '../assets/img/Corrections-keystone-DOC.jpg';
  employeeList: any[] = [];
  employeePagedList: any[] = [];
  breakpoint: number = 3;  //to adjust to screen
  // MatPaginator Inputs
  length: number = 0;
  pageSize: number = 3;  //displaying three cards each row
  pageSizeOptions: number[] = [3, 6];

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 800) ? 1 : 3;
    this.employeeList = [{ name: 'Shaik, Sheralli', status: 'Active', agency: 'DOC', location: 'pennsylvania', classification: 'AAA' },
    { name: 'Shaik, Abdul', status: 'InActive', agency: 'DOC', location: 'pennsylvania', classification: 'BBB' },
    { name: 'Shaik, Naik', status: 'InActive', agency: 'PBPP', location: 'pennsylvania', classification: 'CCC' },
    { name: 'Shaik, Khan', status: 'Active', agency: 'PBPP', location: 'pennsylvania', classification: 'DDD' }, { name: 'Shaik, Sheralli', status: 'Active', agency: 'DOC', location: 'pennsylvania', classification: 'AAA' },
    { name: 'Shaik, Abdul', status: 'InActive', agency: 'DOC', location: 'pennsylvania', classification: 'BBB' },
    { name: 'Shaik, Naik', status: 'InActive', agency: 'PBPP', location: 'pennsylvania', classification: 'CCC' },
    { name: 'Shaik, Khan', status: 'Active', agency: 'PBPP', location: 'pennsylvania', classification: 'DDD' }, { name: 'Shaik, Sheralli', status: 'Active', agency: 'DOC', location: 'pennsylvania', classification: 'AAA' },
    { name: 'Shaik, Abdul', status: 'InActive', agency: 'DOC', location: 'pennsylvania', classification: 'BBB' },
    { name: 'Shaik, Naik', status: 'InActive', agency: 'PBPP', location: 'pennsylvania', classification: 'CCC' },
    { name: 'Shaik, Khan', status: 'Active', agency: 'PBPP', location: 'pennsylvania', classification: 'DDD' }];
    this.employeePagedList = this.employeeList.slice(0, 3);
    this.length = this.employeeList.length;
  }


  OnPageChange(event: PageEvent) {
    let startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.length) {
      endIndex = this.length;
    }
    this.employeePagedList = this.employeeList.slice(startIndex, endIndex);
  }

  onResize(event) { //to adjust to screen size
    this.breakpoint = (event.target.innerWidth <= 800) ? 1 : 3;
  }
}
