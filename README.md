# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.




## Architecture

The app architecture has been divided into components, redux, service and store. 


- components dir contains all react component. (No service/store logic)
- redux dir contains all tools, actions, reducers and saga to support app.
- service dir contains all service logic. 
- store contains store setup file. 

Components are dispatching actions and all logic are integrated into saga and services.
Components are using memoized selectors to fetch data from store


##How conflicts are resolved
At first, I used yjs library with y-websocket to integrate text sync. 
But this setup was causing a lot of issues/conflicts.
To build a good text editor we need to have more control over code so, I started to insert and remove data based on cursor position.
(there must be already solved solutions to this. there could be libraries as well doing the same; I integrated some solutions from web but they all were in bad shape as per our requirement)



##Further exploration
- I would like to explore more about it. As of now I am handing to much manually to support cursor position, paste operation, select and delete operation and undo operation, for which I think there should be better ways to do so (which I will definitely look into);
