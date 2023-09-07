import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export default function BasicButtonGroup({ handleSort }) {
  const [isSorted, setIsSorted] = useState({});

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
    setIsSorted((prevState) => ({
      ...prevState,
      [category]: !prevState[category], // Inverse la valeur du tri
    }));

    // Utilise prevState pour s'assurer que l'état est mis à jour immédiatement
    if (isSorted[category]) {
      handleSort(null); // Réinitialise le tri
    } else {
      handleSort(category); // Trie par la catégorie sélectionnée
    }
  };

  return (
    <ButtonGroup variant="contained" aria-label="outlined primary button group">
      {categories.map((category) => (
        <Button
          key={category}
          onClick={() => handleCategoryClick(category)}
          variant={isSorted[category] ? 'outlined' : 'contained'}
        >
          {category}
        </Button>
      ))}
    </ButtonGroup>
  );
}
