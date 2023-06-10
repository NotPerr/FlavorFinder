
import { useGlobalContext } from "../context";
import {BsHandThumbsUp} from 'react-icons/bs';

const Meals = () => {
    const {meals,loading,selectMeal,selectedMeal,addToFavorites} = useGlobalContext();
   
    if(loading) {
        return <section className="section">
            <h4>Loading...</h4>
        </section>
    }
    if(meals.length < 1 ) {
        return <section className="section">
      <h4>No meals matched your search term. Please try again.</h4>
    </section>
    }
    
      return (
        <section className="section-center">
          {meals.map((singleMeal) => {
            // console.log(singleMeal);
            const {idMeal, strMeal:title, strMealThumb:image} = singleMeal
            return <article className="single-meal" key={idMeal}>
                <img src={image} alt={title} className='img' onClick={()=>{selectMeal(idMeal)}}/>
                <footer>
                    <h5>{title}</h5>
                    <button className="like-btn" onClick={()=>addToFavorites(idMeal)}><BsHandThumbsUp /></button>
                </footer>
            </article>;
          })}
        </section>
      );
  }
  export default Meals;