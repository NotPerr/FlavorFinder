import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";

const AppContext = React.createContext()

const allMealsURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=a';
const randomMealURL = 'https://www.themealdb.com/api/json/v1/1/random.php';


const AppProvider = ({ children }) => {
    const [meals, setMeals] = useState([]);
    const [loading,setLoading] = useState(false);

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

    useEffect(()=>{
        
        fetchMeals(allMealsURL)
    },[])

  return (
    <AppContext.Provider
      value={{loading,meals}}>
      {children}
    </AppContext.Provider>
  )
}


export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider }