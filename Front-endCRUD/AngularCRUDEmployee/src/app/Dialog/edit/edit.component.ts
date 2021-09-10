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
 
  employee = new Model;
  UpdateEmployee:any;
  NewEmployee: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    position: new FormControl(''),
    emialAddress:new FormControl(''),
    phoneNumber: new FormControl(''),
    state: new FormControl(''),
    city: new FormControl('')});
  constructor(@Inject(MAT_DIALOG_DATA) public Employee:Model,private fb:FormBuilder,private ServicesService: ServicesService,public dialog: MatDialog) { }

  ngOnInit(): void {
    
    this.ServicesService.GetEmployeeById(this.Employee.employeeID).subscribe(result=>{

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
  this.UpdateEmployee.patchValue(this.Employee)

}
EditEmployee(FormData:any){

  this.ServicesService.EditmployeeByID(this.employee.employeeID,FormData.value).subscribe(UpdatedEmployee=>{

    
   
    console.log(UpdatedEmployee);

  })
  this.dialog.closeAll();
 this.refresh();
}
refresh() {
  window.location.reload()
}
}
