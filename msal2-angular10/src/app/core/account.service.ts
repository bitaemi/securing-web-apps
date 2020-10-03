import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Constants } from '../constants';
import { UserProfile } from '../model/user-profile';
import { CoreModule } from './core.module';

@Injectable()
export class AccountService {
    userProfile: UserProfile;
    constructor(private _httpClient: HttpClient) { }
      
    getAllUsers(): Observable<UserProfile[]> {
        return this._httpClient.get<UserProfile[]>(Constants.apiRoot + 'Account/Users');
    }

    createUserProfile(userProfile: UserProfile) {
        return this._httpClient.post(`${Constants.apiRoot}Account/Profile`, userProfile);
    }

    updateUserProfile(userProfile: UserProfile) {
        return this._httpClient.put(`${Constants.apiRoot}Account/Profile/${userProfile.id}`, userProfile);
    }

    register(userInfo: any) {
        return this._httpClient.post(`${Constants.apiRoot}Account/Register`, userInfo);

    }
}