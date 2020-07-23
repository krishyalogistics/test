import {
  ComponentRef,
  ComponentFactoryResolver,
  ElementRef, OnInit,
  ViewContainerRef,
  ViewChild,
  Component,ViewRef } from "@angular/core";
  import { Router } from '@angular/router';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {MatChipInputEvent} from '@angular/material/chips';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { ViewDetails } from 'src/app/model/ViewDetails';
import { first } from 'rxjs/operators';
import { ApiService } from '../../service/api.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  
  public AllColumns: any[] = [
    
    {
      displayname: 'Email',
      name: 'Email',
      cell: (element: any) => `${element.email}`,
    },
    {
      displayname: 'Mobile',
      name: 'mobile',
      cell: (element: any) => `${element.mobile}`,
    }
  ];
  Filtercolumns;
  userDisplayName = '';
  userDisplayId='';
  displayedColumns = this.AllColumns.map((c) => c.name);
  AllTableData: ViewDetails[] = [];
  dataSource = new MatTableDataSource(this.AllTableData);
  
  constructor(
    public httpClient: HttpClient,private dataService: ApiService,private route:Router
  ) { }
  ngOnInit() {
    this.userDisplayName = sessionStorage.getItem('loggedUserName');
    this.userDisplayId = sessionStorage.getItem('loggedUserID');
    this.loadData();
  }

  // public loadData() {
  //   this.httpClient
  //     .get('https://krishya.co/php/viewuserdetails.php')
  //     .subscribe((loadallusers: ViewDetails[]) => {
  //       this.dataSource.data = loadallusers;
  //     });
  // }

  public loadData() {
    this.dataService.Viewuserdetails(this.userDisplayId)
.pipe(first())
.subscribe(
data => {
  this.dataSource.data = data;
    // console.log(data)
const redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl : '/users';
this.route.navigate([redirect]);
},
error => {
alert("error")
});

}


  adduser() {
       this.route.navigateByUrl('addusers');
 }

}

