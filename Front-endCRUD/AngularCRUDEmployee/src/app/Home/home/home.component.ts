import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { DeleteComponent } from 'src/app/Dialog/delete/delete.component';
import { EditComponent } from 'src/app/Dialog/edit/edit.component';
import { Model } from 'src/app/Model/Model';
import { ServicesService } from 'src/app/Services/services.service';
import { AddComponent } from '../../Dialog/add/add.component';
import { VERSION } from '@angular/core';
import { ViewComponent } from 'src/app/Dialog/view/view.component';
import { switchMap } from 'rxjs-compat/operator/switchMap';
import { InfoComponent } from 'src/app/Dialog/info/info.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  //employees: any[] = [];
  DataSource: MatTableDataSource<any> = new MatTableDataSource<any>(

  );
  resultsLength: number = 0;
  RefreshEmployees = new BehaviorSubject<boolean>(true)
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  angularVersion = VERSION.full;
  employees: Observable<any> = new Observable<any>();


  constructor(
    private ServicesService: ServicesService,
    private dialog: MatDialog,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // this.employees = this.RefreshEmployees.pipe(switchMap(this.ServicesService.GetAllEmployees())).subscribe();
    this.GetAllEmployees()
    console.log(VERSION.full);

  }
  GetAllEmployees() {
    this.ServicesService.GetAllEmployees().subscribe(
      (Employees) => {
        this.DataSource.data = Employees;
        this.employees = this.DataSource.connect();
        this.DataSource.paginator = this.paginator;
        this.resultsLength = this.DataSource.data.length;
        // this.ref.detectChanges();
      },
      (error) => {
        console.log('Error (GetAllData) :: ' + error);
      }
    );
  }
  AddNewEmployee() {
    this.dialog.open(AddComponent);
    // this.ref.detectChanges();

  }
  GetInfo() {
    this.dialog.open(InfoComponent);
  }

  DeleteEmployee(Employee: Model) {
    this.dialog.open(DeleteComponent, {
      data: {
        employeeID: Employee.employeeID,
        firstName: Employee.firstName,
        lastName: Employee.lastName,
        position: Employee.position,
        emialAddress: Employee.emialAddress,
        phoneNumber: Employee.phoneNumber,
        state: Employee.state,
        city: Employee.city,
      },
    });
    // this.ref.detectChanges();

  }
  EditEmployee(Employee: Model) {
    this.dialog.open(EditComponent, {
      data: {
        employeeID: Employee.employeeID,
        firstName: Employee.firstName,
        lastName: Employee.lastName,
        position: Employee.position,
        emialAddress: Employee.emialAddress,
        phoneNumber: Employee.phoneNumber,
        state: Employee.state,
        city: Employee.city,
      },
    });
    // this.ref.detectChanges();

    console.log(Employee.employeeID + ' From parent component');
  }
  ViewEmployee(Employee: any) {
    this.dialog.open(ViewComponent, {
      data: {
        employeeID: Employee.employeeID,
        firstName: Employee.firstName,
        lastName: Employee.lastName,
        position: Employee.position,
        emialAddress: Employee.emialAddress,
        phoneNumber: Employee.phoneNumber,
        state: Employee.state,
        city: Employee.city,
      },
    });
  }
  applyFilter(event: Event) {
    console.log("Filting")
    const filterValue = (event.target as HTMLInputElement).value;
    this.DataSource.filter = filterValue.trim().toLowerCase();

    if (this.DataSource.paginator) {
      this.DataSource.paginator.firstPage();
    }
  }
}
