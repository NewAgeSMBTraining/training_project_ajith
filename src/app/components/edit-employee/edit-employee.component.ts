
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { AddUser } from 'src/app/model/adduser.model';
import { DialogResponse } from 'src/app/model/dialog.model';
import { ApiService } from 'src/app/service/api.service';
import { DialogComponent } from 'src/app/shared_components/dialog/dialog.component';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {
  employeeobj: AddUser = new AddUser;
  userData!: FormGroup;
  constructor(protected ref: NbDialogRef<DialogComponent>,
    
    private fb:FormBuilder,
    private api:ApiService
    ) { }

  ngOnInit(): void {
    
    this.userData = this.fb.group({
      id: [''],
      role_id: [''],
      first_name: ['',Validators.required],
      last_name: ['',Validators.required],
      email: ['',[Validators.required, Validators.email]],
      phone_code: [''],
      phone: ['',[Validators.required,Validators.pattern('[0-9]{10}')]],
      password: ['',[Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]],
      
      
    })
    
    
    
    
  }
  
  dismiss(status: boolean) {
    let result: DialogResponse = { status: status, data: {} };
    this.ref.close(result);
  }
 

  updatedata() {

    this.employeeobj.role_id = this.userData.value.role_id;
    this.employeeobj.first_name = this.userData.value.first_name;
    this.employeeobj.last_name = this.userData.value.last_name;
    
    this.employeeobj.phone_code = this.userData.value.phone_code;
    this.employeeobj.phone = this.userData.value.phone;

    this.api.editList(this.employeeobj, this.employeeobj.id ).subscribe((res) => {
      console.log(res);
      if (res.message == "Updated") {
        alert("Employee data updated")
       

      }
    },(err)=>{
      alert("Error in updating data" + err.error.message)
    })

  }
}
