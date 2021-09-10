import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { DeleteComponent } from 'src/app/Dialog/delete/delete.component';
import { EditComponent } from 'src/app/Dialog/edit/edit.component';
import { Model } from 'src/app/Model/Model';
import { ServicesService } from 'src/app/Services/services.service';
import { AddComponent } from '../../Dialog/add/add.component';
import { ViewComponent } from '../view/view.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  employees :any[]=[] ;
  DataSource : MatTableDataSource<any> = new MatTableDataSource<any>(this.employees);
  resultsLength:number= 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs:Observable<any> = new Observable<any>();



  constructor(private ServicesService: ServicesService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.GetAllEmployees();

  }
  GetAllEmployees() {
    this.ServicesService.GetAllEmployees().subscribe(Employees => {

      this.DataSource.data = Employees;
      this.obs = this.DataSource.connect();
      this.DataSource.paginator = this.paginator;
      this.resultsLength = this.employees.length;


    },
      error => {
        console.log("Error (GetAllData) :: " + error)
      },
    );

  }
  AddNewEmployee() {
    this.dialog.open(AddComponent);

  }

  DeleteEmployee(Employee: Model) {
    this.dialog.open(DeleteComponent, {
      data:
      {
        employeeID: Employee.employeeID,
        firstName: Employee.firstName,
        lastName: Employee.lastName,
        position: Employee.position,
        emialAddress: Employee.emialAddress,
        phoneNumber: Employee.phoneNumber,
        state: Employee.state,
        city: Employee.city

      }
    });
  }
  EditEmployee(Employee: Model) {
    this.dialog.open(EditComponent, {
      data:
      {
        employeeID: Employee.employeeID,
        firstName: Employee.firstName,
        lastName: Employee.lastName,
        position: Employee.position,
        emialAddress: Employee.emialAddress,
        phoneNumber: Employee.phoneNumber,
        state: Employee.state,
        city: Employee.city

      }
    });
    console.log(Employee.employeeID + " From parent component")
  }
  ViewEmployee(Employee: any) {
    this.dialog.open(ViewComponent, {
      data:
      {
        employeeID: Employee.employeeID,
        firstName: Employee.firstName,
        lastName: Employee.lastName,
        position: Employee.position,
        emialAddress: Employee.emialAddress,
        phoneNumber: Employee.phoneNumber,
        state: Employee.state,
        city: Employee.city

      }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.DataSource.filter = filterValue.trim().toLowerCase();

    if (this.DataSource.paginator) {
      this.DataSource.paginator.firstPage();
    } 
   }
 

}
