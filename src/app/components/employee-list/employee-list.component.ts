import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AddUser } from '../../model/adduser.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  employeeList: any = [];
  employeeobj: AddUser = new AddUser

  constructor(private api: ApiService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.employeedata()
  }

  userData = this.fb.group({
    id: [''],
    role_id: [''],
    first_name: ['',Validators.required],
    last_name: ['',Validators.required],
    email: ['',[Validators.required, Validators.email]],
    phone_code: [''],
    phone: ['',[Validators.required,Validators.pattern('[0-9]{10}')]],
    password: ['',[Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]],

  })
  employeedata() {
    this.api.getList().subscribe(res => {
      console.log(res)
      this.employeeList = res;
    })
  }


   user(userData: any) {
    console.log("user data data is", userData);

    const data = {
      role_id: userData.value.role_id,
      first_name: userData.value.first_name,
      last_name: userData.value.last_name,
      email: userData.value.email,
      phone_code: userData.value.phone_code,
      phone: userData.value.phone,
      password: userData.value.password
    }

     this.api.addUserData(data).subscribe((res: any) => {
      console.log(res);
      if (res.message == "Created") {
        alert("User data added")
        this.employeedata();
        this.userData.reset()
      }

    }, (err) => {
      alert("Error in adding data" + err.error.message)
    })

  }

  editdata(data: any) {
    this.userData.controls["role_id"].setValue(data.role_id)
    this.userData.controls["first_name"].setValue(data.first_name)
    this.userData.controls["last_name"].setValue(data.last_name)
    this.userData.controls["email"].setValue(data.email)
    this.userData.controls["phone_code"].setValue(data.phone_code)
    this.userData.controls["phone"].setValue(data.phone)
    this.userData.controls["password"].setValue(data.password)
    this.employeeobj.id = data.id;

  }
  updatedata() {

    this.employeeobj.role_id = this.userData.value.role_id;
    this.employeeobj.first_name = this.userData.value.first_name;
    this.employeeobj.last_name = this.userData.value.last_name;
    this.employeeobj.email = this.userData.value.email;
    this.employeeobj.phone_code = this.userData.value.phone_code;
    this.employeeobj.phone = this.userData.value.phone;

    this.api.editList(this.employeeobj, this.employeeobj.id).subscribe((res) => {
      console.log(res);
      if (res.message == "Updated") {
        alert("Employee data updated")
        this.employeedata();

      }
    },(err)=>{
      alert("Error in updating data" + err.error.message)
    })

  }
  deletedata(data: any) {
    this.api.deleteList(data.id).subscribe((res) => {
      console.log(res);
      if (res.message == "Deleted") {
        alert("User data deleted")
        this.employeedata();
      }
    }, (err) => {
      alert("Error in deleting data" + err.error.message)
    })
  }

  logout(){
    localStorage.clear()
    alert("Logged out")
    this.router.navigateByUrl('/login')
  }

}
