import { connect } from 'mongoose';

connect(`mongodb+srv://Greg:Greg120292@titanicdataset.wwzekvv.mongodb.net/`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    })