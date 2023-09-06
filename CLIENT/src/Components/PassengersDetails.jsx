import React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

function PassengersDetails({ categories, filteredPassengers, currentCriterion }) {
    return (
        <div style={{ display: 'flex' }}>
            {categories.map((category) => {
                if (category === 'Passengers') {
                    return (
                        <Stack key={category} sx={{ margin: '20px' }} direction="row" spacing={1}>
                            <Chip
                                label={`${category}: ${filteredPassengers.length}`}
                                variant="outlined"
                            />
                        </Stack>
                    );
                } else {
                    return (
                        <Stack key={category} sx={{ margin: '20px' }} direction="row" spacing={1}>
                            <Chip
                                label={`${category}: ${filteredPassengers.filter((el) => {
                                    if (category === 'Male' || category === 'Female') {
                                        return el.Sex === category.toLowerCase();
                                    } else if (category === 'Survivor') {
                                        return el.Survived === 1 && (currentCriterion === 'Male' ? el.Sex === 'male' : true);
                                    } else if (category === 'Deceased') {
                                        return el.Survived === 0 && (currentCriterion === 'Male' ? el.Sex === 'male' : true);
                                    }
                                    return false;
                                }).length}`}
                                variant="outlined"
                            />
                        </Stack>
                    );
                }
            })}
        </div>
    );
}

export default PassengersDetails;
