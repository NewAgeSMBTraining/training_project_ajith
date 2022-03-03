import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginform!:FormGroup;
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.loginform=this.fb.group({
      email:[''],
      password:['']
    })

   
  }
  get f(){
    return this.loginform.controls
   }



    onSubmit(){
      console.log("clicked")
      console.log('f', this.f)
      console.log(this.loginform.value);
      
    }
}
