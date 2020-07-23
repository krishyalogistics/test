import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
@Component({
selector: 'app-login',
templateUrl: './login.component.html',
styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
angForm: FormGroup;
submitted = false;
constructor(private fb: FormBuilder,private dataService: ApiService,private router:Router) {
this.angForm = this.fb.group({
email: ['', [Validators.required,Validators.minLength(1), Validators.email]],
password: ['', Validators.required]
});
}

ngOnInit() {
}

get f() {
    return this.angForm.controls;
    }

postdata(angForm1)
{
this.dataService.userlogin(angForm1.value.email,angForm1.value.password)
.pipe(first())
.subscribe(
data => {
    this.handleResponse(data)
    console.log("Success")
const redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl : '/users';
this.router.navigate([redirect]);
},
error => {
alert("User name or password is incorrect")
});
}

handleResponse(data){
    // console.log(data[0].id+" / "+data[0].username)
    sessionStorage.setItem('loggedUserID', data[0].id);
    sessionStorage.setItem('loggedUserName', data[0].username);
  }
get email() { return this.angForm.get('email'); }
get password() { return this.angForm.get('password'); }
}

