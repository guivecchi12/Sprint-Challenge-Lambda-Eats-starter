import React from "react";
import {Route} from "react-router-dom";
import Home from "./Home";
import './App.css';
import Pizza from "./Pizza";
 

const App = () => {
  return (
    <>
      <div>
        <h1>Lambda Eats</h1>
        <Route exact path="/" component = {Home}/>
        <Route path="/pizza/" component = {Pizza}/>
      </div>
      
    </>
  );
};
export default App;
