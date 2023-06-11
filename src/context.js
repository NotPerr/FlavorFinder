import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";

const AppContext = React.createContext()

const allMealsURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const randomMealURL = 'https://www.themealdb.com/api/json/v1/1/random.php';

const getFavoritesFromLocalStorage = () => {
    let favorites = localStorage.getItem('favorites');
    if(favorites) {
        favorites = JSON.parse(localStorage.getItem('favorites'));
    }else {
        favorites = [];
    }
    return favorites;
}


const AppProvider = ({ children }) => {
    const [meals, setMeals] = useState([]);
    const [loading,setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedMeal,setSelectedMeal] = useState(null);
    const [favorites, setFavorites] = useState(getFavoritesFromLocalStorage());
    const [showFavorite, setShowFavorite] = useState(false);

    const fetchMeals = async (url) => {
        setLoading(true);
        try{
            const {data} = await axios(url)
            // console.log(response.data)
            if(data.meals) {
                setMeals(data.meals)
            }else {
                setMeals([])
            }
            
            
        }catch(error) {
            console.log(error)
        }
        setLoading(false);
    }

    const fetchRandomMeal = () => {
        fetchMeals(randomMealURL);
    }

    //fetch all meals data on first render
    useEffect(()=>{
        fetchMeals(allMealsURL)
    },[])

    //fetch all meals data on search
    useEffect(() => {
        if(!searchTerm) return
        fetchMeals(`${allMealsURL}${searchTerm}`)
    },[searchTerm])


    // click on meal's img to show modal
    const selectMeal = (idMeal,favoriteMeal) => {
        let meal;
        if(favoriteMeal) {
            meal = favorites.find(meal => meal.idMeal === idMeal);
        }else {
            meal = meals.find(meal => meal.idMeal === idMeal);
        }
        
        setSelectedMeal(meal);
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    const addToFavorites = (idMeal) => {
        const alreadyFavorite = favorites.find((meal) => meal.idMeal === idMeal);
        if(alreadyFavorite) {
            removeFromFavorites(idMeal)
        }else {
            // add to favorites
        const meal = meals.find((meal) => meal.idMeal === idMeal);
        const updatedFavorites = [...favorites, meal];
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites',JSON.stringify(updatedFavorites));
        }
        
    }

    const removeFromFavorites = (idMeal) => {
        const updatedFavorites = favorites.filter(meal => meal.idMeal !== idMeal);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites',JSON.stringify(updatedFavorites));
    }

    const toggleShowFavorite = () => {
        setShowFavorite(pre=>!pre);
    }

  return (
    <AppContext.Provider
      value={{loading,meals,setSearchTerm,fetchRandomMeal,showModal,selectedMeal,selectMeal,closeModal
      ,addToFavorites,removeFromFavorites,favorites,showFavorite, setShowFavorite,toggleShowFavorite}}>
      {children}
    </AppContext.Provider>
  )
}


export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider }