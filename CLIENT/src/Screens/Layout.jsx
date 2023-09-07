import React, { useState, useEffect } from 'react';
import Navigation from '../Components/Navigation';
import { callGet } from '../Utils';
import Passenger from '../Components/Passenger';
import Searching from '../Components/Searching';
import Sorting from '../Components/Sorting';
import Formular from '../Components/Formular';
import { useSelector, useDispatch } from 'react-redux';
import { setPassengers } from '../Store/Passengers/Slice';
import PassengersDetails from '../Components/PassengersDetails';

function Layout() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [filteredPassengers, setFilteredPassengers] = useState([]);
  const [unsortedPassengers, setUnsortedPassengers] = useState([]);
  const [selectedCriteria, setSelectedCriteria] = useState([]);
  const [reset, setReset] = useState(false);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const resApi = await callGet('/passengers/passengersData');
        if (resApi && resApi.length > 0) {
          setUnsortedPassengers(resApi); // Conserver une copie non triée
          setFilteredPassengers(resApi);
          dispatch(setPassengers(resApi));
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des données depuis le backend :', error.message);
        setIsLoading(false);
      }
    };
    if (user) {
      fetchData();
    }
  }, [dispatch, user]);

  // Fonction pour gérer la recherche
  const handleSearch = (searchValue) => {
    setSearchValue(searchValue);
    applyFiltersAndSort(searchValue, selectedCriteria);
  };

  // Fonction pour appliquer les filtres et le tri
  const applyFiltersAndSort = (searchValue, criteria) => {
    let filteredPassengers = [...unsortedPassengers];

    if (searchValue) {
      filteredPassengers = filteredPassengers.filter((passenger) =>
        passenger.Name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    criteria.forEach((criterion) => {
      switch (criterion) {
        case 'Male':
          filteredPassengers = filteredPassengers.filter((el) => el.Sex === 'male');
          break;
        case 'Female':
          filteredPassengers = filteredPassengers.filter((el) => el.Sex === 'female');
          break;
        case 'Survivor':
          filteredPassengers = filteredPassengers.filter((el) => el.Survived === 1);
          break;
        case 'Deceased':
          filteredPassengers = filteredPassengers.filter((el) => el.Survived === 0);
          break;
        case '1st Class':
          filteredPassengers = filteredPassengers.filter((el) => el.Pclass === 1);
          break;
        case '2nd Class':
          filteredPassengers = filteredPassengers.filter((el) => el.Pclass === 2);
          break;
        case '3rd Class':
          filteredPassengers = filteredPassengers.filter((el) => el.Pclass === 3);
          break;
        case '0-50':
          filteredPassengers = filteredPassengers.filter((el) => el.Age >= 0 && el.Age <= 50);
          break;
        case '50-100':
          filteredPassengers = filteredPassengers.filter((el) => el.Age > 50 && el.Age <= 100);
          break;
        default:
          break;
      }
    });

    setFilteredPassengers(filteredPassengers);
    setNoResults(filteredPassengers.length === 0);
  };

  const handleSort = (criterion) => {
    let updatedCriteria;

    // Vérifie si le critère est déjà sélectionné
    if (selectedCriteria.includes(criterion)) {
      // Si oui, le retire de la liste (désélection)
      updatedCriteria = selectedCriteria.filter((item) => item !== criterion);
    } else {
      // Sinon, l'ajoute à la liste (sélection)
      updatedCriteria = [...selectedCriteria, criterion];
    }

    setSelectedCriteria(updatedCriteria);
    applyFiltersAndSort(searchValue, updatedCriteria);
  };

  const handleReset = () => {
    setSelectedCriteria([]); // Réinitialiser tous les critères de tri
    setFilteredPassengers([...unsortedPassengers]); // Réinitialiser les passagers triés
    setReset(true)
  };

  const categories = [
    'Passengers',
    'Male',
    'Female',
    'Survivor',
    'Deceased',
  ];

  return (
    <div>
      <Navigation setFilteredPassengers={setFilteredPassengers} />
      {!user ? (
        <div style={{ height: '90vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Formular />
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
            <Searching onSearch={handleSearch} searchValue={searchValue} onReset={handleReset} />
            <Sorting filteredPassengers={filteredPassengers} handleSort={handleSort} reset={reset} />
            <div style={{ display: 'flex' }}>
              <PassengersDetails
                categories={categories}
                filteredPassengers={filteredPassengers}
                currentCriterion={selectedCriteria}
              />
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
            <Passenger filteredPassengers={filteredPassengers} isLoading={isLoading} noResults={noResults} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Layout;
