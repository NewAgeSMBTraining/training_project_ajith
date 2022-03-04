import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginform!: FormGroup;
  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.loginform = this.fb.group({
      email: [''],
      password: ['']
    })


  }
  Login(loginData: any) {
    console.log("login data is", loginData);

    const Data = {
      email: loginData.value.email,
      password: loginData.value.password
    }

    this.api.loginData(Data).subscribe((res: any) => {
      console.log(res);
      if (res.message == "login succefully") {
        alert("Logged in")
        this.router.navigateByUrl("/list")

      } else {
        alert("User not found")
      }

    }, (err) => {
      alert("Error logging in"+err)
    })

  }
}
