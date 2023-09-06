import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export default function BasicButtonGroup({ handleSort, reset }) {

    const [activeCategory, setActiveCategory] = useState(null);

    const categories = [
        'Male',
        'Female',
        '0-50',
        '50-100',
        '1st Class',
        '2nd Class',
        '3rd Class',
        'Survivor',
        'Deceased',
    ];

    const handleCategoryClick = (category) => {
        handleSort(category);
        setActiveCategory(category);
    };
    return (
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
            {categories.map((category) => (
                <Button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    variant={!reset && activeCategory === category ? 'outlined' : 'contained'}
                >
                    {category}
                </Button>
            ))}
        </ButtonGroup>
    );
}
