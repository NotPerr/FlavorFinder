import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";

const AppContext = React.createContext()

const allMealsURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const randomMealURL = 'https://www.themealdb.com/api/json/v1/1/random.php';


const AppProvider = ({ children }) => {
    const [meals, setMeals] = useState([]);
    const [loading,setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

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

    useEffect(() => {
        if(!searchTerm) return
        fetchMeals(`${allMealsURL}${searchTerm}`)
    },[searchTerm])

  return (
    <AppContext.Provider
      value={{loading,meals,setSearchTerm,fetchRandomMeal}}>
      {children}
    </AppContext.Provider>
  )
}


export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider }