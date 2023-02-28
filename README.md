# Food Pantry App
Web application for Food Pantries.

The Food Pantry Application is designed to help run day to day operations.  The highest priority items are these below, and you can see the full roadmap at the project link.  If there is something you need added, please create a new issue.

* [X] Customers and Volunteers can register with the application
* [X] Customers can apply to be on the delivery list
* [ ] Admins can maintain the list of deliveries that will be made on delivery days
* [ ] Volunteers can apply for specific days/hours they would like to volunteer
* [ ] Admins can maintain the list of volunteers that will attend on specific dates
* [ ] Admins can maintain an inventory of what is available and amounts of items.

## Project Roadmap
The project uses Github projects for its roadmap, you can find it here: https://github.com/orgs/ncosd/projects/2

## Developing
Pull requests are welcome, and will be reviewed.   If you are new to open source development there are many resources on github, and [this guide](https://github.com/freeCodeCamp/how-to-contribute-to-open-source) can be helpful with getting started.

This project uses firebase and Vue.js.  The project can be configured with information stored in local files which are not stored in github, and then you can develop locally on your laptop without deploying to your own firebase project.  To develop and run locally without deploying to firebase you can use the emulators and a project that is on the free Spark plan.  If you want to deploy to firebase, then you will need to upgrade to the Blaze plan because firebase functions are used in this project.  However, as a developer you do not need to deploy to firebase, and do not need to upgrade your project to the blaze plan.

### Prerequisites
1. You should have node and npm installed.  If you do not have npm [look here to install npm](https://www.npmjs.com/get-npm).  Firebase is a dependency in the project.
1. You will need the firebase cli.  You can install it using npm.
```shell
npm install -g firebase-tools
```
1. You will need the [Vue cli](https://cli.vuejs.org)
1. You will need to create a free firebase application at https://console.firebase.google.com/
   1. Click Add Project, give it a name and follow the defaults.
   1. Click Authentication, and turn on authentication, enable the "email and password" option.
   1. Click Firestore and create a database, the default options should work.

### Setup
You can run this project locally against the firebase emulators.  You can see how to install and configure the firebase emulators here https://firebase.google.com/docs/emulator-suite/install_and_configure.

> The first time you need to login to firebase and configure this project to use your application.
>
>     firebase login
>     firebase use _projectid_

After login and configuring a project (on the spark plan) clone the repo:

    git clone git@github.com:ncosd/food-pantry-app.git
    cd web/functions && npm install
    cd ../admin npm install
    cd ../app; npm install

> Also the first time you'll need to configure the functions for local development.  The emulator expects a json file named .runtimeconfig.json
>    cd web/functions
>    # create a file named .runtimeconfig.json
>    {
>       "sendgrid": {
>          "key": "",
>          "from": ""
>       },
>       "delivery": {
>         "to": "",
>         "bcc": ""
>       }
>    }

Use these commands for developing locally:

    # you should be in the web/app directory
    npm run serve:firebase:emulator   # leave this running in one terminal
    npm run build:watch               # leave this running in another terminal

Running these two commands will run the emulators in one terminal, and the vue-cli-service in the other.  The vue service will not do hot-reloading, it will rebuild to the `dist` folder whenever changes are made, so you will need to reload the web browser as you work.

## This is great, how can I use this for my Food Pantry or Food Bank?
It will get easier over time as the process is refined.   Currently, the best way for you to use this project is to:

1. Fork this repo
2. Configure for your organization name by creating a `.env` file in  `app/src/.env`

    file: app/src/.env
```sh
VUE_APP_APP_NAV_NAME = 'name' # this is the name in the navbar at the top.
VUE_APP_ORGANIZATION_NAME = 'org name' # this is your organization name.
VUE_APP_PROJECT_LONG_NAME = 'long name' # this is the name of the website you are going to deploy.  Usually a long version of you Project Name.
```

3. Create a firebase project with hosting, firestore, and functions.  You will need to configure the functions similar to the json file above.
4. Build the vue project:

> *NOTE*
>
> npm7 does not currently work with storybook [see here](https://github.com/storybookjs/storybook/issues/13683)
>
> use `npm install -g npm@6` to use npm6

    cd app;
    npm run build

5. Deploy it to your firebase project

   cd app;
   firebase deploy

If you have a question, open a [Question issue](https://github.com/ncosd/food-pantry-app/issues/new?assignees=&labels=question&template=question.md&title=%5BQ%5D+)
