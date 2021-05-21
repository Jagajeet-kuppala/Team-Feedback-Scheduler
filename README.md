# Team Feedback Scheduler

[![clasp](https://img.shields.io/badge/built%20with-clasp-4285f4.svg)](https://github.com/google/clasp)

##### Schedule 1:1 feedback sessions for your teammates.

> **Note**: The Scheduler should be from the same domain as of where the application has been deployed.
> eg: Only users from the domain **[ThoughtWorks](https://www.thoughtworks.com/)** can schedule, if the application has been deployed in **ThoughtWorks** Google AppScripts account.
>
>However, the participants can be from any domain, includning GMail users.
 
### Setup local environment
- Install [Clasp](https://github.com/google/clasp/#clasp "Command Line Apps Script Projects") `sudo npm install -g @google/clasp`
- Authorise Clasp `clasp login`
    - This will open authorization page in browser
    - Choose relevant google account and authorize clasp
    - Check status with `clasp login --status`
- Enable [Google App Scripts API](https://script.google.com/home/usersettings) in your account 
- Create your Clasp project `clasp create --type webapp --title "Feedback Scheduler"`
- Push the changes `clasp push` (This makes deployments to the head)
- Open the application in browser `clasp open --webapp` (Select Head deployment)

### Intellij / Webstorm GAS Grammar & Auto-completion
- Add Typescript stub in WebStorm 
```WebStorm -> Preferences -> Languages & Framework -> Javascript -> Libraries -> Download -> google-apps-scripts```
- Save files in `.js` format, clasp will convert to `.gs` files will pushing
