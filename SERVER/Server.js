import express, { json } from 'express';
const app = express();
const port = 3001;
import cors from 'cors';
import UserRoute from './Routes/User.routes.js';
import PassengerRoute from './Routes/Passenger.routes.js';
import { config } from 'dotenv';

//FichierDbConnect
import './Models/Db.js';
//dotenv
config()
//cors
app.use(cors());
//routes
app.use(json());
app.use('/users', UserRoute);
app.use('/passengers', PassengerRoute);
//port
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
