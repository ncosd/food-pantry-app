# Food Pantry App Admin / Volunteer Portal
This is the Volunteer Portal side of the application.

# Admin Registration
Admins fill out the Volunteer Registration form the same as a volunteer would to create an account on the system.   A command line script is run to add the `admin` custom claim to the user's account.

The script is located in `functions/scripts/setadmin.js`  The https://github.com/ncosd/food-pantry-app/blob/forms/web/functions/scripts/README.md file has instructions on how to set up to run the script.

# Volunteer Registration
Volunteers register with the application by filling out the volunteer registration form.  After registering, a volunteer is put into the `pending` state.  An admin can review the pending volunteers and either approve them, or deactivate their account on the Volunteer List page.

# Agreements
When a volunteer signs up, there will be a set of agreements they need to sign.  They can sign these digitally in the system.

An admin can upload an agreement to the system.  If the agreement is marked `required` then when a user logs into the system, they must sign the agreement before they can do anything else in the system.  If an agreement is not marked `required`, then the use can proceed using the system but they will get a yellow badge indicating they have unsigned agreements.

Agreements are stored in firestore `/agreements/:{name}/{:number}`.   When a new agreement is uploaded, the number is incremented by +1 and the current latest has an `enddate` added to it.

Signature records are stored in `/agreements/user/:{userId}/signed/:{name}`  The record will have a list of the versions signed, and the dates signed.
