import { Injectable, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Users } from '../model/users';

@Injectable({
providedIn: 'root'
})

export class ApiService {
redirectUrl: string;
baseUrl:string = "https://krishya.co/php";
@Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
constructor(private httpClient : HttpClient) { }
public userlogin(username, password) {
alert(username)
return this.httpClient.post<any>(this.baseUrl + '/adminlogin.php', { username, password })
.pipe(map(Users => {
this.setToken(Users[0].name);
// console.log(Users[0].name)
this.getLoggedInName.emit(true);
return Users;
}));
}

public Viewuserdetails(userid) {
    return this.httpClient.post<any>(this.baseUrl + '/viewuserdetails.php', { userid })
    .pipe(map(Users => {
    // console.log(Users)
    return Users;
    }));
    }
    

public insertnewusers(name,username,email,role,department) {
    return this.httpClient.post<any>(this.baseUrl + '/addnewusers.php', { name, username,email,role
    ,department })

    .pipe(map(Arrival => {
        // alert("Success")
        console.log('data successfully added into the server..');
    return Arrival;
    }));

    }

//token
setToken(token: string) {
localStorage.setItem('token', token);
}
getToken() {
return localStorage.getItem('token');
}
deleteToken() {
localStorage.removeItem('token');
}
isLoggedIn() {
const usertoken = this.getToken();
if (usertoken != null) {
return true
}
return false;
}
}