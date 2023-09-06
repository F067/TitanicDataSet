import React, { useState, useEffect } from 'react';
import Navigation from '../Components/Navigation';
import { callGet } from '../Utils';
import Passenger from '../Components/Passenger';
import Searching from '../Components/Searching';
import Sorting from '../Components/Sorting';
import Formular from '../Components/Formular';
import { useSelector, useDispatch } from 'react-redux';
import { setPassengers } from '../Store/Passengers/Slice'
import PassengersDetails from '../Components/PassengersDetails';

function Layout() {

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user);
  const passengers = useSelector((state) => state.passengers.passengers);

  const [isLoading, setIsLoading] = useState(true)
  const [searchValue, setSearchValue] = useState('');
  const [filteredPassengers, setFilteredPassengers] = useState([]);
  const [unsortedPassengers, setUnsortedPassengers] = useState([]);
  const [currentCriterion, setCurrentCriterion] = useState(null);
  const [reset, setReset] = useState(false);

  const onReset = () => {
    setReset(true)
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
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
    setFilteredPassengers(passengers.filter((passenger) => passenger.Name.toLowerCase().includes(searchValue.toLowerCase())))
  };

  const handleSort = (criterion) => {
    setCurrentCriterion(criterion);
    // Tri des passagers en fonction du critère sélectionné
    let sortedPassengers = [...unsortedPassengers];

    switch (criterion) {
      case 'Male':
        sortedPassengers = sortedPassengers.filter((el) => el.Sex === 'male');
        break;
      case 'Female':
        sortedPassengers = sortedPassengers.filter((el) => el.Sex === 'female');
        break;
      case 'Survivor':
        sortedPassengers = sortedPassengers.filter((el) => el.Survived === 1);
        break;
      case 'Deceased':
        sortedPassengers = sortedPassengers.filter((el) => el.Survived === 0);
        break;
      case '1st Class':
        sortedPassengers = sortedPassengers.filter((el) => el.Pclass === 1);
        break;
      case '2nd Class':
        sortedPassengers = sortedPassengers.filter((el) => el.Pclass === 2);
        break;
      case '3rd Class':
        sortedPassengers = sortedPassengers.filter((el) => el.Pclass === 3);
        break;
      case '0-50':
        sortedPassengers = sortedPassengers.filter((el) => el.Age >= 0 && el.Age <= 50);
        break;
      case '50-100':
        sortedPassengers = sortedPassengers.filter((el) => el.Age > 50 && el.Age <= 100);
        break;
      default:
        break;
    }

    setFilteredPassengers(sortedPassengers);
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
            <Searching onSearch={handleSearch} searchValue={searchValue} onReset={onReset} />
            <Sorting filteredPassengers={filteredPassengers} handleSort={handleSort} reset={reset} />
            <div style={{ display: 'flex' }}>
              <PassengersDetails
                categories={categories}
                filteredPassengers={filteredPassengers}
                currentCriterion={currentCriterion}
              />
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
            <Passenger filteredPassengers={filteredPassengers} isLoading={isLoading} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Layout;
