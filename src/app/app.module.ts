import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialExampleModule } from '../material.module';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { SearchUnit, SearchUnitModalPopup } from './searchUnit/searchUnit';
import { CreateUnit } from './createUnit/createunit';
import { MatIconModule } from '@angular/material/icon';
import { ViewStaffAssignment } from './viewStaffAssignment/viewStaffAssignment';
import { StaffService } from './staff.service';
import { CreateStaff } from './createStaff/createStaff';
import { ViewUnitManagerAssignment } from './viewUnitManagerAssignment/viewUnitManagerAssignment';
import { CreateBulkAssignment } from './createBulkAssignment/createBulkAssignment';
import { UnitDeleteModalPopup } from './searchUnit/searchUnit';
import { HeaderComponent, FooterComponent, NavigationComponent, NotificationComponent } from './commonUI';
import { ReassignModalPopup } from './viewUnitManagerAssignment/viewUnitManagerAssignment';
import { EditUnit } from './editUnit/editUnit';
import { EmployeeSearchDialogComponent } from './createStaff/employee-search-dialog/employee-search-dialog.component';
import { ReassignModalPopupBulk } from './createBulkAssignment/createBulkAssignment';
import { DoubleDirectionSelectComponent } from 'src/app/components';

@NgModule({
  declarations: [
    AppComponent, SearchUnit, CreateUnit,
    ViewStaffAssignment, ViewUnitManagerAssignment, CreateStaff,
    CreateBulkAssignment,
    UnitDeleteModalPopup,
    ReassignModalPopup, SearchUnitModalPopup,
    EditUnit, ReassignModalPopupBulk,
    EmployeeSearchDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    FormsModule,
    HttpClientModule,
    MaterialExampleModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    NavigationComponent,
    HeaderComponent,
    FooterComponent,
    NotificationComponent,
    DoubleDirectionSelectComponent
  ],
  providers: [StaffService],
  bootstrap: [AppComponent]
})
export class AppModule { }
