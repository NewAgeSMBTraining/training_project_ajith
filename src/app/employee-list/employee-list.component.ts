import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Signup } from '../signup.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  
  employeeList: any = [];
  employeeobj: Signup = new Signup
  
  constructor(private api: ApiService, private fb:FormBuilder) { }
  
  ngOnInit(): void {
    this.employeedata()
  }

  signupData = this.fb.group({
    id:[''],
    role_id:[''],
    first_name:[''],
    last_name:[''],
    email:[''],
    phone_code:[''],
    phone:[''],
    password:['']

  })
  employeedata() {
    this.api.getList().subscribe(res => {
      console.log(res)
      this.employeeList = res;
      
      

    })
  }


  signUp(signupData:any) {
    console.log("sign up data is", signupData);

    const data = {
      role_id: signupData.value.role_id,
      first_name: signupData.value.first_name,
      last_name: signupData.value.last_name,
      email: signupData.value.email,
      phone_code: signupData.value.phone_code,
      phone: signupData.value.phone,
      password: signupData.value.password
    }

    this.api.signupData(data).subscribe((res: any) => {
      console.log(res);
      if (res.message == "Created") {
        alert("User data added")
        this.employeedata();
        this.signupData.reset()

      } 
      
     

    }, (err) => {
      alert("Error in sending data"+err)
    })

  }

  editdata(data:any){
    this.signupData.controls["role_id"].setValue(data.role_id)
    this.signupData.controls["first_name"].setValue(data.first_name)
    this.signupData.controls["last_name"].setValue(data.last_name)
    this.signupData.controls["email"].setValue(data.email)
    this.signupData.controls["phone_code"].setValue(data.phone_code)
    this.signupData.controls["phone"].setValue(data.phone)
    this.signupData.controls["password"].setValue(data.password)
  }
  updatedata(){
    this.employeeobj.role_id = this.signupData.value.role_id;
    this.employeeobj.first_name = this.signupData.value.first_name;
    this.employeeobj.last_name = this.signupData.value.last_name;
    this.employeeobj.email = this.signupData.value.email;
    this.employeeobj.phone_code = this.signupData.value.phone_code;
    this.employeeobj.phone = this.signupData.value.phone;
    
    this.api.editList(this.employeeobj, this.employeeobj.id).subscribe((res)=>{
      console.log(res);
      
    })
    
}
// deletedata(data:any){
//   this.api.deleteList(data.id).subscribe((res)=>{
//     console.log(res);
//     if (res.message == "Deleted") {
//       alert("User data deleted")
//       this.employeedata();

//     } 
    
   

//   }, (err) => {
//     alert("Error in sending data"+err)
//   })
    
 

// }
}
