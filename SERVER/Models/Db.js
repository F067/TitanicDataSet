import dotenv from 'dotenv'
dotenv.config()
import { connect } from 'mongoose';

connect(`mongodb+srv://Greg:${process.env.MONGO_PWD}@titanicdataset.wwzekvv.mongodb.net/`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    })
