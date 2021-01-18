import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MsalService, MsalBroadcastService } from './msal';
import { MSAL_GUARD_CONFIG } from './msal/constants';
import { MsalGuardConfiguration } from './msal/msal.guard.config';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { EventMessage, EventType, InteractionType } from '@azure/msal-browser';
import { MsalInterceptorConfig } from './msal/msal.interceptor.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Angular 10 - MSAL Browser Sample';
  isIframe = false;
  loggedIn = false;
  private readonly _destroying$ = new Subject<void>();

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService
  ) {}

  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener;

    this.checkAccount();

    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS || msg.eventType === EventType.ACQUIRE_TOKEN_SUCCESS),
        takeUntil(this._destroying$)
      )
      .subscribe((result) => {
        this.checkAccount();
      });
  }

  checkAccount() {
    this.loggedIn = this.authService.getAllAccounts().length > 0;
  }

  login() {
    if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
      this.authService.loginPopup({...this.msalGuardConfig.authRequest})
        .subscribe(() => this.checkAccount());
    } else {
      
      this.authService.loginRedirect({
        scopes: ['api://your_app_id/access_as_user'],
        extraScopesToConsent:['api://your_app_id/access_as_user'],
        prompt: 'consent',
      });
    }
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this._destroying$.next(null);
    this._destroying$.complete();
  }

 generateMSALInterceptorConfigFactory(): MsalInterceptorConfig {
    const protectedResourceMap = new Map<string, Array<string>>();
    protectedResourceMap.set('api://your_app_id/access_as_user', ['access_as_user']);
    console.log(JSON.stringify(protectedResourceMap), null, '\t');
  
    return {
      interactionType: InteractionType.Redirect,
      protectedResourceMap,
      authRequest: {
        scopes: ['access_as_user'],
      extraScopesToConsent:['api://your_app_id/access_as_user'],
      // responseMode?: ResponseMode;
      // codeChallenge?: string;
      // codeChallengeMethod?: string;
      // state?: string;
        prompt: 'login',
      // account?: AccountInfo;
      // loginHint?: string;
      // domainHint?: string;
      // sid?: string;
      // extraQueryParameters?: StringDict;
      // nonce?: string;
      }
    };
  }
}
