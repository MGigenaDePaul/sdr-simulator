import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Simulation.css";

const angryLeadInfo = {
  name: "Georgia Barnes",
  manuscript: "almost done",
  experience: "second time publishing, didn't have a good experience before",
  budget: "uncertain",
  responses: {
    greeting: "What do you want?!",
    budget: "That's none of your business!",
    manuscript: "Yeah I'm writing one, so what?",
    experience: "Don't remind me of that disaster.",
    transfer: "Why would I talk to someone else?!",
    default: "Stop wasting my time.",
  },
};

const happyLeadInfo = {
  name: "Maria Antonieta",
  manuscript: "done",
  experience: "first time",
  budget: "uncertain",
}

const busyLeadInfo = {
  name: "Rafael Gutierrez",
  manuscript: "finished",
  experience: "has published 5 times",
  budget: "he has it",
}

const keywordMap = [
  { keywords: ["hi", "hello", "hey", "this is"], category: "greeting" },
  { keywords: ["budget", "money", "afford", "cost"], category: "budget" },
  { keywords: ["book", "manuscript", "writing"], category: "manuscript" },
  { keywords: ["experience", "published", "before"], category: "experience" },
  { keywords: ["expert", "transfer", "speak", "call"], category: "transfer" },
];

const Simulation = () => {
  const [messages, setMessages] = useState([
    { from: "Lead", text: "Hello? Who's this?" },
  ]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [input, setInput] = useState("");
  const chatEnd = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    chatEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  const sendMessage = () => {
    if (!input.trim()) return;

    const lowerInput = input.trim().toLowerCase();

    const userMessage = { from: "You", text: lowerInput };

    const match = keywordMap.find((entry) => 
      entry.keywords.some((word) => lowerInput.includes(word))
    )
    
    const reply = match 
      ? selectedLead.responses[match.category]
      : selectedLead.responses.default
    
    
    const leadMessage = { from: "Lead", text: reply}

    setMessages((prev) => [...prev, userMessage, leadMessage]);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="sim-container">
      <div className="sim-left">
        <p className='select-lead-text'>Select a type of lead</p>
        {!selectedLead && (
          <div className="lead-types">
            <button onClick={() => setSelectedLead(angryLeadInfo)}>angry</button>
            <button onClick={() => setSelectedLead(happyLeadInfo)}>happy</button>
            <button onClick={() => setSelectedLead(busyLeadInfo)}>busy</button>
          </div>
        )}  
        
        <br />
        {selectedLead && (  
          <div className="lead-info">
            <h2>📋 Lead Info</h2>
            <p><strong>Name:</strong> {selectedLead.name}</p>
            <p><strong>Manuscript:</strong> {selectedLead.manuscript}</p>
            <p><strong>Experience:</strong> {selectedLead.experience}</p>
            <p><strong>Budget:</strong> {selectedLead.budget}</p>
            <hr />
          </div>
        )}

        
        
        <h3>🎯 Objective</h3>
        <p className="objective-text">
          Qualify the lead and decide if they are ready to speak with an expert.
        </p>
        <button className='home-btn'onClick={() => navigate('/')}>Go to home</button>
      </div>

      <div className="sim-right">
        <div className="chat-box">
          {messages.map((message, i) => (
            <div
              key={i}
              className={`bubble ${message.from === "You" ? "you" : "lead"}`}
            >
              <span className="label">{message.from}</span>
              <p>{message.text}</p>
            </div>
          ))}
          <div ref={chatEnd} /> {/*for scrolling*/}
        </div>

        <div className="input-row">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Simulation;