import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Simulation.css";
 
const angryLeadInfo = {
  mood: 'Angry',
  name: 'Mariano',
  manuscript: 'almost done!',
  responses: {
    greeting: [
      'Hello, who is this?',
    ]
  }
}

const happyLeadInfo = {
  mood: 'happy',
  name: 'Caroline',
  manuscript: 'more than 50% done!',
  responses: {
    greeting: [
      'Hi, how you doing?'
    ]
  }
}

const busyLeadInfo = {
  mood: 'busy',
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
  const [isWaiting, setIsWaiting] = useState(false)

  useEffect(() => {
    if (selectedLead !== null) {
      setMessages([{
        role: 'lead', content: `${selectedLead.responses.greeting}`
      }])
    } else {
      setMessages([]);
    }
  }, [selectedLead])

  useEffect(() => {
    const lastMessagePosition = messages.length - 1 
    if (lastMessagePosition > 0 && messages[lastMessagePosition].role === 'user') {
      setIsWaiting(true);
      setTimeout(() => {
        setMessages((messages) => [...messages, {role: 'lead', content: 'temporary resopnse'}])
        setIsWaiting(false);
      }, 1500)
    }
  }, [messages])

  const handleSend = () => {
    if (input.trim() !== '') {
      setMessages(messages => [...messages, {role: 'user', content: input}])
      setInput('')
    }
  }

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
                    {messages.map((message, index) => (
                      <div key={index} className={message.role === 'lead' ? 'message-lead' : 'message-user'}>
                        {message.content}
                      </div>
                    ))}
                </div>
                <div className='input-area'>
                  <input className='input' 
                      value={input} 
                      onChange={(event) => setInput(event.target.value)} 
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' && !isWaiting) {
                          handleSend();
                        }
                      }} 
                      disabled={isWaiting}
                      placeholder='Type here'
                  />
                  <button onClick={handleSend} className='enter-button'>enter</button>
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