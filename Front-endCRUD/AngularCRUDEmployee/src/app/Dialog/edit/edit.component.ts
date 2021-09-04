import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Model } from 'src/app/Model/Model';
import { ServicesService } from 'src/app/Services/services.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  UpdateEmployee = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    position: new FormControl(''),
    emialAddress: new FormControl(''),
    state: new FormControl(''),
    city: new FormControl(''),    
  });
  employee = new Model;
  
  constructor(@Inject(MAT_DIALOG_DATA) public Employee:Model,private fb:FormBuilder,private ServicesService: ServicesService,public dialog: MatDialog) { }

  ngOnInit(): void {
    
    this.ServicesService.GetEmployeeById(this.Employee.employeeID).subscribe(result=>{

      // this.Employee;
      this.employee = result;
      this.employee.employeeID = result.employeeID;
     
      console.log(this.employee);

    })
    this.UpdateEmployee=this.fb.group(
      {
      firstName:['',Validators.required],
      lastName: ['',Validators.required],
      position: ['',Validators.required],
      emialAddress:['',Validators.required],
      phoneNumber: ['',Validators.required],
      state:['',Validators.required],
      city: ['',Validators.required]
  }
  )
  this.UpdateEmployee.setValue(
    {
      firstName:[this.Employee.firstName],
      lastName:[this.Employee.lastName],
      position:[this.Employee.position],
      emialAddress:[this.Employee.emialAddress],
      phoneNumber:[this.Employee.phoneNumber],
      state:[this.Employee.state],
      city: [this.Employee.city],
    }
    )

  //this.UpdateEmployee.patchValue(this.UpdateEmployee)

}
EditEmployee(FormData:any){

  console.log(this.employee)
  this.ServicesService.EditmployeeByID(this.employee.employeeID,FormData).subscribe()
}
}
