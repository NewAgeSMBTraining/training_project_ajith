
import { Component, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { AddUser } from 'src/app/model/adduser.model';
import { DialogResponse } from 'src/app/model/dialog.model';
import { ApiService } from 'src/app/service/api.service';
import { ToastService } from 'src/app/service/toast.service';
import { DialogComponent } from 'src/app/shared_components/dialog/dialog.component';


@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {
  
  public data:any;
  employeeobj: AddUser = new AddUser;
  userData!: FormGroup;
  constructor(protected ref: NbDialogRef<DialogComponent>,
    
    private fb:FormBuilder,
    private api:ApiService,
    private toast:ToastService
    ) { }

  ngOnInit(): void {
    
    console.log(this.data);
    
    this.userData = this.fb.group({
      
      role_id: [''],
      first_name: ['',Validators.required],
      last_name: ['',Validators.required],
      email: ['',[Validators.required, Validators.email]],
      phone_code: [''],
      phone: ['',[Validators.required,Validators.pattern('[0-9]{10}')]],
      
      
      
    })
    ;
    
   
    let editData = JSON.parse(this.data)
    
    if(editData){
      this.userData.controls['role_id'].setValue(editData.role_id)
      this.userData.controls['first_name'].setValue(editData.first_name)
      this.userData.controls['last_name'].setValue(editData.last_name)
      this.userData.controls['email'].setValue(editData.email)
      this.userData.controls['phone_code'].setValue(editData.phone_code)
      this.userData.controls['phone'].setValue(editData.phone)
      this.employeeobj.id=editData.id
    }
 
    
    
  }
  
  dismiss(status: boolean) {
    let result: DialogResponse = { status: status, data: {} };
    this.ref.close(result);
  }
 
  
  updatedata() {

    this.api.editList(this.userData.value, this.employeeobj.id).subscribe((res) => {
      console.log(res);
      if (res.message == "Updated") {
        this.toast.primary("Employee data updated")
       

      }
    },(err)=>{
      this.toast.error("Error in updating data" + err.error.message)
    })

  }
}
