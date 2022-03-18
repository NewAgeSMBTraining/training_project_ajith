import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { FormBuilder } from '@angular/forms';
import { LogUser } from 'src/app/model/adduser.model';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  
  
  employeeData: any = [];
  updateObj: LogUser = new LogUser
  constructor(private api:ApiService, private fb:FormBuilder, private toast:ToastService) { }

  ngOnInit(): void {
    this.loggedinUser()
    //this.log()
  }
updateUser=this.fb.group({
  id: [''],
  role_id: [''],
  first_name: [''],
  last_name: [''],
  email:[''],
  phone_code: [''],
  phone: [''],
 
  
})

loggedinUser(){
  this.api.loggedinDetails().subscribe((res)=>{
   
    this.employeeData = res;
    console.log(this.employeeData);
    
  },(err)=>{
    this.toast.error(err.error.message)
  })
}
edit(data:any){
 

  this.updateUser.controls["role_id"].setValue(data.role_id)
  this.updateUser.controls["first_name"].setValue(data.first_name)
  this.updateUser.controls["last_name"].setValue(data.last_name)
  this.updateUser.controls["email"].setValue(data.email)
  this.updateUser.controls["phone_code"].setValue(data.phone_code)
  this.updateUser.controls["phone"].setValue(data.phone)
  
}

updatelist() {

  this.updateObj.role_id = this.updateUser.value.role_id;
  this.updateObj.first_name = this.updateUser.value.first_name;
  this.updateObj.last_name = this.updateUser.value.last_name;
  this.updateObj.email = this.updateUser.value.email;
  this.updateObj.phone_code = this.updateUser.value.phone_code;
  this.updateObj.phone = this.updateUser.value.phone;

  this.api.updateLoggedinDetails(this.updateObj).subscribe((res) => {
    console.log(res);
    if (res.message == "Updated") {
      this.toast.primary("Employee data updated")
      this.loggedinUser()
    }    
  },(err)=>{
    this.toast.error("Error updating data" + err.error.message)
  })

}



}

//storing in localstorage
// log(){
// this.e =localStorage.getItem("Data")
// console.log(this.e);

  
// }

