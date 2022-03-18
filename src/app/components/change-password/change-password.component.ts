import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangePassword } from 'src/app/model/adduser.model';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/toast.service';



@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changepasswordobj: ChangePassword = new ChangePassword
  constructor(private api:ApiService, private fb:FormBuilder, private router:Router, private toast:ToastService) { }

  ngOnInit(): void {
  }


  changePasswordForm = this.fb.group({
    password:['',[Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]],
    confirm_password:['', Validators.required],
    old_password:['', Validators.required]
  },
  {
    validators: this.mustMatch('password', 'confirm_password')
  }
  )

  changePassword(){
    this.changepasswordobj.old_password = this.changePasswordForm.value.old_password;
    this.changepasswordobj.password = this.changePasswordForm.value.password;
    
    this.api.changeUserPassword(this.changepasswordobj).subscribe((res) => {
      console.log(res);
      if (res.message == "Password changed") {
      this.toast.primary("password changed successfully")
      this.changePasswordForm.reset();
      this.router.navigateByUrl('/profile')
}
    },(err)=>{
      this.toast.error("Error in changing password " + err.error.message)
    })
  }

  mustMatch(controlName:string, matchingControlName:string){
    return(formGroup:FormGroup)=>{
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if(matchingControl.errors && !matchingControl.errors['mustMatch']){
        return
      }
      if(control.value!==matchingControl.value){
        matchingControl.setErrors({mustMatch:true})
      }
      else{
        matchingControl.setErrors(null)
      }
    }

  }
}
