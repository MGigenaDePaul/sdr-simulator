import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Simulation.css";

const lead = {
  name: "Georgia Barnes",
  manuscript: "Almost finished",
  experience: "Published before",
  budget: "Uncertain",
};

const leadResponses = [
  "Yeah, I remember filling something out...",
  "I'm not sure I have the budget for this.",
  "What exactly do you guys do?",
  "I already published before.",
  "I've been thinking about it for a while now.",
  "Can you just send me an email instead?",
  "How much does it cost?",
];

const Simulation = () => {
  const [messages, setMessages] = useState([
    { from: "Lead", text: "Hello? Who's this?" },
  ]);
  const [input, setInput] = useState("");
  const chatEnd = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    chatEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { from: "You", text: input.trim() };
    const randomReply =
      leadResponses[Math.floor(Math.random() * leadResponses.length)];
    const leadMsg = { from: "Lead", text: randomReply };

    setMessages((prev) => [...prev, userMsg, leadMsg]);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="sim-container">
      <div className="sim-left">
        <h2>📋 Lead Info</h2>
        <p><strong>Name:</strong> {lead.name}</p>
        <p><strong>Manuscript:</strong> {lead.manuscript}</p>
        <p><strong>Experience:</strong> {lead.experience}</p>
        <p><strong>Budget:</strong> {lead.budget}</p>
        <hr />
        <h3>🎯 Objective</h3>
        <p className="objective-text">
          Qualify the lead and decide if they are ready to speak with an expert.
        </p>
        <button onClick={() => navigate('/')}>Go to home</button>
      </div>

      <div className="sim-right">
        <div className="chat-box">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`bubble ${msg.from === "You" ? "you" : "lead"}`}
            >
              <span className="label">{msg.from}</span>
              <p>{msg.text}</p>
            </div>
          ))}
          <div ref={chatEnd} />
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