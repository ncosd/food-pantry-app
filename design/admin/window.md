# Volunteer Window Design

firebase `/windows/{wid}`

wid is `YYYY-MM-DD-LOCKEY-TASKKEY`


const windowsRef = collection(db, 'windows')
- starttime timestamp
- endtime timestamp
- numNeeded number
- location string key
- tasktype string key

```javascript
const coverRef = collection(windowsRef, wid, 'volunteers')

addDoc(collection(windowsRef, 'wid1', 'volunteers'), {
  covering: [
             {
               username: 'joe',
               starttime: 9,
               numhours: 2,
             },
             {
               username: 'alice',
               starttime: 11,
               numhours: 2,
             }
            ],
   covered: true|false
}
```

## Query array using `whereArrayContains`
```javascript
CollectionReference citiesRef = db.collection("cities");
citiesRef.whereArrayContains("regions", "west_coast");
```

## Firestore Rules
### Windows
- Only admins can create,write,delete `windows`, authenticated can read

### Windows / key / Volunteers
- admins|volunteers can create,read,update,delete in the covering array
- a function updates the covered field.
