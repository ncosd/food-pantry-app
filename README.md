# Food Pantry App
Web application for Food Pantries.

The Food Pantry application is designed to:

* Customers and Volunteers can register with the application
* Customers can apply to be on the delivery list
* Volunteers can apply for specific days/hours they would like to volunteer
* Admins can maintain hours the pantry is open/available
* Admins can maintain the list of volunteers that will attend on specific dates
* Admins can maintain an inventory of what is available and amounts of items.

## Project Roadmap
The project uses Github projects for its roadmap, you can find it here: https://github.com/ncosd/food-pantry-app/projects/1

## Developing
This project uses firebase and Vue.js.  It does not have a firebase project configured.  To run this you will need to use the firebase emulators locally.

You can run this project locally against the firebase emulators.  You can see how to install and configure the firebase emulators here https://firebase.google.com/docs/emulator-suite/install_and_configure.

To run the project locally, clone this repo and then go into the `app` directory:

    npm run server:firebase:emulator  # leave this running in one terminal
    npm run build:watch               # leave this running in another terminal

Running these two commands will run the emulators in one terminal, and the vue-cli-service in the other.  The vue service will not do hot-reloading, it will rebuild to the `dist` folder whenever changes are made, so you will need to reload the web browser as you work.
