import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  formData:any[] = [
    {"label":"First Name"},
    {"label":"Last Name"},
    {"label":"Contact#"},
    {"label":"Email"},
  ];
  address: boolean = false;
  ContactForm!:FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

}
