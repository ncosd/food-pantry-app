# Food Pantry App
Web application for Food Pantries.

The Food Pantry application is designed to:

* [x] Customers and Volunteers can register with the application
* [ ] Customers can apply to be on the delivery list
* [ ] Volunteers can apply for specific days/hours they would like to volunteer
* [ ] Admins can maintain hours the pantry is open/available
* [ ] Admins can maintain the list of volunteers that will attend on specific dates
* [ ] Admins can maintain an inventory of what is available and amounts of items.

## Project Roadmap
The project uses Github projects for its roadmap, you can find it here: https://github.com/ncosd/food-pantry-app/projects/1

## Developing
This project uses firebase and Vue.js.  It does not have a firebase project configured.  To run this you will need to use the firebase emulators locally.

You can run this project locally against the firebase emulators.  You can see how to install and configure the firebase emulators here https://firebase.google.com/docs/emulator-suite/install_and_configure.

To run the project locally, clone this repo and then go into the `app` directory:

> The first time you need to login to firebase and configure this project to use your application.
>
>     firebase login
>     firebase use _projectid_
>
> Then copy your `firebase-config.js` from the web console and save it to `src/firebase-config.js`.

Use these command for developing locally:

    npm run serve:firebase:emulator  # leave this running in one terminal
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

3. Create a firebase project with hosting, firestore, and functions.  Get the config.js file and save it to:

    file: app/src/firebase-config.js

4. Build the vue project:

> *NOTE*
> npm7 does not currently work with storybook [see here](https://github.com/storybookjs/storybook/issues/13683), use `npm install -g npm@6` to use npm6

    cd app;
    npm run build

5. Deploy it to your firebase project

   cd app;
   firebase deploy

If you have a question, open a [Question issue](https://github.com/ncosd/food-pantry-app/issues/new?assignees=&labels=question&template=question.md&title=%5BQ%5D+)
