import express, { json } from 'express';
const app = express();
const port = 3001;
import cors from 'cors';
import { config } from 'dotenv';

//FichierDbConnect
import './Models/Db.js';
//dotenv
config()
//cors
app.use(cors());
//routes
app.use(json());
//port
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
