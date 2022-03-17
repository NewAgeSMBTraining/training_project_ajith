import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetpasswordForm!:FormGroup
  constructor(private fb:FormBuilder, private api:ApiService, private router:Router) { }

  ngOnInit(): void {
    this.resetpasswordForm = this.fb.group({
      password:['',[Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]],
      confirm_password:['', Validators.required]
    },
    {
      validators: this.mustMatch('password', 'confirm_password')
    }
    )
  }

  passwordReset(data:any){
    const Data={
      session_id : localStorage.getItem("session_id") || "",
      password: data.value.password
    }
    this.api.resetPassword(Data).subscribe((res)=>{
      console.log(res);
      if(res.message=="Password changed"){
        alert("Password changed successfully")
        this.router.navigateByUrl("/")
      }
      else{
        alert("Password change unsuccessfull")
      }
    },(err)=>{
      alert(err.error.message)
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
