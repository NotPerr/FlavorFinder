import { useState } from "react";
import { useGlobalContext } from "../context";

const Search = () => {
    return <header className="search-container">
        <form>
            <input type='text' placeholder="search a meal" className="form-input" />
            <button type='submit' className="btn">search</button>
            <button type='button' className="btn btn-hipster">surprise me!</button>
        </form>
    </header>
  }
  export default Search;