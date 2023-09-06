import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../Store/User/slice';
import { setPassengers } from '../Store/Passengers/Slice';




const ButtonAppBar = (props) => {
    const { setFilteredPassengers } = props
    const user = useSelector((state) => state.user.user)

    const dispatch = useDispatch()

    const handleLogout = () => {
        // Effacer le JWT du local storage
        localStorage.removeItem('JWT');
        // Effacer les données de l'utilisateur dans Redux en dispatchant l'action "logout"
        dispatch(setUser(null));
        dispatch(setPassengers([]));
        setFilteredPassengers([])
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <DirectionsBoatIcon />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginLeft: '5px' }}>
                        TITANIC REGISTER
                    </Typography>
                    {user ?
                        <div>
                            <span style={{ padding: '5px', margin: '5px', fontFamily: 'sans-serif' }}>{user.name.toUpperCase()}</span>
                            <Button sx={{ border: 'solid white 3px' }} onClick={handleLogout} color="inherit">Logout</Button>
                        </div>
                        : null
                    }
                </Toolbar>
            </AppBar>
        </Box >
    );
}

export default ButtonAppBar;