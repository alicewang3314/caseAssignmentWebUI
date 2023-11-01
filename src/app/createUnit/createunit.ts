import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Unit } from '../unit';
import { FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import * as _ from 'lodash';

export interface PeriodicElement {
  name: any | null;
}
let ELEMENT_DATA: any;
let unitNameValue: any;

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'createUnit',
  templateUrl: 'createUnit.html',
  styleUrls: ['createUnit.css'],
})


export class CreateUnit implements OnInit {
  unitNameValue = '';
  textFormControl = new FormControl('', [Validators.required, Validators.minLength(1)]);
  tableData: MatTableDataSource<Unit>;
  myControl = new FormControl('');
  ELEMENT_DATA = [{ 'name': 'Unit 1' }];
  displayedColumns: string[] = ['name', 'deleteUnit'];
  constructor() {
    this.tableData = new MatTableDataSource<Unit>();
  }

  ngOnInit() {
    this.tableData.data = this.ELEMENT_DATA;
  }
  onAdd() {
    this.ELEMENT_DATA.push({ name: this.unitNameValue });
    this.tableData.data = this.ELEMENT_DATA;
  }

  removeUnit(data: any) {
    _.remove(this.ELEMENT_DATA, function (item: any) {
      if (data.name == item.name) {
        return data;
      }
    })
    this.tableData.data = this.ELEMENT_DATA;
  }



  matcher = new MyErrorStateMatcher()
}

