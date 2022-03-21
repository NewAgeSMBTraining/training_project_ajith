import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { ToastService } from 'src/app/service/toast.service';


@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss']
})
export class OtpVerificationComponent implements OnInit {
  id = localStorage.getItem("session_id") || ""
  otpForm!:FormGroup
  constructor(private fb:FormBuilder, private api:ApiService, private router:Router, private toast:ToastService) { }

  ngOnInit(): void {
    this.otpForm= this.fb.group({
      otp:['',Validators.required]
    })
  }
  otpVerify(data:any){
    const Data ={
      session_id:this.id,
      otp:data.value.otp
    }
    this.api.otpVerification(Data).subscribe((res)=>{
      console.log(res);
      if(res.message=="OTP verified"){
        this.toast.primary("OTP verified")
        this.router.navigateByUrl('/resetpassword')
      }
      else{
        this.toast.error("OTP not verified")
      }
    },(err)=>{
      this.toast.error(err.error.message)
    })
  }
}
