import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-template-details',
  templateUrl: './template-details.component.html',
  styleUrls: ['./template-details.component.scss']
})
export class TemplateDetailsComponent implements OnInit {
 
  emp:any
  config:any
  templateForm!:FormGroup
  send_email: any;
  send_sms:any;
  constructor(private fb:FormBuilder, private api:ApiService, private _router:ActivatedRoute, private toast:ToastService, private router:Router) { }

  ngOnInit(): void {
    this.editTemplate()
    this.templateForm = this.fb.group({
      id:[''],
      name:[''],
      title:[''],
      email_subject:[''],
      email_body:[''],
      sms_body:[''],
      send_email: Boolean,
      send_sms: Boolean

    })
   
  }
 
  
  editTemplate(){
    
    this.api.getcurrenttemplatePage(this._router.snapshot.params['id']).subscribe((res)=>{
      console.log(res);
      this.templateForm.controls['name'].setValue(res.data.template.name)
      this.templateForm.controls['title'].setValue(res.data.template.title)
      this.templateForm.controls['email_subject'].setValue(res.data.template.email_subject)
      this.templateForm.controls['email_body'].setValue(res.data.template.email_body)
      this.templateForm.controls['sms_body'].setValue(res.data.template.sms_body)
      this.templateForm.controls['send_email'].setValue(res.data.template.send_email)
      this.templateForm.controls['send_sms'].setValue(res.data.template.send_sms)
 
  
    })
    
  }
  updateTemplate(){
    this.api.templateupdateList(this.templateForm.value, this._router.snapshot.params['id']).subscribe((res)=>{
      console.log(res);
      if(res.message=="Updated"){
        this.toast.primary("Data updated")
        this.router.navigateByUrl("/templatelist")
      }
      
    },(err)=>{
      this.toast.error(err.error.message)
    })
  }
}
