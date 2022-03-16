import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss']
})
export class OtpVerificationComponent implements OnInit {
  id = localStorage.getItem("session_id") || ""
  otpForm!:FormGroup
  constructor(private fb:FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.otpForm= this.fb.group({
      otp:['']
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
        alert("OTP verified")
      }
      else{
        alert("OTP not verified")
      }
    },(err)=>{
      alert(err.error.message)
    })
  }
}
