import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
 providedIn: 'root'
})
export class ProfileService<T> {

 private profileData: BehaviorSubject<T> = new BehaviorSubject<T>(undefined);

 getProfileData(): Observable<T> {
  return this.profileData;
 }

 setProfileData(profileData: T) {
  this.profileData.next(profileData);
 }

 getProfileDataValue(): T {
  return this.profileData.getValue();
 }

}