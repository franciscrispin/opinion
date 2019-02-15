## Opinion

An application where users can post opinions on current issues as well as like and comment on others' opinions. It is similar to Quora but instead of asking questions, users share their opinions.

The application was built with React, Redux and Firebase and is hosted on Firebase Hosting. 

Visit the application [here](https://opinion-fb623.firebaseapp.com).

You can login using this guest account or create a new account.  
Email Address: guest@opinion.com  
Password: password

## Project Screen Shots

![Home](https://duaw26jehqd4r.cloudfront.net/items/1M3B3V0R0D3J041D2t3j/Image%202019-02-15%20at%2010.34.33%20AM.png)
![Profile](https://duaw26jehqd4r.cloudfront.net/items/2I0f0k0X1z432L1v3p2O/Image%202019-02-15%20at%2010.36.29%20AM.png)
![Post](https://duaw26jehqd4r.cloudfront.net/items/3P2N1e33470W080q1d07/Image%202019-02-15%20at%2010.38.24%20AM.png)

## Reflection

The goal for this project was to build a larger scale application with authentication features as well as a backend to manage and store data. This project took 2 and a half weeks to complete with about 50% of the time spent learning how to use Firebase.

I wanted to create an application where users could sign up, post opinions as well as like and comment on other users' post.

I began by sketching out how the application should look on mobile and desktop, and planned the features I wanted to include. I used `create-react-app` to get the application set-up and `material-ui`, a React UI framework, to design the majority of my components. I chose the latter to gain experience styling with a UI library and to understand the CSS-in-JS styling paradigm.

With `material-ui`, I enjoyed the fact that my styles can be applied at the component level rather than the document level so everything about each component can reside in their respective component.js file. I also liked that I did not have to worry about class name collisions unlike styling in CSS where it has one global namespace. The thing that took a while to get used to was not having the ability to bunch all the media queries together like in CSS but instead having to insert them into each class definition. I did, however, use vanilla CSS for the login and sign up forms as well as to layout certain components so I still relied on regular CSS stylesheets for those.

After styling, I spent some time watching a video tutorial on how to integrate Firebase with React and Redux. I enjoyed the user-friendliness of Firebase and how easy it was to set up authentification features and create collections to manage data. I learned about the power of cloud functions to run backend code like updating the users collection with a new post every time a new post is added by the user. 

The main challenge I faced was in implementing the upvote (like) function. Initially, I fired an action to update the number of upvotes asynchronously and then waited for the response of the updated upvotes. This led to a poor user experience as the number of upvotes would not be immediately updated and also led to a race condition if the like button was pressed again before the response was fetched. 

My solution was to fetch the number of upvotes for each post when the component mounted and store it in the redux store. When a user clicks on upvote, an action would be sent to update the number of upvotes in the redux store, then the component can get the state of the updated upvotes from the store and show it to the user immediately. When the user navigates away and the component will unmount, an asynchronous request would be sent to the server to update the number of upvotes.

The main takeaways for this project were learning to use CSS-in-JS as a styling paradigm, and getting a taste of what goes on in the backend.

In my next project, I plan to learn about testing React Apps using libraries like `Jest` as well as UI testing. I also want to practice using breakpoints in the Chrome DevTools to help with debugging.

The main libraries I used for this project include the following: 
* `react`
* `redux`
* `react-router`
* `redux-thunk`
* `firebase`
* `react-redux-firebase` - Redux bindings for Firebase
* `redux-firestore` - Redux bindings for Firestore
* `@material-ui`

## Resources

The following are the main documentation and videos I referred to for this project:
* [React](https://reactjs.org/docs/getting-started.html)
* [Redux](https://redux.js.org/introduction/getting-started)
* [Firebase](https://firebase.google.com/docs/)
* [React Redux Firebase](http://react-redux-firebase.com/docs/getting_started)
* [Redux Firestore](https://github.com/prescottprue/redux-firestore)
* [Material-UI](https://material-ui.com/)
* [React, Redux & Firebase App Tutorial](https://www.youtube.com/playlist?list=PL4cUxeGkcC9iWstfXntcj8f-dFZ4UtlN3)