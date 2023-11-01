import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator'
export interface PeriodicElement {
  name: string;
  createdDate: Date;
  createdBy: string;
  modifiedDate: Date;
  modifiedBy: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Unit 1', createdDate: new Date('12/11/2020'), createdBy: 'John Doe X', modifiedDate: new Date('12/15/2020'), modifiedBy: 'John Doe Z', status: 'Active' },
  { name: 'Unit 2', createdDate: new Date('05/11/2022'), createdBy: 'John Doe Y', modifiedDate: new Date('05/15/2022'), modifiedBy: 'John Doe Z1', status: 'In Active' },
];
@Component({
  selector: 'searchUnit',
  templateUrl: 'searchUnit.html',
  styleUrls: ['searchUnit.css']
})
export class SearchUnit {
  @ViewChild(MatSort) sort: MatSort;
  constructor(public dialog: MatDialog) { }
  myControl = new FormControl('');
  options: string[] = ['Camp Hill', 'Mechanicsburg', 'Carlisle'];
  optionsType: string[] = ['SCI', 'CCC', 'Parole'];
  displayedColumns: string[] = ['name', 'createdDate', 'createdBy', 'modifiedDate', 'modifiedBy', 'status', 'editUnit'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  length = 2;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25, 50, 100];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent: PageEvent;
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  openDeactivate() {
    this.dialog.open(UnitDeleteModalPopup);
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

@Component({
  selector: 'unitDeleteModalPopup',
  templateUrl: 'unitDeleteModalPopup.html'
})
export class UnitDeleteModalPopup { }


@Component({
  selector: 'searchUnitModalPopup',
  templateUrl: 'searchUnitModalPopup.html'
})
export class SearchUnitModalPopup {
  textFormControl = new FormControl('', [Validators.required, Validators.minLength(1)]);
  myControl = new FormControl('');
  matcher = new MyErrorStateMatcher()
  unitNameValue = '';
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
