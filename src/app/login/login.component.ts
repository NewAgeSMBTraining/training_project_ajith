import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { Login } from '../login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginObj: Login = new Login;
  loginform!:FormGroup;
  constructor(private fb:FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.loginform=this.fb.group({
      email:[''],
      password:['']
    })

   
  }
  addLogin(){
    this.loginObj.email = this.loginform.value.email;
    this.loginObj.password = this.loginform.value.password;
    this.api.postLoginData(this.loginObj).subscribe({next:(v)=>{
      console.log(v);
      
    },
  error:(e)=>{
    console.log(e);
    alert("Error in posting data")
  },
  complete:()=>{
    console.log("Completed");
    alert("Logged in")
    this.loginform.reset()
    
  }

  
  
  })

  }
}
