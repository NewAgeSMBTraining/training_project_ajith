import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthorizationService } from './authorization.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {
constructor(private authservice:AuthorizationService, private router:Router){}
  canActivate(){
    if(this.authservice.isLoggedin()){
      return true
    }
    else{
      alert("You have not logged in")
      this.router.navigate([''])
      return false
    }
  }
  
}
