import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  formData: any[] = [
    {"label":"First Name"},
    {"label":"Last Name"},
    {"label":"Contact#"},
    {"label":"Email"},
  ];
  address: boolean = false;
  ContactForm!:FormGroup;
  constructor() { }


  
  ngOnInit(): void {
    this.setSettings(this.formData)
  }
  setSettings(formData:any, address?:boolean){
    let form:any = [];
if(this.address){
  formData.push({"label":"Address"})
}
for(let i=0;i<formData.length; i++){
form[formData[i].label] = new FormControl('');
  }

this.ContactForm = new FormGroup(form)
console.log(this.ContactForm);

}

  }


