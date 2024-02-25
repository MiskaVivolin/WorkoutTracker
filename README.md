## About

Fully responsive mobile and web application to track personal gym workout results. Useful for beginners and pros alike. The application focuses on user friendliness.

## Installation

Install with npm i in both the frontend and backend folders. Use with npm start in backend and frontend. frontend/node_modules/expo/AppEntry.js might need to be changed to:
```
import registerRootComponent from 'expo/build/launch/registerRootComponent';

import Index from '../../src/Index';

registerRootComponent(Index);
```

## Using Workout Tracker

First time users must create an account before logging in, which is quick and easy with no email validification. Username must be 4 characters minimum and password 10 characters minimum. Once logged in, login is automatic until user logs out of their account.

![LoginImg](/frontend/assets/images/login.png)

Once logged, users can start adding their exercise results which display on the same page. With future updates the list of results will display on a different page.

![HomepageImg](/frontend/assets/images/homepage.png)

Exercise results can be easily edited and removed from the database.

![EditImg](/frontend/assets/images/edit.png)

## Future updates

Separate pages for adding and viewing exercises. Searches and filters for exercises and dates. Charts to visually track progress.

## Tech stack

React Native, TypeScript, Nodejs, MongoDB.