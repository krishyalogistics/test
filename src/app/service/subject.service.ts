import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

export enum eSubject {
  default, import
}

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  public readonly subject = new BehaviorSubject<eSubject>(eSubject.default);

  constructor() { }

  public emit(s: eSubject) {
    this.subject.next(s);
  }

}
