const functions = require('firebase-functions');
const admin = require('firebase-admin') // allows access to firestore and auth services
admin.initializeApp(functions.config().firebase)

// test function
// exports.helloWorld = functions.https.onRequest((request, response) => {
//     response.send("Hello from Firebase!");
// });

exports.postCreated = functions.firestore
    .document('posts/{postId}')
    .onCreate(async (doc) => {
        const post = doc.data();
        const categoryId = post.categoryId
        const authorId = post.authorId

        // get all tag names from tags collection
        const snapshot = await admin.firestore().collection('tags').get()
        const tags = snapshot.docs.map(tagDoc => ({ ...tagDoc.data(), id: tagDoc.id }))

        // match tag ids of post to tag names
        const tagNames = post.tagList.map(
            (tagNum) => tags.find((tag) => tag.id == tagNum).tag
        );
        const postWithId = { ...post, id: doc.id, tagNames }

        // add tag names and post id to post document
        await admin.firestore().collection('posts')
            .doc(doc.id)
            .update({ id: doc.id, tagNames })
        console.log('post updated', postWithId)

        // add post and tag names to category document
        await admin.firestore().collection('categories')
            .doc(`${categoryId}`)
            .update({
                posts: admin.firestore.FieldValue.arrayUnion(postWithId),
                tagNames: admin.firestore.FieldValue.arrayUnion(...tagNames),
            })
        console.log(`post added to category ${categoryId}`, postWithId)

        // add post to users document
        await admin.firestore().collection('users')
            .doc(authorId)
            .update({
                posts: admin.firestore.FieldValue.arrayUnion(postWithId)
            })
        console.log(`post added to user ${authorId}`)
    })

exports.postUpdated = functions.firestore
    .document('posts/{postId}')
    .onUpdate(async (change, context) => {
        const postId = context.params.postId
        const newPost = change.after.data()
        const { categoryId, authorId } = newPost

        // get all posts from category document
        const categoryDoc = await admin.firestore().collection('categories')
            .doc(`${categoryId}`)
            .get()
        const categoryPosts = categoryDoc.data().posts

        // remove the old post from the category document
        await admin.firestore().collection('categories')
            .doc(`${categoryId}`)
            .update({
                posts: categoryPosts.filter(post => post.id !== postId),
            })
        console.log(`post ${postId} removed from category ${categoryId}`)

        // add the new post to the category document
        await admin.firestore().collection('categories')
            .doc(`${categoryId}`)
            .update({
                posts: admin.firestore.FieldValue.arrayUnion(newPost),
            })
        console.log(`post added in category ${categoryId}`, newPost)

        // get all posts from user document
        const userDoc = await admin.firestore().collection('users')
            .doc(authorId)
            .get()
        const userPosts = userDoc.data().posts

        // remove the old post from the user document
        await admin.firestore().collection('users')
            .doc(authorId)
            .update({
                posts: userPosts.filter(post => post.id !== postId),
            })
        console.log(`post ${postId} removed from user ${authorId}`)

        // add the new post to the user document
        await admin.firestore().collection('users')
            .doc(authorId)
            .update({
                posts: admin.firestore.FieldValue.arrayUnion(newPost)
            })
        console.log(`post added in user ${authorId}`, newPost)
    })

exports.postDeleted = functions.firestore
    .document('posts/{postId}')
    .onDelete(async (snap) => {
        const deletedPost = snap.data()
        const { categoryId, authorId, commentList } = deletedPost

        // remove the deleted post from the category document
        await admin.firestore().collection('categories')
            .doc(`${categoryId}`)
            .update({
                posts: admin.firestore.FieldValue.arrayRemove(deletedPost),
            })
        console.log(`post removed from category ${categoryId}`, deletedPost)

        // reset the tagNames for the category document
        const categoryDoc = await admin.firestore().collection('categories')
            .doc(`${categoryId}`)
            .get()
        const { posts } = categoryDoc.data()
        const tags = posts.map(post => post.tagNames).reduce((a, b) => [...a, ...b], [])
        const tagNames = [...new Set(tags)]
        await admin.firestore().collection('categories')
            .doc(`${categoryId}`)
            .update({
                tagNames
            })
        console.log('reset tag names', tagNames)

        // remove the deleted post from the user document
        await admin.firestore().collection('users')
            .doc(authorId)
            .update({
                posts: admin.firestore.FieldValue.arrayRemove(deletedPost)
            })
        console.log(`post removed from user ${authorId}`, deletedPost)

        // get all comment IDs from the post
        const commentIds = commentList.map(comment => comment.id)

        // remove the matching comments from the comments collection
        commentIds.forEach(async (id) => {
            await admin.firestore().collection('comments').doc(id).delete()
        })
        console.log(`deleted comments ${commentIds} from comments`)
    })