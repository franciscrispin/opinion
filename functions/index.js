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
    .onCreate(async (doc) => {
        const post = doc.data();
        const categoryId = post.categoryId

        const snapshot = await admin.firestore().collection('tags').get()
        const tags = snapshot.docs.map(tagDoc => ({ ...tagDoc.data(), id: tagDoc.id }))

        // get tag names from tag ids
        const tagNames = post.tagList.map(
            (tagNum) => tags.find((tag) => tag.id == tagNum).tag
        );

        // add tag names to post 
        await admin.firestore().collection('posts')
            .doc(`${doc.id}`)
            .update({
                tagNames
            })

        const postWithId = { ...post, id: doc.id, tagNames }

        // add post and tag names to category
        await admin.firestore().collection('categories')
            .doc(`${categoryId}`) // remove string literal
            .update({
                posts: admin.firestore.FieldValue.arrayUnion(postWithId),
                tagNames: admin.firestore.FieldValue.arrayUnion(...tagNames),
            })
        console.log(`post added to category ${categoryId}`, doc)
    })
