import { useEffect, useState } from 'react';
import styles from './Menu.module.css';
import Card from '../UI/Card/Card';
import MenuItem from '../MenuItem/MenuItem';

// Displays all MenuItems to the user - passes the meal.id as key & all meal data as item to MenuItem
const Menu = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        'https://resto-app-bz58.onrender.com/api/menu/1/100'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const datas = await response.json();
      const data = datas?.data;

      const loadedMeals = [];

      for (const key in data) {
        loadedMeals.push({
          id: data[key]._id,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
          isReady: data[key].isReady
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setFetchError(error.message);
    });
  }, []);

  return (
    <Card className={styles.menu}>
      <div className={styles.messages}>
        {isLoading && <p>Meal choices are loading!</p>}
        {fetchError && <p>{fetchError}</p>}
      </div>
      {meals.map((meal) => (
        <MenuItem key={meal.id} item={meal} />
      ))}
    </Card>
  );
};

export default Menu;
