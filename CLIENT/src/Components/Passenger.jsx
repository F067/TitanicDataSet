import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import SpinWait from '../Components/SpinWait';


function Passenger(props) {

    const { filteredPassengers, isLoading } = props

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', alignItems: 'center' }}>
            {
                isLoading ? (
                    <div style={{ height: "600px", display: 'flex', justifyContent: "center", alignItems: "center" }}>
                        <SpinWait />
                    </div>
                ) :
                    (filteredPassengers && filteredPassengers.map((passenger) => (
                        <Card key={passenger._id} sx={{ maxWidth: '400px', margin: '25px' }}>
                            <CardActionArea>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {passenger.Name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Age: {passenger.Age}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Sex: {passenger.Sex}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Ticket: {passenger.Ticket}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Cabin: {passenger.Cabin}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Class: {passenger.Pclass}
                                    </Typography>
                                    <Typography variant="body2" color="text.primary">
                                        {passenger.Survived ? "Survivor" : "Deceased"}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    )))}
        </div>
    )
}

export default Passenger