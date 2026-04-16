import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Simulation.css";
 
const angryLeadInfo = {
  mood: 'Angry',
  name: 'Mariano',
  manuscript: 'almost done!',
}

const Simulation = () => {
  const navigate = useNavigate();
  const [selectedLead, setSelectedLead] = useState(null);
  
  return (
    <div className='simulator'>
      <div className='sim-typeOfLead'>
        <div>
          {!selectedLead && (
            <div>
              <h2>Choose a type of lead</h2>
              <div className='sim-lead-buttons'>
                <button onClick={() => setSelectedLead(angryLeadInfo)}>angry</button>
                <button>happy</button>
                <button>busy</button>
              </div>
            </div>
          )}

          {selectedLead && (
            <div className='sim-container-lead-info-and-chat-box'>
              <div className='sim-lead-info'>
                <h3>{selectedLead.mood} lead info</h3>
                <p><b>Name:</b> {selectedLead.name}</p>
                <p><b>Manuscript:</b> {selectedLead.manuscript}</p>
                <button onClick={() => setSelectedLead(null)}>Choose another lead</button>
              </div>
              <div className='chat-box'>
                <p>esta es la chatbox</p>
              </div>
            </div>
          )}
        </div>
      </div>   
      <button onClick={() => navigate('/')} className='home-button'>Go home</button> 
    </div>
  )
}
 


export default Simulation;