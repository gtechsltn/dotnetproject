import { Component, OnInit ,Inject} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Model } from 'src/app/Model/Model';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
 
  constructor(@Inject(MAT_DIALOG_DATA) public Employee:Model,private fb:FormBuilder,public dialog: MatDialog) { }

  ngOnInit(): void {
    console.log(this.Employee.firstName);
    console.log(this.Employee.lastName);

  }

}
