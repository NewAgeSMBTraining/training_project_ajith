import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/toast.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginform!: FormGroup;
  constructor(private fb: FormBuilder, private api: ApiService, private router: Router, private toast:ToastService) { }

  ngOnInit(): void {
    this.loginform = this.fb.group({
      username: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^.{6,}$/)]]
    })


  }
  Login(loginData: any) {
    console.log("login data is", loginData);

    const Data = {
      username: loginData.value.username,
      password: loginData.value.password
    }

    this.api.loginData(Data).subscribe((res: any) => {
      console.log(res);
      localStorage.setItem('Authorization', 'Bearer ' + res.data.token)
      // localStorage.setItem('Data', JSON.stringify(res.data.user))
      if (res.message == "Login success") {
        this.toast.primary("Logged in")
        this.router.navigateByUrl("/list")

      } else {
       this.toast.error("User not found")
      }

    }, (err) => {
      this.toast.error(err.error.message)
    })

  }
}
