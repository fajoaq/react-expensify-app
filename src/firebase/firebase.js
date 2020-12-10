import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

export { firebase, database as default };

/* database.ref('expenses').on('child_changed', (snapshot) => {
    console.log(snapshot.key, snapshot.val());
}); */

/* database.ref('expenses').on('value', (snapshot) => {
    const expenses = [];
    
    snapshot.forEach((childSnapshot) => {
        expenses.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
        });
    });

    console.log(expenses)
});
 */

/* const expenses = [{
    description: 'This is expense 1',
    note: 'Pay some bill',
    amount: 100,
    createdAt: 0
}, {
    description: 'This is expense 2',
    note: 'Pay some bill other bill',
    amount: 1000,
    createdAt: 9000
}, {
    description: 'This is expense 3',
    note: 'Pay some final bill',
    amount: 10000,
    createdAt: 20000
}];

expenses.map((expense) => {
    database.ref('expenses').push({
        description: expense.description,
        note: expense.note,
        amount: expense.amount,
        createdAt: expense.createdAt
    });
}); */


/* database.ref('notes').push({
    title: 'First note!',
    body: 'This is my first note.'
});
 */

/* const firebaseNotes = {
    notes: {
        1111: {
            title: 'First note!',
            body: 'This is my first note.'
        },
        2222: {
            title: 'Second note!',
            body: 'This is my second note!'
        }
    }
};

const notes = [{
    id: '12',
    title: 'First note!',
    body: 'This is my first note.'
}, {
    id: '121',
    title: 'Second note!',
    body: 'This is my second note!'
}];

database.ref('firebaseNotes').set(firebaseNotes); */

/* const onDataChange = database.ref().on('value', (snapshot) => {
    const name = snapshot.val().name;
    const title = snapshot.val().job.title;
    const company = snapshot.val().job.company;
    console.log(`${name} is the ${title} at ${company}.`);
});

setTimeout(() => {
    database.ref().update({
        name: 'Francis A. J',
        'job/title': 'Head Web Developer',
        'location/city': 'Goggles'
    });
}, 3500); */

/* database.ref().once('value').then((snapshot) => {
    const val = snapshot.val();
    console.log(val);
}).catch((e) => {
    console.log('Error fetching snapshot', e);
}); */

/* database.ref().set({
    name: 'Francis J',
    age: 34,
    stressLevel: 6,
    job: {
        title: 'Software developer',
        company: 'JOAQUINC'
    },
    location: {
        city: 'Jersey City',
        country: 'garbage'
    }
}).then(() => {
    console.log('data saved.');
}).catch((e) => {
    console.log('This failed because: ', e);
}); */

/* database.ref().update({
    stressLevel: 9,
    'job/company': 'Amazon',
    'location/city': 'Seatle'
});
 */
/*  database.ref('isSingle').remove().then(() => {
     console.log('data  was removed from database.');
 }).catch((e) => {
     console.log('data was NOT removed from database.', e);
 });
 */