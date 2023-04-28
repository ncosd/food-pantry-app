# Volunteer Window Design

firebase `/window/{wid}`

wid is ~~`YYYY-MM-DD-LOCKEY-TASKKEY`~~ it is not necessary to set they key, just use the generated key.


const windowsRef = collection(db, 'window')
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
- Only admins can create,write,delete `window`, authenticated can read

### Window / key / Volunteers
- admins|volunteers can create,read,update,delete in the covering array
- a function updates the covered field.
