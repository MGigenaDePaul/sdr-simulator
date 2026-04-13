import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Simulation.css";
 
const Simulation = () => {
  const [selectedLed, setSelectedLead] = useState(null);

  return (
    <div className='simulator'>
      <div className='sim-typeOfLead'>
        <h2>Choose a type of lead</h2>
        <div className='sim-lead-buttons'>
          <button>angry</button>
          <button>happy</button>
          <button>busy</button>
        </div>
      </div>   
      <button className='home-button'>Go home</button> 
    </div>
  )
}
 


export default Simulation;