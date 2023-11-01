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

let unitNameValue: any;

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'editUnit',
  templateUrl: 'editUnit.html',
})


export class EditUnit implements OnInit {
  unitNameValue = '';
  options: string[] = ['Camp Hill', 'Mechanicsburg', 'Carlisle'];
  optionsType: string[] = ['SCI', 'CCC', 'Parole'];
  textFormControl = new FormControl('', [Validators.required, Validators.minLength(1)]);

  myControl = new FormControl('');

  constructor() {

  }

  ngOnInit() {
  }




  matcher = new MyErrorStateMatcher()
}

