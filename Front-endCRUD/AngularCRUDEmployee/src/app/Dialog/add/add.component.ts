import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Model } from 'src/app/Model/Model';
import { ServicesService } from 'src/app/Services/services.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';



@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
   
    NewEmployee: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    position: new FormControl(''),
    emialAddress:new FormControl(''),
    phoneNumber: new FormControl(''),
    state: new FormControl(''),
    city: new FormControl('')});
  constructor(private fb:FormBuilder, private ServicesService: ServicesService,public dialog: MatDialog) { 
    
  }
    Employee:any;
  ngOnInit() {
    
 
      this.NewEmployee=this.fb.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      position: ['',Validators.required],
      emialAddress:['',Validators.required],
      phoneNumber: ['',Validators.required],
      state: ['',Validators.required],
      city: ['',Validators.required],
      

    })
  }
  AddNewEmployee(FormData:any){
    this.ServicesService.AddNewEmployee(FormData.value).subscribe(
    (Response) =>
    {
      this.Employee = Response;
      console.log(this.Employee.employeeID); 
      
    },
    (error)=>
    {
     console.log(error);
    });
    console.log(this.NewEmployee.value);
   this.dialog.closeAll()
   this.refresh()
  }
   refresh() {
    window.location.reload()
  }
}




