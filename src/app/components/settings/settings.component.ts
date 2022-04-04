import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
settingsForm!:FormGroup

  constructor(private api:ApiService, private fb:FormBuilder) { }
settings:any = [];
  ngOnInit(): void {
    this.settingsForm = this.fb.group({
      id:[''],
     value:['']
    })
    this.list()
  }

  list(){
    
    let form:any = {}
  this.api.getSettings().subscribe((res)=>{
  
     this.settings = res.data.settings;
  
   for(let i=0;i<this.settings.length;i++){
     form[this.settings[i].value]= new FormControl('')
   }
    this.settingsForm = new FormGroup(form)
  console.log(this.settingsForm);
    
    
  })
}





}