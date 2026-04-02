import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Simulation.css";

const angryLeadInfo = {
  name: "Georgia Barnes",
  manuscript: "almost done",
  experience: "second time publishing, didn't have a good experience before",
  budget: "uncertain",
  responses: {
    greeting: ["What do you want?!", "Who is this?!", "Ugh, what now?"],
    budget: ["That's none of your business!", "I'm not discussing money with a stranger.", "Why do you need to know that?!"],
    manuscript: ["Yeah I'm writing one, so what?", "It's almost done, not that you care.", "Don't rush me on my book."],
    experience: ["Don't remind me of that disaster.", "Last time was a nightmare, thanks for bringing it up.", "I got burned before. Happy now?"],
    transfer: ["Why would I talk to someone else?!", "So you can't even help me yourself?", "Another person to waste my time? No thanks."],
    publishing: ["Publishing is a scam industry.", "I've heard it all before.", "Don't lecture me about publishing."],
    help: ["I don't need help!", "Help? Like last time? No thanks.", "Just tell me what you want."],
    timeline: ["Whenever I feel like it!", "Don't pressure me with timelines.", "I'll be ready when I'm ready."],
    why: ["Why do you care?!", "None of your concern.", "Stop interrogating me!"],
    who: ["I'm Georgia. What's it to you?", "Wouldn't you like to know.", "I'm someone who's been burned before."],
    yes: ["Fine. Whatever.", "I guess so.", "Sure, if it'll shut you up."],
    no: ["Absolutely not!", "No way.", "Not a chance."],
    default: ["Stop wasting my time.", "I don't have patience for this.", "Get to the point already!"],
  },
};

const happyLeadInfo = {
  name: "Maria Antonieta",
  manuscript: "done",
  experience: "first time",
  budget: "uncertain",
  responses: {
    greeting: ["Hi there! So nice to meet you!", "Hello! I'm so excited to talk!", "Hey! Thanks for reaching out!"],
    budget: ["I haven't really thought about that yet.", "Money isn't an issue if it's worth it!", "I'm not sure what these things usually cost."],
    manuscript: ["Yes! My book is done! I'm so proud of it!", "I just finished it last week!", "It's ready to go, I can't wait to share it!"],
    experience: ["This is my first time! I'm a little nervous.", "I've never done this before, but I'm excited!", "Totally new to this. Any tips?"],
    transfer: ["Oh sure! I'd love to talk to an expert!", "That sounds great! When can I speak to them?", "Yes please! The more help the better!"],
    publishing: ["I've always dreamed of being published!", "This is a lifelong dream for me.", "I can't believe it might actually happen!"],
    help: ["I'd love any help I can get!", "Yes please! I'm all ears!", "That's so kind of you to offer!"],
    timeline: ["I'm ready whenever! The sooner the better!", "I'm flexible! Just tell me when.", "I was hoping to get started right away!"],
    why: ["I just want to share my story with the world!", "It's been my dream since I was little.", "I feel like my book can help people."],
    who: ["I'm Maria! First-time author and loving it!", "Maria Antonieta, nice to meet you!", "Just a girl with a dream and a finished book!"],
    yes: ["Absolutely! 100%!", "Yes yes yes!", "Of course!"],
    no: ["Oh... well, maybe later then.", "Hmm, I'm not sure about that.", "Not right now, but I'm open to it!"],
    default: ["That's interesting! Tell me more!", "I'm not sure I understand, but I'm listening!", "Could you explain that a bit more?"],
  },
};

const busyLeadInfo = {
  name: "Rafael Gutierrez",
  manuscript: "finished",
  experience: "has published 5 times",
  budget: "he has it",
  responses: {
    greeting: ["Yeah, hi. Make it quick.", "Hey. I've got 5 minutes.", "Hello. What do you need?"],
    budget: ["Budget's not a problem. Next question.", "I've got the funds. Move on.", "Money's handled. What else?"],
    manuscript: ["Finished. Ready to go.", "Done weeks ago. Just need the right team.", "Book's complete. Let's not waste time on that."],
    experience: ["I've published 5 books. I know the drill.", "This isn't my first rodeo.", "Five titles out there already. I know what I'm doing."],
    transfer: ["If they're good, sure. Set it up.", "As long as they don't waste my time.", "Fine. But make sure they're prepared."],
    publishing: ["I know the industry. Get to the point.", "Publishing is a business. I treat it like one.", "Spare me the basics."],
    help: ["I don't need hand-holding. Just efficiency.", "Help with what exactly? Be specific.", "I need results, not help."],
    timeline: ["Yesterday. I needed this done yesterday.", "I'm on a tight schedule. Let's move.", "Q1 is my deadline. No exceptions."],
    why: ["Because I have a book to sell. Obviously.", "I'm growing my catalog. Simple.", "Business reasons. Next."],
    who: ["Rafael Gutierrez. Five-time published author.", "Google me. Rafael Gutierrez.", "I'm the guy with five books and no time."],
    yes: ["Yes. Move on.", "Correct.", "That's right."],
    no: ["No. Next.", "Nope.", "Not interested."],
    default: ["Can we stay on track?", "I don't have time for this.", "Let's focus. What do you need from me?"],
  },
};

const keywordMap = [
  { keywords: ["hi", "hello", "hey", "this", "good morning", "good afternoon"], category: "greeting" },
  { keywords: ["budget", "money", "afford", "cost", "invest", "pay"], category: "budget" },
  { keywords: ["book", "manuscript", "writing", "written", "draft"], category: "manuscript" },
  { keywords: ["experience", "published", "before", "past", "previous"], category: "experience" },
  { keywords: ["expert", "transfer", "speak", "call", "connect", "advisor"], category: "transfer" },
  { keywords: ["publish", "publishing", "industry", "market"], category: "publishing" },
  { keywords: ["help", "assist", "support", "guide"], category: "help" },
  { keywords: ["when", "timeline", "deadline", "schedule", "soon", "ready"], category: "timeline" },
  { keywords: ["why", "reason", "purpose"], category: "why" },
  { keywords: ["who", "name", "yourself"], category: "who" },
  { keywords: ["yes", "yeah", "sure", "absolutely", "correct"], category: "yes" },
  { keywords: ["no", "nope", "never", "not"], category: "no" },
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


  const getRandomResponse = (responses) => {
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const lowerInput = input.trim().toLowerCase();

    const userMessage = { from: "You", text: lowerInput };

    const match = keywordMap.find((entry) => 
      entry.keywords.some((word) => lowerInput.split(" ").includes(word))
    )

    console.log('match', match)
    console.log('random response', selectedLead.responses[match.category])
    
    const reply = match 
      ? getRandomResponse(selectedLead.responses[match.category])
      : getRandomResponse(selectedLead.responses.default)
    
    
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