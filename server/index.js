import express from 'express';
import dotenv from 'dotenv';
import * as  clientController from './Controllers/clientsController.js'
import * as  workoutController from './Controllers/workoutController.js'



dotenv.config();
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;


//creates an endpoint for the route /clients
app.get('/clients', clientController.getClients);
// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming requests with JSON payloads

// Endpoint for /signup
app.post('/signup', clientController.signup);

app.get('/client/:clientId/workouts',workoutController.getClientWorkouts );

app.get('/client/:clientId/sessions',workoutController.getClientFutureSessions );

// console.log that your server is up and running
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


// Endpoint for /login
app.post('/login', clientController.login);