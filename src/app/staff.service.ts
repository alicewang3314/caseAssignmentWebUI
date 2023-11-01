import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class StaffService {
  staffDetails = [
    { id: 1, name: 'Harikrishnan Gopal Janakiraman' },
    { id: 2, name: 'Naik Nikunj' },
    { id: 3, name: 'Wang Jun' }
  ];
  constructor() { }
  searchingValue(value: any) {
    return of(this.staffDetails.filter(staffName => staffName.name.replace(/[\s]/g, '').toLowerCase().indexOf(value.toLowerCase()) === 0));
  }
}