const functions = require('firebase-functions');
const admin = require('firebase-admin') // allows access to firestore and auth services
admin.initializeApp(functions.config().firebase)

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//     response.send("Hello from Firebase!");
// });

exports.postCreated = functions.firestore
    .document('posts/{postId}')
    .onCreate(doc => {
        const post = doc.data();
        const categoryId = post.categoryId
        const postWithId = Object.assign(post, { id: doc.id })
        console.log(doc)
        console.log(doc.id)
        return admin.firestore().collection('categories')
            .doc(`${categoryId}`)
            .update({
                posts: admin.firestore.FieldValue.arrayUnion(postWithId)
            })
            .then(doc => console.log(`post added to category ${categoryId}`, doc))
    })
