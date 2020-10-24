import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MsalService, MSAL_INSTANCE, MsalGuard, MsalInterceptor, MsalBroadcastService } from './msal';
import { IPublicClientApplication, PublicClientApplication, InteractionType } from '@azure/msal-browser';
import { MSAL_GUARD_CONFIG, MSAL_INTERCEPTOR_CONFIG } from './msal/constants';
import { MsalGuardConfiguration } from './msal/msal.guard.config';
import { MsalInterceptorConfig } from './msal/msal.interceptor.config';

function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: 'enter_your_client_id_here',
      authority: 'https://login.microsoftonline.com/enter_tenant_id_here',
      redirectUri: 'http://localhost:4200',
    }
  });
}

function MSALInterceptorConfigFactory(): MsalInterceptorConfig {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set('api://eb7...', ['customscope']);

  return {
    interactionType: InteractionType.Popup,
    protectedResourceMap,
    authRequest: {
      scopes: ['openid', 'customscope'],
    // claims?: string;
    // authority?: string;
    // correlationId?: string;
    // resourceRequestMethod?: string;
    // resourceRequestUri?: string;
    // authenticationScheme?: AuthenticationScheme;
    // redirectUri?: string;
    extraScopesToConsent:['api://eb7.../customscope'],
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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useValue: {
        interactionType: InteractionType.Popup
      } as MsalGuardConfiguration
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
