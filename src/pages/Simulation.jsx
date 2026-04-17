import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Simulation.css";
 
const angryLeadInfo = {
  mood: 'Angry',
  name: 'Mariano',
  manuscript: 'almost done!',
  responses: {
    greeting: [
      'Hello, who is this?'
    ]
  }
}

const Simulation = () => {
  const navigate = useNavigate();
  const [selectedLead, setSelectedLead] = useState(null);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (selectedLead !== null) {
      setMessages([{
        role: 'lead', content: `${selectedLead.responses.greeting}`
      }])
    } else {
      setMessages([]);
    }
  }, [selectedLead])

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
                <div className='message-area'>
                  <div className='message-lead'>
                  {selectedLead.responses.greeting}
                  </div>
                  <div className='message-user'>
                  yeahh
                  </div>
                </div>
                <div className='input-area'>
                  <input className='input' value={input} onChange={(event) => setInput(event.target.value)} placeholder='Type here'/>
                  <button className='enter-button'>enter</button>
                </div>
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