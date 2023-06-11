
import './App.css';
import Favorites from './components/Favorites';
import Meals from './components/Meals';
import Modal from './components/Modal';
import Search from './components/Search';
import { useGlobalContext } from './context';
import FavoriteIndicator from './components/FavoriteIndicator';
import { useState } from 'react';

function App() {

  const { showModal, favorites, showFavorite } = useGlobalContext();
  

  return (
    <main>
      <header>
        <FavoriteIndicator />
        <Search />
        {showFavorite && <Favorites />}
      </header>
      
      
      
      <Meals />
      { showModal && <Modal /> }
        
    </main>
  );
}

export default App;
