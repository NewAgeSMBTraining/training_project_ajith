import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';



@Component({
  selector: 'app-cms-details',
  templateUrl: './cms-details.component.html',
  styleUrls: ['./cms-details.component.scss']
})
export class CmsDetailsComponent implements OnInit {
  config: any;
  addDetails!:FormGroup
  allow_html = true
  constructor(private fb:FormBuilder, private api:ApiService) { }
  
  ngOnInit(): void {
    this.addDetails = this.fb.group({
      id:[''],
      name:[''],
      title:[''],
      content:['']
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
   
 })
}
}
