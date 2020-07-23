import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { SubjectService, eSubject } from 'src/app/service/subject.service';
import { Subscription } from 'rxjs';

interface iNavItem {
  routerLink: string[], content: string, icon: string
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  navList: iNavItem[] = [];

  // nav list item depeding on page
  private default: iNavItem[] = [
    // { routerLink: ['/home'], content: 'Home', icon: 'home' },
    { routerLink: ['/users'], content: 'Users', icon: 'supervisor_account' }
  ];
  // step 1
  private import: iNavItem[] = [
    // { routerLink: ['/import'], content: 'Arrival Enrty', icon: 'home' },
    // { routerLink: ['/import'], content: 'Copy-Document', icon: 'home' },
    // { routerLink: ['/import'], content: 'BE Entry', icon: 'home' }
  ];

  constructor(private subjectService: SubjectService) {
  }

  ngOnInit() {

    this.navList = this.default;
    this.subscription = this.subjectService.subject.subscribe(f => {

      switch(f) {

        // step 2
        case eSubject.import:
          this.navList = this.import;
          break;

        case eSubject.default:
        default:
          this.navList = this.default;
          break;
      }

    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
