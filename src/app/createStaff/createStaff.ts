import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Unit } from '../unit';
import { ErrorStateMatcher } from '@angular/material/core';
import * as _ from 'lodash';
import { StaffService } from '../staff.service';
import { Observable, of } from 'rxjs';
import { debounceTime, tap, switchMap, filter, map, startWith, distinctUntilChanged } from 'rxjs/operators';
import { Staff } from '../staff';
import { EmployeeSearchDialogComponent } from './employee-search-dialog/employee-search-dialog.component';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'createStaff',
  templateUrl: 'createStaff.html'
})

export class CreateStaff {
  textFormControl = new FormControl('', [Validators.required, Validators.minLength(1)]);
  staffSearchForm: FormGroup;
  LastNameValue = '';
  FirstNameValue = '';
  searchResult: any[] = [];
  staffName: any[] = [];
  staffList: any[] = [];
  dataSourceStaff: MatTableDataSource<Staff>;
  enableStaffView: boolean = false;
  enableStaffSearch: boolean = false;
  displayedColumnsStaff: string[] = ['name', 'deleteStaff'];
  dataSource = this.staffList;
  leftColumnVal = [{ name: 'Abigail', value: 'PM' }, { name: 'Alexandra', value: 'PM1' }, { name: 'Alison', value: 'BA' }, { name: 'Amanda', value: 'BA1' }, { name: 'Amelia', value: 'Developer' }, { name: 'Amy', value: 'Tester' }, { name: 'Anne', value: 'Team Lead' }, { name: 'Carol', value: 'Tester 1' }, { name: 'Deirdre', value: 'PM 3' }, { name: 'Caroline', value: 'IT Manager' }];
  rightColumnVal = []
  leftColumnName = 'Employee';
  rightColumnName = 'Unit Manager';

  newToRightEx1: string = '';
  newToLeftEx1: string = '';
  newToRightEx2: string = '';
  newToRightEx3: string = '';
  constructor(private fb: FormBuilder, private staffService: StaffService, private dialog: MatDialog) {
    this.dataSourceStaff = new MatTableDataSource<Staff>();
  }
  myControl = new FormControl('');
  options: string[] = ['PM', 'PM2', 'Tester1', 'Tester2', 'IT Manager'];
  ngOnInit() {
    this.staffService.staffDetails.filter(name => {
      this.staffName.push(name);
    });
    this.staffSearchForm = this.fb.group({
      searchSection: ''
    })
    this.onChanges();
    this.dataSourceStaff.data = this.staffList;
  }
  openEmployeeSearchDialog(): void {
    const dialogRef = this.dialog.open(EmployeeSearchDialogComponent, {
      height: '720px',
      width: '80%',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onStaffChange(data: any) {
    if (data != undefined && data != null) {
      if (data.option.value.length > 0) {
        this.enableStaffSearch = true
      }
      else {
        this.enableStaffSearch = false
      }
    }
    else {
      this.enableStaffSearch = false;
    }
  }

  onStaffAdded(data: any) {
    if (data != undefined && data != null) {
      if (data.option.value.length > 0) {
        if (_.includes(this.staffList, data.option.value) != true) {
          this.staffList.push(data.option.value);
          this.enableStaffView = true;
        }
      }
    }
    this.dataSourceStaff.data = this.staffList;
  }

  onChanges() {
    const searchSection = this.staffSearchForm.get('searchSection');

    if (!searchSection) return;

    searchSection.valueChanges.pipe(
      filter((data: string) => data.trim().length >= 0),
      debounceTime(500),
      switchMap((id: string) => {
        return id ? this.staffService.searchingValue(id.replace(/[\s]/g, '')) : of([]);
      })
    ).subscribe((data: any) => {
      this.searchResult = data as Array<{}>;
    })
  }

  deleteStaff(data: any) {
    _.remove(this.staffList, function (value: any) {
      if (data == value) {
        return true;
      }
      else {
        return false;
      }
    })
    if (this.staffList.length == 0) {
      this.enableStaffView = false;
    }
    this.dataSourceStaff.data = this.staffList;
  }
  getNewValue(value: any) {
    const { newToLeft, newToRight } = value;
    this.newToLeftEx1 = newToLeft.toString();
    this.newToRightEx1 = newToRight.toString();
  }

  matcher = new MyErrorStateMatcher()
}
