import mongoose from 'mongoose'

const passengersSchema = mongoose.Schema({
    PassengerId: Number,
    Survived: Number,
    Pclass: Number,
    Name: String,
    Sex: String,
    Age: Number,
    SibSp: Number,
    Parch: Number,
    Ticket: String,
    Fare: Number,
    Cabin: String,
    Embarked: String,
});

const PassengerModel = mongoose.model('passengers', passengersSchema);

export default PassengerModel;
