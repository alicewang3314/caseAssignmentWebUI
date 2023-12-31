import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUnit } from './createUnit/createunit';
import { SearchUnit } from './searchUnit/searchUnit';
import { ViewStaffAssignment } from './viewStaffAssignment/viewStaffAssignment';
import { CreateStaff } from './createStaff/createStaff';
import { ViewUnitManagerAssignment } from './viewUnitManagerAssignment/viewUnitManagerAssignment';
import { CreateBulkAssignment } from './createBulkAssignment/createBulkAssignment';
import { EditUnit } from './editUnit/editUnit';

const routes: Routes = [
  { path: '', redirectTo: '/searchUnit', pathMatch: 'full' },
  { path: 'searchUnit', component: SearchUnit },
  { path: 'createUnit', component: CreateUnit },
  { path: 'viewStaffAssignment', component: ViewStaffAssignment },
  { path: 'createStaff', component: CreateStaff },
  { path: 'viewUnitManagerAssignment', component: ViewUnitManagerAssignment },
  { path: 'createBulkAssignment', component: CreateBulkAssignment },
  { path: 'editUnit', component: EditUnit },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
