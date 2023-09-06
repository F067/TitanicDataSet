import { Router } from 'express';
const router = Router();
import { getAllData } from '../Controllers/Passenger.controller.js';

router.get('/passengersData', getAllData);

export default router;