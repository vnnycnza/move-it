# Move It
Solution to Smove Fullstack Challenge

## Application
The app allows a user to select or enter a timeframe within the day. This input is used to fetch from the Booking Availability API. Data from the API is then formatted and the Street Address is queried using Google Maps API. Results from Booking Availability API with available_cars > 0 are returned as a list with the street address, count of available cars and drop off count. A map is also shown with markers for the given drop-off locations. Street Address of drop-off locations can also be seen upon click of map marker. 

## Features
- Form to enter start and end time
- API calls to Smove API and Google Maps
- Shows list of locations with available cars
- Shows map of drop off locations
- I like to move it move it 

## Tech Stack
#### APIs
- [Booking Availability API](https://github.com/itatsmove/smovechallenge/blob/master/challenges/availability.md)
- [Google Maps Geocode API](https://developers.google.com/maps/documentation/geocoding/start)

#### Client Side
- [React.js](https://reactjs.org/) as framework, used [Create React App](https://github.com/facebook/create-react-app) as base
- [Semantic-UI-React](https://react.semantic-ui.com/) for UI components
- [react-google-maps](https://github.com/tomchentw/react-google-maps) for rendering Google Maps
- [NPM](https://www.npmjs.com/) for Package and Build Management

#### Server Side
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)


## Running the app locally
Running the server requires an environment variable named as `GOOGLE_API_KEY`.
```
$ cd move-it
$ npm install
$ GOOGLE_API_KEY=<YOUR_GOOGLE_API_KEY> npm start
```

Running the client locally also requires an env variable named as `REACT_APP_GOOGLE_API_KEY`. You can add it on start or create a `client/.env` file.
```
$ cd move-it/client
$ npm install
$ REACT_APP_GOOGLE_API_KEY=<YOUR_GOOGLE_API_KEY> npm start
```