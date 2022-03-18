import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
forgotPasswordForm!: FormGroup
  constructor(private fb:FormBuilder, private api:ApiService, private router:Router, private toast:ToastService) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email:['',[Validators.required,Validators.email]]
    })
  }

  password(data:any){
    const Data = {
      email: data.value.email,
     
    }

    this.api.forgotPassword(Data).subscribe((res)=>{
      console.log(res);
      localStorage.setItem('session_id', res.data.session_id)
      if (res.message == "OTP sent") {
        this.toast.primary("OTP send successfully.. Please check the email")
        this.router.navigateByUrl('/otpverification')
        

      } else {
        this.toast.error("Unable to send OTP")
      }

    }, (err) => {
      this.toast.error(err.error.message)
    })
      
  }
}

