# Food Pantry App
This is food pantry software written as a web application for Food Pantries.  Volunteers can register with the site, and choose locations and days/times from a schedule.

The Food Pantry Application is designed to help run day to day operations and manage food pantry volunteers.  The highest priority items are below, and you can see the full roadmap at the projects link.  The current sprints are being run off the [Project Board](https://github.com/orgs/ncosd/projects/2/views/1).  If there is something you need added, please create a new issue.

* [X] Guests and Volunteers can register with the application
* [X] Volunteers can apply for specific days/hours they would like to volunteer
* [X] Guests can apply to be on the delivery list
* [X] Admins can maintain the list of volunteers that will attend on specific dates
* [ ] Admins can maintain the list of deliveries that will be made on delivery days
* [ ] Admins can maintain an inventory of what is available and amounts of items.

## Project Roadmap
The project uses Github projects for its roadmap, you can find the roadmap here: https://github.com/orgs/ncosd/projects/2

## Developing
Pull requests are welcome, and will be reviewed.   If you are new to open source development there are many resources on github, and [this guide](https://github.com/freeCodeCamp/how-to-contribute-to-open-source) can be helpful with getting started.

Use this link to find good first issues https://github.com/ncosd/food-pantry-app/issues?q=is%3Aissue+is%3Aopen+label%3Agood-first-issue and https://github.com/ncosd/food-pantry-app/blob/main/CONTRIBUTING.md has information helpful to get started.

This project uses firebase, Vue.js (version 3), and bootstrap 5.3.  The project can be configured with information stored in local files which are not stored in github.  You can develop locally on your laptop without deploying to your own firebase project.  To develop and run locally without deploying to firebase you can use the emulators and a project that is on the free Spark plan.  If you want to deploy to firebase, then you will need to upgrade to the Blaze plan because firebase functions are used in this project.  However, as a developer you do not need to deploy to firebase, and do not need to upgrade your project to the blaze plan.

### Prerequisites
1. You should have node and npm installed.  If you do not have npm [look here to install npm](https://www.npmjs.com/get-npm).  Firebase is a dependency in the project.
1. You will need the firebase cli.  You can install it using npm.
```shell
npm install -g firebase-tools
```
1. You will need to create a free firebase application at https://console.firebase.google.com/
   1. Click Add Project, give it a name and follow the defaults.
   1. Click Authentication, and turn on authentication, enable the "email and password" option.
   1. Click Firestore and create a database, the default options should work.
   1. Click Hosting and create a site.
   1. At the bottom of the hosting page, there is a "add another site".  Click this and create another site by adding `-admin` to the `projectid` you just created.

### Setup
You can run this project locally against the firebase emulators.  You can see how to install and configure the firebase emulators here https://firebase.google.com/docs/emulator-suite/install_and_configure.

> The first time you need to login to firebase and configure this project to use your application.  The `projectid` is from the firebase project you created above.
>
>     firebase login
>     firebase use _projectid_
>     firebase target:apply hosting app _projectid_
>     firebase target:apply hosting admin _projectid_-admin

After login and configuring a project (on the spark plan) clone the repo, or if you plan on contributing by writing code, fork the repo, and then clone your fork.  The instructions for cloning the repo are given below.

    git clone git@github.com:ncosd/food-pantry-app.git
    cd web/functions && npm install
    cd ../admin npm install
    cd ../app; npm install

Set the env to be the dev one

    firebase use dev

Prepare the `.env` files:
- Copy `web/app/env.demo` to `web/app/.env`.
- Copy `web/admin/env.demo` to `web/admin/.env` to create a `.env` file for both `app` and `admin` folders.
- Configure the `VITE_FB_` values from your firebase project configuration into the following environment variables in the `.env` files:
```sh
VITE_FB_APIKEY="big-long-string"
VITE_FB_AUTHDOMAIN="projectname.firebaseapp.com"
VITE_FB_PROJECTID="projectname"
VITE_FB_STORAGEBUCKET="project-storage-bucket.appspot.com"
VITE_FB_MESSAGINGSENDERID="some-id-number"
VITE_FB_APPID="some-app-id-number"
VITE_FB_MEASUREMENTID="some-app-id"
```

Use these commands for developing locally:

    # you should be in the web/app directory
    npm run serve:firebase:emulator   # leave this running in one terminal
    npm run dev                       # leave this running in another terminal, this will run vite with hot-reloading

Running these two commands will run the emulators in one terminal, and Vite build in the other.  You can open your browser to http://localhost:5173 to see the page.  The firebase service will not do hot-reloading in the browser when Vite builds to the `dist` folder whenever changes are made, so you will need to reload the web browser as you work to load the latest built code.

### Java installed?
The firebase emulator needs node.js 8.0 or higher and Java JDK version 11 or higher.

If you see an error message like: "Error: Process `java -version` has exited with code 1. Please make sure Java is installed and on your system PATH."
you can follow the instructions at https://firebase.google.com/docs/emulator-suite/install_and_configure.

#### macos java?
The easiest way to install the open source jdk on mac is to use homebrew to install java.  At the end of the install it will tell you how to create a symlink to openjdk.jdk
```shell
brew install java
sudo ln -sfn /opt/homebrew/opt/openjdk/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk.jdk
```

#### Hosting port 5000 is not open?
If you see `hosting: Port 5000 is not open on 127.0.0.1, could not start Hosting Emulator.`

This is because the airplay receiver is listening on port 5000.  You can either turn it off in System Preferences | Sharing | uncheck "airport receiver" or configure firebase to use a different port.

### Component development
When you are developing components, [Storybook](https://storybook.js.org/) helps the process by letting you focus on the component without worrying about all the other dependencies in the site.

You can run storybook with the command:

```sh
npm run storybook
```

## This is great, how can I use this for my Food Pantry or Food Bank?
It will get easier over time as the process is refined.   Currently, the best way for you to use this project is to:

1. Fork this repo
2. Configure for your organization name by creating a `.env` file in `web/app/.env`.  You can copy `env.demo` as a starting point.  You will also need to do this for the admin app in `web/admin`.  A portion of the file is shown here:

    file: web/app/.env
```sh
VITE_RUN_LOCAL=true
VITE_APP_NAV_NAME = 'name' # this is the name in the navbar at the top.
VITE_ORGANIZATION_NAME = 'org name' # this is your organization name.
VITE_PROJECT_LONG_NAME = 'long name' # this is the name of the website you are going to deploy.  Usually a long version of you Project Name.
VITE_DELIVERY_MESSAGE="Extended message here.<br>It can have HTML in it."
VITE_DELIVERY_AREA_NAMES="Your Township Name"
VITE_DELIVERY_OUTSIDE_AREA_URL="https://connect4health.org/"
VITE_DELIVERY_ZIPCODES="12345"
```

3. Create a firebase project with hosting, firestore, and functions.  You will need to configure the functions similar to the json file above.
4. Build the vue project:

    cd web/app;
    npm run build
    cd ../admin
    npm run build

5. Deploy it to your firebase project

   cd web
   firebase deploy

If you have a question, open a [Question issue](https://github.com/ncosd/food-pantry-app/issues/new?assignees=&labels=question&template=question.md&title=%5BQ%5D+)
