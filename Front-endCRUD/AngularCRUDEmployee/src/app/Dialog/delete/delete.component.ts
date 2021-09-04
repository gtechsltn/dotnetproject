import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Model } from 'src/app/Model/Model';
import { ServicesService } from 'src/app/Services/services.service';


@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
 // EmployeeID:any;
  constructor(@Inject(MAT_DIALOG_DATA) public Employee:Model,private ServicesService: ServicesService,public dialog: MatDialog) { }
  
  ngOnInit(): void {
    console.log(this.Employee.firstName);
    console.log(this.Employee.lastName);
  }
  DeleteEmployee(Employee:Model){
   console.log(Employee.employeeID+" From delete component");
   this.ServicesService.DeleteEmployeeByID(Employee.employeeID).subscribe((Response)=>{
     this.DeleteEmployee = Response
     console.log(this.DeleteEmployee)
   })
   this.dialog.closeAll()
    this.refresh();
  }

   refresh() 
  {
    window.location.reload()
  }
}


