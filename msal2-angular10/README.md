# Angular 10 MSAL.js 2.x Sample

Use VS Code with the following extensions:

- Angular Snippets by John Papa
- Annotator
- Auto Import
- Beautify
- Browser Preview
- Debugger for Chrome
- ES6-String-HTML
- ESLint
- GitLens
- HTML Class Suggestions
- IntelliSense for CSS class names
- JSON Pretty Printer
- Prettier
- TypeScript Hero
- REST Client

### About and pre-requisites
[https://github.com/AzureAD/microsoft-authentication-library-for-js](https://github.com/AzureAD/microsoft-authentication-library-for-js)
- Ensure [all pre-requisites](../../../lib/msal-browser/README.md#prerequisites) have been completed to run msal-browser.

### Configure the application
- Open `./src/app/app.modules.ts` in an editor.
- Replace client id with the Application (client) ID from the portal registration, or use the currently configured lab registration. 
  - Optionally, you may replace any of the other parameters, or you can remove them and use the default values.

### Running the sample
- In a command prompt, run `npm start`.
- Navigate to [http://localhost:4200](http://localhost:4200)
- In the web page, click on the "Login" button. The app will automatically reload if you change any of the source files.

## Additional notes
- The default interaction type for the sample is popups. The sample can be configured to use redirects by changing the `interactionType` in `app.module.ts` to `InteractionType.REDIRECT`. Note that there are current issues with using redirects, such as updating state and the asynchronous processing of redirect responses. These issues are being investigated and will be addressed.
- The sample implements basic versions of Angular service, guard, and interceptors. Broadcast functionality has not been implemented.

Notes MSAL2(msal-browser usage) vs MSAL 1 (msal-angular usage)
https://portal.azure.com:

create obtain app ID and secret for use in custom code solution
define scopes/permisions ahead of time
support dynamic consent - define scopes/permissions at runtime

https://aad.portalzure.com:
auhentication -> register new app:

Web App and Redirect URI: e.g: localhost:4200 
(can add multiple redirect URIs)

Implicit grant: Access tokens  and ID tokens
app
in oauth.ts use the appId and update it (whith the appId of the registered app config)

MsalModule.forRoot({
clientID: OAuthSettings.appId
})

in auth service iject msalService and alertsService
https://aka.ms/M365DevYouTube

@azure/msal-browser (is the MSAL 2)

Upgrade by instead of new MSAL.UserAgentApplication you have: new MSAL.PublicClientApplication

Because I did not manage to get the correct accessToken to pass to backend in order to get b2c token, I had to switch to angular-browser