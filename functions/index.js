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
        console.log(`post id and tag names ${tagNames} fields added to post ${doc.id}`)

        // add post and tag names to category document
        await admin.firestore().collection('categories')
            .doc(`${categoryId}`)
            .update({
                posts: admin.firestore.FieldValue.arrayUnion(postWithId),
                tagNames: admin.firestore.FieldValue.arrayUnion(...tagNames),
            })
        console.log(`post ${doc.id} and tag names ${tagNames} fields added to category ${categoryId}`)

        // add post to users document
        await admin.firestore().collection('users')
            .doc(authorId)
            .update({
                posts: admin.firestore.FieldValue.arrayUnion(postWithId)
            })
        console.log(`post ${doc.id} added to user ${authorId}`)
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

        // replace the old post with the new post in the category document
        const newCategoryPosts = [...categoryPosts.filter(post => post.id !== postId), newPost]
        await admin.firestore().collection('categories')
            .doc(`${categoryId}`)
            .update({
                posts: newCategoryPosts,
            })
        console.log(`new post replaced old post ${postId} in category ${categoryId}`)

        // get all posts from user document
        const userDoc = await admin.firestore().collection('users')
            .doc(authorId)
            .get()
        const userPosts = userDoc.data().posts

        // remove the old post from the user document
        const newUserPosts = [...userPosts.filter(post => post.id !== postId), newPost]
        await admin.firestore().collection('users')
            .doc(authorId)
            .update({
                posts: newUserPosts,
            })
        console.log(`new post replaced old post ${postId} in user ${authorId}`)
    })

exports.postDeleted = functions.firestore
    .document('posts/{postId}')
    .onDelete(async (snap, context) => {
        const postId = context.params.postId
        const deletedPost = snap.data()
        const { categoryId, authorId, commentList } = deletedPost

        // remove the deleted post from the category document
        await admin.firestore().collection('categories')
            .doc(`${categoryId}`)
            .update({
                posts: admin.firestore.FieldValue.arrayRemove(deletedPost),
            })
        console.log(`post ${postId} removed from category ${categoryId}`)

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
        console.log('reset tag names for category ${categoryId}', tagNames)

        // remove the deleted post from the user document
        await admin.firestore().collection('users')
            .doc(authorId)
            .update({
                posts: admin.firestore.FieldValue.arrayRemove(deletedPost)
            })
        console.log(`post ${postId} removed from user ${authorId}`)

        // get all comment IDs from the post
        const commentIds = commentList.map(comment => comment.id)

        // remove the matching comments from the comments collection
        commentIds.forEach(async (id) => {
            await admin.firestore().collection('comments').doc(id).delete()
        })
        console.log(`deleted comments ${commentIds} from comments collection`)
    })

exports.userDeleted = functions.firestore
    .document('users/{userId}')
    .onDelete((snap) => {
        const posts = snap.data().posts
        const postIds = posts.map(post => post.id)
        console.log(postIds)

        postIds.forEach(async (id) => {
            await admin.firestore().collection('posts')
                .doc(id)
                .delete()
        })
        console.log(`deleted all user posts ${postIds}`)

    })

exports.commentDeleted = functions.firestore
    .document('comments/{commentId}')
    .onDelete(async (snap) => {
        const deletedComment = snap.data()
        const { postId } = deletedComment

        // get the number of comments in the previous post
        const postDoc = await admin.firestore().collection('posts')
            .doc(postId)
            .get()
        const { comments } = postDoc.data()

        // remove the deleted comment from the post document
        await admin.firestore().collection('posts')
            .doc(postId)
            .update({
                commentList: admin.firestore.FieldValue.arrayRemove(deletedComment),
                comments: comments - 1
            })
        console.log(`comment removed from post ${postId}`, deletedComment)
    })