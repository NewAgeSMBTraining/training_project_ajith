import { Component, Inject, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddUser } from '../../model/adduser.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Pagination } from 'src/app/model/pagination.model';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { ToastService } from 'src/app/service/toast.service';
import { DailogService } from 'src/app/service/dialog.service';
import {  DialogResponse } from 'src/app/model/dialog.model';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  
  userData!: FormGroup;
  employeeList: any = [];
  roles:any=[];
  employeeobj: AddUser = new AddUser;
  pagination: Pagination = {
    page: 1,
    limit: environment.PAGINATION_LIMIT,
    count: 0,
  };
  constructor(private api: ApiService, 
    private fb: FormBuilder, 
    private router: Router, 
    private route:ActivatedRoute, 
    private location:Location, 
    private toast:ToastService,
    private dailog:DailogService,
   
    ) {
   
   }

  ngOnInit(): void {
    
    this.route.queryParams.subscribe((params) => {

      this.pagination.page = params['page'] ? +params['page'] : 1;
      this.pagination.count = this.pagination.page * this.pagination.limit;
      this.employeedata()
      
      // this.userData = this.fb.group({
      //   id: [''],
      //   role_id: [''],
      //   first_name: ['',Validators.required],
      //   last_name: ['',Validators.required],
      //   email: ['',[Validators.required, Validators.email]],
      //   phone_code: [''],
      //   phone: ['',[Validators.required,Validators.pattern('[0-9]{10}')]],
      //   password: ['',[Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]],
    
        
      // })
    });
    
  }
 
  
 
  // employeedata() {
    
    
  //   this.api.getList().subscribe(res => {
  //     console.log(res)
  //     this.employeeList = res;
  //   })
  // }

  changePage(page?: number): void {
    const urlTree = this.router.createUrlTree([], {
      queryParams: {
        page: page,
      
      },
      queryParamsHandling: 'merge',
      preserveFragment: true,
    });
    this.location.replaceState(urlTree.toString());
    this.employeedata()
  }

  async employeedata(): Promise<void> {
    const offset = (this.pagination.page - 1) * this.pagination.limit;
    const {error, data, message} =
   await this.api.getList('user',{
    offset,
    limit:this.pagination.limit,
    populate:['role'],
   });
    if(!!error){
   return message;
      
    }
    this.pagination.count = data?.count || 0;
    this.employeeList = data?.users || []
    console.log(data);
  }

  // roledata(){
  //   this.api.getRoles().subscribe(res=>{
  //     console.log(res);
  //     this.roles=res.data.roles;
  //     return this.roles;
  //   })
  // }
 
  openAddEmployee(){
    this.dailog.openRef(AddEmployeeComponent).onClose.subscribe(()=>{
      this.employeedata()
    })
  }

  openUpdateEmployee(data:any){
    this.dailog.openRef(EditEmployeeComponent, data).onClose.subscribe(()=>{
      this.employeedata()
      
      
    })
           
  }
 
  //  user(userData: any) {
  //   console.log("user data data is", userData);

  //   const data = {
  //     role_id: userData.value.role_id,
  //     first_name: userData.value.first_name,
  //     last_name: userData.value.last_name,
  //     email: userData.value.email,
  //     phone_code: userData.value.phone_code,
  //     phone: userData.value.phone,
  //     password: userData.value.password
  //   }

  //    this.api.addUserData(data).subscribe((res: any) => {
  //     console.log(res);
  //     if (res.message == "Created") {
  //       this.toast.primary("User data added")
  //       this.employeedata();
  //       this.userData.reset()
  //     }

  //   }, (err) => {
  //     this.toast.error("Error in adding data" + err.error.message)
  //   })

  // }

  deletedata(data: any) {
    this.dailog.open({text:'Are you sure you want to delete?'})
    .subscribe((result:DialogResponse)=>{
      
        if(result.status==true){ 
          this.api.deleteList(data.id).subscribe((res) => {
           console.log(res);
          if (res.message == "Deleted") {
            this.toast.primary("User data deleted")
            this.employeedata();
          }}, (err) => {
            this.toast.error("Error in deleting data" + err.error.message)
          })}
     
  })}
  
  logout(){
    alert("Logged out")
    localStorage.clear()
        this.router.navigateByUrl('/login')
    
  }

}
