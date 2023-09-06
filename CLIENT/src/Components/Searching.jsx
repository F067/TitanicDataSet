import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SearchIcon from '@mui/icons-material/Search';

export default function CustomizedInputBase(props) {
    const { onSearch, searchValue, onReset} = props;

    const [localSearchValue, setLocalSearchValue] = useState(searchValue);

    const handleSearch = () => {
        onSearch(localSearchValue);
    };


    const handleReset = () => {
        setLocalSearchValue('');
        onSearch('');
        onReset()
    };

    return (
        <Paper
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, margin: '25px' }}
        >
            <IconButton onClick={handleReset} sx={{ p: '10px' }} aria-label="menu">
                <RestartAltIcon />
            </IconButton>
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Passenger"
                value={localSearchValue}
                onChange={(e) => setLocalSearchValue(e.target.value)}
            />
            <IconButton type="button" onClick={handleSearch} sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}
