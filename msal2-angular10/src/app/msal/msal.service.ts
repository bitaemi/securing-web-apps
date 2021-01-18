import { Inject, Injectable } from "@angular/core";
import {
    IPublicClientApplication,
    AccountInfo,
    EndSessionRequest,
    AuthorizationUrlRequest,
    AuthenticationResult,
    PopupRequest,
    RedirectRequest,
    SilentRequest
} from "@azure/msal-browser";
import { MSAL_INSTANCE } from "./constants";
import { Observable, from } from 'rxjs';

interface IMsalService {
    acquireTokenPopup(request: PopupRequest): Observable<AuthenticationResult>;
    acquireTokenRedirect(request: RedirectRequest): Observable<void>;
    acquireTokenSilent(silentRequest: SilentRequest): Observable<AuthenticationResult>;
    getAccountByUsername(userName: string): AccountInfo | null;
    getAllAccounts(): AccountInfo[];
    handleRedirectObservable(): Observable<AuthenticationResult | null>;
    loginPopup(request?: PopupRequest): Observable<AuthenticationResult>;
    loginRedirect(request?: RedirectRequest): Observable<void>;
    logout(logoutRequest?: EndSessionRequest): Observable<void>;
    ssoSilent(request: AuthorizationUrlRequest): Observable<AuthenticationResult>;
}

@Injectable()
export class MsalService implements IMsalService {

    constructor(
        @Inject(MSAL_INSTANCE) private msalInstance: IPublicClientApplication
    ) {}

    acquireTokenPopup(request: AuthorizationUrlRequest): Observable<AuthenticationResult> {
        return from(this.msalInstance.acquireTokenPopup(request));
    }
    acquireTokenRedirect(request: RedirectRequest): Observable<void> {
        console.log('acquire token redirect'+ JSON.stringify(request), null, '\t');

        return from(this.msalInstance.acquireTokenRedirect(request));
    }
    acquireTokenSilent(silentRequest: SilentRequest): Observable<AuthenticationResult> {
        console.log('acquire token silent'+ JSON.stringify(silentRequest), null, '\t');

        return from(this.msalInstance.acquireTokenSilent(silentRequest));
    }
    getAccountByUsername(userName: string): AccountInfo {
        return this.msalInstance.getAccountByUsername(userName);
    }
    getAllAccounts(): AccountInfo[] {
        return this.msalInstance.getAllAccounts();
    }
    handleRedirectObservable(): Observable<AuthenticationResult> {
        // console.log('handele redirect');

        return from(this.msalInstance.handleRedirectPromise());
    }
    loginPopup(request?: AuthorizationUrlRequest): Observable<AuthenticationResult> {
        return from(this.msalInstance.loginPopup(request));
    }
    loginRedirect(request?: RedirectRequest): Observable<void> {
        console.log('login'+ JSON.stringify(request), null, '\t');

        return from(this.msalInstance.loginRedirect(request));
    }
    logout(logoutRequest?: EndSessionRequest): Observable<void> {
        console.log('logout'+ JSON.stringify(logoutRequest), null, '\t');

        return from(this.msalInstance.logout(logoutRequest));
    }
    ssoSilent(request: AuthorizationUrlRequest): Observable<AuthenticationResult> {
        console.log('SSO silet'+ JSON.stringify(request), null, '\t');
        return from(this.msalInstance.ssoSilent(request));
    }

}
