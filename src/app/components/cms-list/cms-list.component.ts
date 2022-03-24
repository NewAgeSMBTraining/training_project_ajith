import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-cms-list',
  templateUrl: './cms-list.component.html',
  styleUrls: ['./cms-list.component.scss']
})
export class CmsListComponent implements OnInit {
cmsLists:any = [];
  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.cmsData()
  }
  cmsData(){
    this.api.cmsgetList().subscribe((res)=>{
      console.log(res);
      this.cmsLists= res.data.pages;
    })
  }
}
