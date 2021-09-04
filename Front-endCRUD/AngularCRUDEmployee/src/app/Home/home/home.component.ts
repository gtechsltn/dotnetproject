import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
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
  Employees: any = '';
  dataSource = new MatTableDataSource(this.Employees)
 // Employees: any = [{ "employeeID": 17, "firstName": "Sidi ", "lastName": "MED", "position": "C# developer", "emialAddress": "elhacen@gmail.com", "phoneNumber": "554-545-454", "state": " KY", "city": "Lousiville" }, { "employeeID": 18, "firstName": "Sidi ", "lastName": "MED", "position": "C# developer", "emialAddress": "elhacen@gmail.com", "phoneNumber": "554-545-454", "state": " KY", "city": "NEW york" }, { "employeeID": 20, "firstName": "Elhacen", "lastName": "Elmoustapha", "position": "C#/java/c/developer", "emialAddress": "elhacen@gmail.com", "phoneNumber": "11111111", "state": " KY", "city": "Lousiville" }, { "employeeID": 21, "firstName": "Elhacen", "lastName": "Elmoustapha", "position": "C#/java/c/developer", "emialAddress": "elhacen@gmail.com", "phoneNumber": "11111111", "state": " KY", "city": "Lousiville" }, { "employeeID": 22, "firstName": "Elhacen", "lastName": "Elmoustapha", "position": "C#/java/c/developer", "emialAddress": "elhacen@gmail.com", "phoneNumber": "11111111", "state": " KY", "city": "Lousiville" }, { "employeeID": 23, "firstName": "Elhacen", "lastName": "Elmoustapha", "position": "C#/java/c/developer", "emialAddress": "elhacen@gmail.com", "phoneNumber": "11111111", "state": " KY", "city": "Lousiville" }, { "employeeID": 24, "firstName": "Elhacen", "lastName": "Elmoustapha", "position": "C#/java/c/developer", "emialAddress": "elhacen@gmail.com", "phoneNumber": "11111111", "state": " KY", "city": "Lousiville" }, { "employeeID": 25, "firstName": "Elhacen", "lastName": "Elmoustapha", "position": "C#/java/c/developer", "emialAddress": "elhacen@gmail.com", "phoneNumber": "11111111", "state": " KY", "city": "Lousiville" }, { "employeeID": 26, "firstName": "Elhacen", "lastName": "Elmoustapha", "position": "C#/java/c/developer", "emialAddress": "elhacen@gmail.com", "phoneNumber": "11111111", "state": " KY", "city": "Lousiville" }, { "employeeID": 27, "firstName": "Elhacen", "lastName": "Elmoustapha", "position": "C#/java/c/developer", "emialAddress": "elhacen@gmail.com", "phoneNumber": "11111111", "state": " KY", "city": "Lousiville" }, { "employeeID": 28, "firstName": "Elhacen", "lastName": "Elmoustapha", "position": "C#/java/c/developer", "emialAddress": "elhacen@gmail.com", "phoneNumber": "11111111", "state": " KY", "city": "Lousiville" }, { "employeeID": 29, "firstName": "Elhacen", "lastName": "Elmoustapha", "position": "C#/java/c/developer", "emialAddress": "elhacen@gmail.com", "phoneNumber": "11111111", "state": " KY", "city": "Lousiville" }, { "employeeID": 30, "firstName": "Elhacen", "lastName": "Elmoustapha", "position": "C#/java/c/developer", "emialAddress": "elhacen@gmail.com", "phoneNumber": "11111111", "state": " KY", "city": "Lousiville" }, { "employeeID": 31, "firstName": "Elhacen", "lastName": "Elmoustapha", "position": "C#/java/c/developer", "emialAddress": "elhacen@gmail.com", "phoneNumber": "11111111", "state": " KY", "city": "Lousiville" }, { "employeeID": 32, "firstName": "Elhacen", "lastName": "Elmoustapha", "position": "C#/java/c/developer", "emialAddress": "elhacen@gmail.com", "phoneNumber": "11111111", "state": " KY", "city": "Lousiville" }, { "employeeID": 33, "firstName": "Elhacen", "lastName": "Elmoustapha", "position": "C#/java/c/developer", "emialAddress": "elhacen@gmail.com", "phoneNumber": "11111111", "state": " KY", "city": "Lousiville" }, { "employeeID": 34, "firstName": "Elhacen", "lastName": "Elmoustapha", "position": "C#/java/c/developer", "emialAddress": "elhacen@gmail.com", "phoneNumber": "11111111", "state": " KY", "city": "Lousiville" }, { "employeeID": 35, "firstName": "Elhacen", "lastName": "Elmoustapha", "position": "C#/java/c/developer", "emialAddress": "elhacen@gmail.com", "phoneNumber": "11111111", "state": " KY", "city": "Lousiville" }, { "employeeID": 36, "firstName": "Elhacen", "lastName": "Elmoustapha", "position": "C#/java/c/developer", "emialAddress": "elhacen@gmail.com", "phoneNumber": "11111111", "state": " KY", "city": "Lousiville" }, { "employeeID": 37, "firstName": "Elhacen", "lastName": "Elmoustapha", "position": "C#/java/c/developer", "emialAddress": "elhacen@gmail.com", "phoneNumber": "11111111", "state": " KY", "city": "Lousiville" }];
  DataSource = new MatTableDataSource(this.Employees);

  constructor(private ServicesService: ServicesService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.GetAllEmployees();
  }
  GetAllEmployees() {
    this.ServicesService.GetAllEmployees().subscribe((Employees) => {

      this.Employees = Employees;


    },
      error => {
        console.log("Error (GetAllData) :: " + error)
      },
    );

  }
  AddNewEmployee() {
    this.dialog.open(AddComponent);

  }
 
  DeleteEmployee(Employee:Model) {
    this.dialog.open(DeleteComponent,{
      data:
      {
        employeeID:Employee.employeeID,
        firstName:Employee.firstName,
        lastName:Employee.lastName,
        position:Employee.position,
        emialAddress:Employee.emialAddress,
        phoneNumber:Employee.phoneNumber,
        state:Employee.state,
        city:Employee.city

      }
    });
    console.log(Employee.employeeID+" From parent component")
  }
  EditEmployee(Employee:Model) {
    this.dialog.open(EditComponent,{
      data:
      {
        employeeID:Employee.employeeID,
        firstName:Employee.firstName,
        lastName:Employee.lastName,
        position:Employee.position,
        emialAddress:Employee.emialAddress,
        phoneNumber:Employee.phoneNumber,
        state:Employee.state,
        city:Employee.city

      }
    });
    console.log(Employee.employeeID+" From parent component")
  }
  ViewEmployee(Employee:any) {
    this.dialog.open(ViewComponent,{
      data:
      {
        employeeID:Employee.employeeID,
        firstName:Employee.firstName,
        lastName:Employee.lastName,
        position:Employee.position,
        emialAddress:Employee.emialAddress,
        phoneNumber:Employee.phoneNumber,
        state:Employee.state,
        city:Employee.city

      }
    });
    console.log(Employee.employeeID+" From parent component")
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(filterValue);
  }

}
