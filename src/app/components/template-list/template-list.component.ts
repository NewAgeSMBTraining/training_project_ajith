import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.scss']
})
export class TemplateListComponent implements OnInit {
templateList : any = [];
  constructor(private api:ApiService) { }

  ngOnInit(): void {
  this.templateData()
  }

  templateData(){
    this.api.templategetList().subscribe((res)=>{
      this.templateList = res.data.templates
      console.log(res);
      
    })
  }


}
