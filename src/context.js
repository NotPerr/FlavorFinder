import React, {useContext, useEffect} from 'react';
import axios from "axios";

const AppContext = React.createContext()

const allMealsURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=a';
const randomMealURL = 'https://www.themealdb.com/api/json/v1/1/random.php';


const AppProvider = ({ children }) => {

    const fetchMeals = async (url) => {
        try{
            const {data} = await axios(url)
            
            console.log(data)
        }catch(error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        
        fetchMeals(allMealsURL)
    },[])

  return (
    <AppContext.Provider
      value="hello">
      {children}
    </AppContext.Provider>
  )
}


export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider }