import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employeeList: any = [];
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.employeedata()
  }

  employeedata() {
    this.api.getList().subscribe(res => {
      this.employeeList = res;


    })
  }
}
