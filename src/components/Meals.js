
import { useGlobalContext } from "../context";
import {BsHandThumbsUp} from 'react-icons/bs';

const Meals = () => {
    const {meals,loading} = useGlobalContext();
    console.log(meals)
   
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
                <img src={image} alt={title} className='img' />
                <footer>
                    <h5>{title}</h5>
                    <button className="like-btn"><BsHandThumbsUp /></button>
                </footer>
            </article>;
          })}
        </section>
      );
  }
  export default Meals;