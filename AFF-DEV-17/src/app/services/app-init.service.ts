import { Injectable } from '@angular/core';
import { JwtService } from './jwt.service';
import { AffiliatesService } from './affiliates.service';

import * as JwtDecode from 'jwt-decode';
import {UserService} from './user.service';
import {Affiliate} from '../models/affiliate';

@Injectable({
   providedIn: 'root'
})
export class AppInitService {

  constructor(private jwtService: JwtService,
              private affiliatesService: AffiliatesService,
              private userService: UserService<Affiliate>) { }

   Init() {
      return new Promise<void>((resolve, reject) => {
         const token = this.jwtService.getAccessToken();
         if (token !== null) {
            const decodeToken = JwtDecode(token);
            this.affiliatesService.getByCode(decodeToken.Code).subscribe(response => {
               if (response.success) {
                  this.userService.setUserData(response.data);
               }
               resolve();
            }, error => {
               resolve();
            });
         } else {
            resolve();
         }
      });
   }
}
