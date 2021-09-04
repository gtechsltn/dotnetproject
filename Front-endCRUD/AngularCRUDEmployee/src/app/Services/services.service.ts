import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Injectable, } from '@angular/core';
import { Observable ,BehaviorSubject} from 'rxjs';
import { Model } from '../Model/Model';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  URL = 'https://localhost:44301/api/employee';
  EmployeeID:number=0;
  constructor(private http: HttpClient) {
    
   }

  public GetAllEmployees():Observable<any> {
    return this.http.get(this.URL);
  }
  public GetEmployeeById(EmployeeID:number):Observable<Model> {
    return this.http.get<Model>(this.URL+"/"+EmployeeID);
  }
  public AddNewEmployee(Form:Model):Observable<any>{
    
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(Form);
       return this.http.post(this.URL,body,{'headers':headers});
  }
  public DeleteEmployeeByID(Employee:number):Observable<any>{
    this.EmployeeID=Employee;
    return this.http.delete(this.URL+'/'+`${this.EmployeeID}`)
  }
  public EditmployeeByID(EmployeeID:number,UpdatEmployeeForm:Model):Observable<Model>{

    const headers = { 'content-type': 'application/json'}  

    return this.http.put<any>(this.URL+'/'+`${EmployeeID}`,UpdatEmployeeForm);
  }
}
