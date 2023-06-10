import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";

const AppContext = React.createContext()

const allMealsURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const randomMealURL = 'https://www.themealdb.com/api/json/v1/1/random.php';


const AppProvider = ({ children }) => {
    const [meals, setMeals] = useState([]);
    const [loading,setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedMeal,setSelectedMeal] = useState(null);

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
        meal = meals.find(meal => meal.idMeal === idMeal);
        setSelectedMeal(meal);
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }

  return (
    <AppContext.Provider
      value={{loading,meals,setSearchTerm,fetchRandomMeal,showModal,selectedMeal,selectMeal,closeModal}}>
      {children}
    </AppContext.Provider>
  )
}


export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider }