import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthService {

  constructor() { }

  public setRoles(roles:any) {
    sessionStorage.setItem('roles', roles);
  }

  public getRoles() {
   return sessionStorage.getItem('roles');
   
  }
  public setUsername(username:any) {
    sessionStorage.setItem('username', username);
  }


  public setCartLength(length:any) {
    sessionStorage.setItem('cartlength', length);
  }


  public getCartLength() {
    return sessionStorage.getItem('cartlength');
  }


  public setEmail(email:any) {
    sessionStorage.setItem('userEmail', email);
  }

  public getEmail() {
    return sessionStorage.getItem('userEmail');
  }

  public setToken(jwtToken: string) {
    sessionStorage.setItem('jwtToken', jwtToken);
  }

  public getToken() {
   return  sessionStorage.getItem('jwtToken');
  }

  public clear() {
    sessionStorage.clear();
  }

  public isLoggedIn() {
    
    return this.getEmail() && this.getRoles()  && this.getToken() 

  }


  public roleMatch(allowedRoles:any): boolean|any {
    let isMatch = false;
    const userRoles: any = this.getRoles();
    console.log("user roless",userRoles);
    console.log("allowed roless",allowedRoles);
    if (userRoles != null && userRoles) {
    allowedRoles.forEach((allow:any) => {
console.log("allow",allow);




    
  
if (userRoles== allow) {
  console.log("check-roles",userRoles == allow)
  isMatch = true;
  return isMatch;
} else {
  return isMatch;
  
}
 })
} 
    // if (userRoles != null && userRoles) {
      // for (let i = 0; i < userRoles.length; i++) {
        // for (let j = 0; j < allowedRoles.length; j++) {

          // console.log("check-roles111",userRoles[i] == allowedRoles[j])
          // console.log("check-roles22",userRoles[i] === allowedRoles[j])

        
        // }
      // }
    // }
  }

}