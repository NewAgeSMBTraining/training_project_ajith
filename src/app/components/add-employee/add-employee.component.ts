import { Component, OnInit } from '@angular/core';
import {DialogResponse} from  '../../model/dialog.model'
import { NbDialogRef } from '@nebular/theme';
import { DialogComponent } from 'src/app/shared_components/dialog/dialog.component';
import { ApiService } from 'src/app/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
 userData!:FormGroup;
 roles:any=[];
 

  constructor(protected ref: NbDialogRef<DialogComponent>, 
    private fb:FormBuilder, 
    private api:ApiService, 
    private toast:ToastService
    ) { }

  ngOnInit(): void {
 
      this.roledata()
      this.userData = this.fb.group({
        id: [''],
        role_id: ['',Validators.required],
        first_name: ['',Validators.required],
        last_name: ['',Validators.required],
        email: ['',[Validators.required, Validators.email]],
        phone_code: ['', Validators.required],
        phone: ['',[Validators.required,Validators.pattern('[0-9]{10}')]],
        password: ['',[Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]],
    
        
      })
    
    
    
  }
  dismiss(status: boolean) {
    let result: DialogResponse = { status: status, data: {} };
    this.ref.close(result);
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
        this.toast.primary("User data added")
        this.userData.reset();
        
      }

    }, (err) => {
     this.toast.error("Error in adding data" + err.error.message)
    })

  }
  roledata(){
    this.api.getRoles().subscribe(res=>{
      console.log(res);
      this.roles=res.data.roles;
      return this.roles;
    })
  }


 


}
