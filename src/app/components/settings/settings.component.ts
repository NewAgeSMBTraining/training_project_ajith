import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { ToastService } from 'src/app/service/toast.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
settings:any = [];

  constructor(private api:ApiService, private toast:ToastService ) { }


  

  ngOnInit(): void {
    this.getList()
    
  }
getList(){
  this.api.getSettings().subscribe((res)=>{
    console.log(res);
    this.settings = res.data.settings
    console.log(this.settings);
 
    
  })
  
}
postList(){
  let result = this.settings.map((item:any)=>{
    return{
      value : item.value,
      id: item.id
    }
  })
console.log(result);
 


  this.api.postSettings(result).subscribe((res)=>{
    console.log(res); 
    if(res.message=="Updated") {
      this.toast.primary("value updaded")
    }
  },(err)=>{
    this.toast.error(err.error.message)
  })
}
}