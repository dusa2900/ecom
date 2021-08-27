import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordStrengthValidator } from "./password-req";
import { EcommService } from 'src/app/SERVICES/ecomm.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmPasswordValidator } from './must-watch';
// import { ConfirmedValidator } from './confirm';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup | any;
  submitted = false;
  hide:boolean=true;
  register: any;
  msg: any;
  constructor(private formBuilder: FormBuilder,private ecomm:EcommService,private router: Router,private toastr:ToastrService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstname: [null, [Validators.required, Validators.pattern('[a-zA-Z ]*$')]],
      username: [null, Validators.compose([Validators.required])],

      email: [null, [Validators.required, Validators.pattern('[^@]+@[^@]+\.[a-zA-Z]{2,6}')]],
      password: [null, Validators.compose([
        Validators.required, Validators.minLength(8), PasswordStrengthValidator])],
 
      confirmPassword: [null,
       Validators.required],
    
      acceptTerms: [false, Validators.requiredTrue]
    }, {
      validator: ConfirmPasswordValidator("password", "confirmPassword")
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }
 
  onSubmit(value: any) {
    sessionStorage.setItem("username",value.firstname)
    this.ecomm.register(value).subscribe((res: any)=>      {
     
console.log("regmsgggggggggg",res);

const obj = JSON.parse(res);
console.log("reg-mail",obj.email);


console.log("messgae",obj.message);
this.msg=obj.message


            if (this.msg=="User registered successfully!") {
     
        this.toastr.success('User created  successfully')
        this.router.navigate(['/login']);

       
      }
else{
        this.toastr.error('User Already Exists')

}

    }
 
 )
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}


