import { Component, QueryList, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as _ from 'lodash';
import { MatTableDataSource } from '@angular/material/table';
import { UnitManager } from '../unitManager';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'viewUnitManagerAssignment',
  templateUrl: 'viewUnitManagerAssignment.html'
})
export class ViewUnitManagerAssignment {

  @ViewChildren('myCheckbox') private myCheckboxes: QueryList<any>;
  myControl = new FormControl('');
  dataSourceStaff: MatTableDataSource<UnitManager>;
  ELEMENT_DATA_STAFF = [
    { name: 'John Doe', assignedLocation: 'Camp Hill', createdDate: new Date('12/11/2020'), endDate: undefined },
    { name: 'John Smith', assignedLocation: 'Mechanicsburg', createdDate: new Date('05/11/2022'), endDate: new Date('12/11/2024') },
  ];
  displayedColumnsStaff: string[] = ['assignedLocation', 'name', 'createdDate', 'endDate'];
  staffNameOptions: string[] = ['Koritala, Prasannanjaneyulu', 'Harbart-Thomas, Patricia', 'Chellappa, Umashankar', 'Rajamani, Swaminathan',
    'Wang, Jun', 'Sabulsky, Kathleen', 'Nipple, Beth', 'Shaik, Sheralli'];
  panelOpenState = false;
  constructor(public dialog: MatDialog) {
    this.dataSourceStaff = new MatTableDataSource<UnitManager>();
  }

  ngOnInit() {
    this.dataSourceStaff.data = this.ELEMENT_DATA_STAFF;
  }

  deleteStaff(data: any) {
    this.dialog.open(ReassignModalPopup);
  }

  addStaff() {
    this.dialog.open(ReassignModalPopup);
  }

}

@Component({
  selector: 'reassignModalPopup',
  templateUrl: 'reassignModalPopup.html'
})
export class ReassignModalPopup {
  myControl = new FormControl('');
  staffNameOptions: string[] = ['Koritala, Prasannanjaneyulu', 'Harbart-Thomas, Patricia', 'Chellappa, Umashankar', 'Rajamani, Swaminathan',
    'Wang, Jun', 'Sabulsky, Kathleen', 'Nipple, Beth', 'Shaik, Sheralli'];
}

