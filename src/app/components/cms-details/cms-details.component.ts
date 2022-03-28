import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/service/toast.service';


@Component({
  selector: 'app-cms-details',
  templateUrl: './cms-details.component.html',
  styleUrls: ['./cms-details.component.scss']
})
export class CmsDetailsComponent implements OnInit {
  emp:any
  config: any;
  addDetails!:FormGroup
  allow_html = true
 btnshowSubmit:boolean = true;
 btnshowUpdate:boolean = false;
  constructor(private fb:FormBuilder, private api:ApiService, private _router:ActivatedRoute, private router:Router, private toast:ToastService) { }
 
  ngOnInit(): void {
   this.cmsEdit()
    this.addDetails = this.fb.group({
      id:[''],
      name:[''],
      title:[''],
      content:[''],
      
    })
  
    
  
  }


  cmsAdd(addDetails:any){
  const data ={
    name:addDetails.value.name,
    title:addDetails.value.title,
    content:addDetails.value.content,
    allow_html:this.allow_html
  }
 this.api.cmsaddList(data).subscribe((res)=>{
   console.log(res);
   
   if(res.message == "Created"){
     this.toast.primary("Page added")
     this.addDetails.reset()
     this.router.navigateByUrl("/cmslist")
     
   }
   
 },(err)=>{
   this.toast.error(err.error.message)
 })
}

cmsEdit(){
  this.api.getCurrentPage(this._router.snapshot.params['id']).subscribe((res)=>{
    this.showUpdate()
    this.emp = res.data.page
   this.addDetails.controls["name"].setValue(this.emp.name),
   this.addDetails.controls["title"].setValue(this.emp.title),
   this.addDetails.controls["content"].setValue(this.emp.content);
    
  })
}
cmsUpdate(){
  this.api.cmsupdateList(this.addDetails.value,this._router.snapshot.params['id']).subscribe((res)=>{
    console.log(res);
   
    if(res.message=="Updated"){
      this.showSubmit()
      this.toast.primary("Updated")
      this.router.navigateByUrl("/cmslist")
      
    }
    
  },(err)=>{
    this.toast.error(err.error.message)
  })
}
  showSubmit(){
    this.btnshowSubmit = true;
    this.btnshowUpdate = false;
  }

  showUpdate(){
    this.btnshowSubmit = false;
    this.btnshowUpdate = true;
  }
}
