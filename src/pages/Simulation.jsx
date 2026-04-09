import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Simulation.css";

// ─── LEAD DATA ───────────────────────────────────────────────
const angryLeadInfo = {
  name: "Georgia Barnes",
  manuscript: "almost done",
  experience: "second time publishing, didn't have a good experience before",
  budget: "uncertain",
  personality: "angry",
  responses: {
    greeting: [
      "What do you want?!",
      "Who is this?!",
      "Ugh, what now?",
      "Yeah yeah, who's calling?",
    ],
    budget: [
      "That's none of your business!",
      "I'm not discussing money with a stranger.",
      "Why do you need to know that?!",
      "I don't even know what it costs yet. Stop pressuring me.",
    ],
    manuscript: [
      "Yeah I'm writing one, so what?",
      "It's almost done, not that you care.",
      "Don't rush me on my book.",
      "I've been working on it. What about it?",
    ],
    experience: [
      "Don't remind me of that disaster.",
      "Last time was a nightmare, thanks for bringing it up.",
      "I got burned before. Happy now?",
      "I published once before. It was terrible.",
    ],
    transfer: [
      "Why would I talk to someone else?!",
      "So you can't even help me yourself?",
      "Another person to waste my time? No thanks.",
    ],
    transferReady: [
      "Fine... I guess talking to someone couldn't hurt.",
      "Alright, if they actually know what they're doing.",
      "Whatever. Set it up. But they better not waste my time.",
    ],
    publishing: [
      "Publishing is a scam industry.",
      "I've heard it all before.",
      "Don't lecture me about publishing.",
    ],
    help: [
      "I don't need help!",
      "Help? Like last time? No thanks.",
      "Just tell me what you want.",
    ],
    timeline: [
      "Whenever I feel like it!",
      "Don't pressure me with timelines.",
      "I'll be ready when I'm ready.",
    ],
    why: [
      "Why do you care?!",
      "None of your concern.",
      "Stop interrogating me!",
      "Because I have a story to tell, okay?!",
    ],
    who: [
      "I'm Georgia. What's it to you?",
      "Wouldn't you like to know.",
      "I'm someone who's been burned before.",
    ],
    yes: ["Fine. Whatever.", "I guess so.", "Sure, if it'll shut you up."],
    no: ["Absolutely not!", "No way.", "Not a chance."],
    selling: [
      "Are you trying to SELL me something?!",
      "I knew it! This is a sales call!",
      "Don't you dare try to sell me anything!",
    ],
    acknowledge: [
      "Hmph. At least you're listening.",
      "...fine. Go on.",
      "Okay, whatever. What else?",
      "At least you're not as pushy as the last person.",
    ],
    default: [
      "Stop wasting my time.",
      "I don't have patience for this.",
      "Get to the point already!",
      "What does that even mean?",
      "Can you just say what you want?",
    ],
  },
};

const happyLeadInfo = {
  name: "Maria Antonieta",
  manuscript: "done",
  experience: "first time",
  budget: "uncertain",
  personality: "happy",
  responses: {
    greeting: [
      "Hi there! So nice to meet you!",
      "Hello! I'm so excited to talk!",
      "Hey! Thanks for reaching out!",
    ],
    budget: [
      "I haven't really thought about that yet.",
      "Money isn't an issue if it's worth it!",
      "I'm not sure what these things usually cost.",
    ],
    manuscript: [
      "Yes! My book is done! I'm so proud of it!",
      "I just finished it last week!",
      "It's ready to go, I can't wait to share it!",
    ],
    experience: [
      "This is my first time! I'm a little nervous.",
      "I've never done this before, but I'm excited!",
      "Totally new to this. Any tips?",
    ],
    transfer: [
      "Oh sure! I'd love to talk to an expert!",
      "That sounds great! When can I speak to them?",
      "Yes please! The more help the better!",
    ],
    transferReady: [
      "Oh yes! I'd absolutely love to speak with someone!",
      "That sounds amazing! Let's do it!",
      "I'm so ready! Set it up!",
    ],
    publishing: [
      "I've always dreamed of being published!",
      "This is a lifelong dream for me.",
      "I can't believe it might actually happen!",
    ],
    help: [
      "I'd love any help I can get!",
      "Yes please! I'm all ears!",
      "That's so kind of you to offer!",
    ],
    timeline: [
      "I'm ready whenever! The sooner the better!",
      "I'm flexible! Just tell me when.",
      "I was hoping to get started right away!",
    ],
    why: [
      "I just want to share my story with the world!",
      "It's been my dream since I was little.",
      "I feel like my book can help people.",
    ],
    who: [
      "I'm Maria! First-time author and loving it!",
      "Maria Antonieta, nice to meet you!",
      "Just a girl with a dream and a finished book!",
    ],
    yes: ["Absolutely! 100%!", "Yes yes yes!", "Of course!"],
    no: [
      "Oh... well, maybe later then.",
      "Hmm, I'm not sure about that.",
      "Not right now, but I'm open to it!",
    ],
    selling: [
      "Oh... are you trying to sell me something?",
      "Hmm, I wasn't expecting a sales pitch...",
      "I thought this was just a conversation?",
    ],
    acknowledge: [
      "Aww, that's so sweet of you to say!",
      "Thank you! I appreciate that!",
      "You're so kind!",
    ],
    default: [
      "That's interesting! Tell me more!",
      "I'm not sure I understand, but I'm listening!",
      "Could you explain that a bit more?",
    ],
  },
};

const busyLeadInfo = {
  name: "Rafael Gutierrez",
  manuscript: "finished",
  experience: "has published 5 times",
  budget: "he has it",
  personality: "busy",
  responses: {
    greeting: [
      "Yeah, hi. Make it quick.",
      "Hey. I've got 5 minutes.",
      "Hello. What do you need?",
    ],
    budget: [
      "Budget's not a problem. Next question.",
      "I've got the funds. Move on.",
      "Money's handled. What else?",
    ],
    manuscript: [
      "Finished. Ready to go.",
      "Done weeks ago. Just need the right team.",
      "Book's complete. Let's not waste time on that.",
    ],
    experience: [
      "I've published 5 books. I know the drill.",
      "This isn't my first rodeo.",
      "Five titles out there already. I know what I'm doing.",
    ],
    transfer: [
      "If they're good, sure. Set it up.",
      "As long as they don't waste my time.",
      "Fine. But make sure they're prepared.",
    ],
    transferReady: [
      "Let's do it. Set up the call.",
      "Sure. Make it happen.",
      "About time. Connect me.",
    ],
    publishing: [
      "I know the industry. Get to the point.",
      "Publishing is a business. I treat it like one.",
      "Spare me the basics.",
    ],
    help: [
      "I don't need hand-holding. Just efficiency.",
      "Help with what exactly? Be specific.",
      "I need results, not help.",
    ],
    timeline: [
      "Yesterday. I needed this done yesterday.",
      "I'm on a tight schedule. Let's move.",
      "Q1 is my deadline. No exceptions.",
    ],
    why: [
      "Because I have a book to sell. Obviously.",
      "I'm growing my catalog. Simple.",
      "Business reasons. Next.",
    ],
    who: [
      "Rafael Gutierrez. Five-time published author.",
      "Google me. Rafael Gutierrez.",
      "I'm the guy with five books and no time.",
    ],
    yes: ["Yes. Move on.", "Correct.", "That's right."],
    no: ["No. Next.", "Nope.", "Not interested."],
    selling: [
      "Don't try to sell me. I'll walk.",
      "Is this a sales pitch? I'm out.",
      "I don't have time for a sales call.",
    ],
    acknowledge: [
      "Noted. Continue.",
      "Alright. What's next?",
      "Fine. Move on.",
    ],
    default: [
      "Can we stay on track?",
      "I don't have time for this.",
      "Let's focus. What do you need from me?",
    ],
  },
};

// ─── KEYWORD MAP WITH PRIORITY + PHRASES ─────────────────────
const keywordMap = [
  {
    phrases: [
      "speak with an expert", "transfer you", "connect you",
      "speak to someone", "talk to an expert", "set up a call",
      "schedule a call", "pass you along", "introduce you to",
      "put you in touch", "talk to someone", "speak with someone",
      "hand you over",
    ],
    category: "transfer",
    priority: 100,
  },
  {
    phrases: [
      "your manuscript", "your book", "the book", "the manuscript",
      "finished writing", "done writing", "working on a book",
      "writing a book", "how far along", "is it finished",
      "is it done", "is it complete", "how is the book",
      "status of your book", "book coming along", "still writing",
    ],
    category: "manuscript",
    priority: 90,
  },
  {
    phrases: [
      "published before", "publishing experience", "first time publishing",
      "ever published", "your experience", "done this before",
      "tried publishing", "previous experience", "past experience",
      "new to publishing", "new to this", "how many books",
      "how many times",
    ],
    category: "experience",
    priority: 90,
  },
  {
    phrases: [
      "your budget", "budget for", "how much are you",
      "willing to invest", "set aside", "price range",
      "budget in mind", "financial", "afford", "investment",
      "cost for you", "comfortable spending", "thought about budget",
      "thought about cost", "have the funds", "have the budget",
    ],
    category: "budget",
    priority: 90,
  },
  {
    phrases: [
      "good morning", "good afternoon", "good evening",
      "how are you", "nice to meet", "my name is",
      "calling from", "reaching out", "this is",
      "i am calling", "i'm calling",
    ],
    category: "greeting",
    priority: 80,
  },
  {
    phrases: [
      "publishing industry", "publishing process", "about publishing",
      "getting published", "interested in publishing", "want to publish",
      "looking to publish", "publish your", "the publishing",
    ],
    category: "publishing",
    priority: 70,
  },
  {
    phrases: [
      "when are you", "what timeline", "your timeline",
      "your deadline", "how soon", "when do you",
      "when would you", "target date", "time frame", "timeframe",
    ],
    category: "timeline",
    priority: 70,
  },
  {
    phrases: [
      "why do you want", "why are you", "what made you",
      "what inspired", "motivation", "your reason",
      "reason for", "what drives", "goal with",
    ],
    category: "why",
    priority: 70,
  },
  {
    phrases: [
      "who am i speaking", "what is your name", "who is this",
      "tell me about yourself", "may i ask who", "your name",
    ],
    category: "who",
    priority: 70,
  },
  {
    phrases: [
      "can i help", "here to help", "help you", "assist you",
      "support you", "guide you", "how can i",
      "what can i do", "let me help",
    ],
    category: "help",
    priority: 60,
  },
  {
    phrases: [
      "i understand", "i hear you", "that makes sense",
      "i appreciate", "thank you for sharing", "thanks for sharing",
      "sorry to hear", "i can see", "totally understand",
      "completely understand", "no problem", "no worries",
      "of course", "that's fair", "thats fair", "fair enough",
      "i get it", "i get that", "makes sense", "understandable",
      "thank you", "thanks",
    ],
    category: "acknowledge",
    priority: 55,
  },
  {
    phrases: [
      "buy", "purchase", "sign up", "signup", "deal", "offer",
      "package", "discount", "pricing", "our service", "we offer",
      "we provide", "we can give you", "special price", "limited time",
      "act now", "great opportunity", "you should buy",
      "you need to get", "only costs", "just pay",
    ],
    category: "selling",
    priority: 50,
  },
  {
    phrases: ["hello", "hey", "hi"],
    category: "greeting",
    priority: 20,
  },
  {
    phrases: ["budget", "money", "cost", "invest", "pay"],
    category: "budget",
    priority: 15,
  },
  {
    phrases: ["manuscript", "writing", "draft"],
    category: "manuscript",
    priority: 15,
  },
  {
    phrases: ["experience", "published", "previous"],
    category: "experience",
    priority: 15,
  },
  {
    phrases: ["transfer", "expert", "advisor", "connect"],
    category: "transfer",
    priority: 15,
  },
  {
    phrases: ["publish", "publishing"],
    category: "publishing",
    priority: 10,
  },
  {
    phrases: ["timeline", "deadline", "schedule"],
    category: "timeline",
    priority: 10,
  },
  {
    phrases: ["help", "assist", "support"],
    category: "help",
    priority: 10,
  },
  {
    phrases: ["why", "reason"],
    category: "why",
    priority: 10,
  },
];

const yesPatterns = ["yes", "yeah", "yep", "sure", "absolutely", "correct", "right", "okay", "ok", "yup", "definitely"];
const noPatterns = ["no", "nope", "never", "nah", "not really", "i dont think so", "i don't think so", "no thanks", "no thank you"];

// ─── DETECT CATEGORY ─────────────────────────────────────────
const detectCategory = (input) => {
  const cleaned = input.toLowerCase().replace(/[^a-z0-9\s']/g, "");
  const wordCount = cleaned.split(/\s+/).length;

  if (wordCount <= 5) {
    const isYes = yesPatterns.some(
      (p) => cleaned === p || cleaned.startsWith(p + " ") || cleaned.endsWith(" " + p)
    );
    if (isYes) return "yes";

    const isNo = noPatterns.some(
      (p) => cleaned === p || cleaned.startsWith(p + " ") || cleaned.endsWith(" " + p)
    );
    if (isNo) return "no";
  }

  let bestMatch = null;
  let bestScore = 0;

  for (const entry of keywordMap) {
    for (const phrase of entry.phrases) {
      if (cleaned.includes(phrase)) {
        const score = entry.priority + phrase.length;
        if (score > bestScore) {
          bestScore = score;
          bestMatch = entry.category;
        }
      }
    }
  }

  return bestMatch || "default";
};

// ─── REQUIRED TOPICS FOR TRANSFER ────────────────────────────
const REQUIRED_TOPICS = ["budget", "manuscript", "experience"];

// ─── COMPONENT ───────────────────────────────────────────────
const Simulation = () => {
  const [messages, setMessages] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [input, setInput] = useState("");
  const [coveredTopics, setCoveredTopics] = useState(new Set());
  const [simulationComplete, setSimulationComplete] = useState(false);
  const [sellingWarning, setSellingWarning] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [moodScore, setMoodScore] = useState(50);
  const [sellingViolations, setSellingViolations] = useState(0);
  const [empathyCount, setEmpathyCount] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [categoryLog, setCategoryLog] = useState([]);
  const chatEnd = useRef(null);
  const timerRef = useRef(null);
  const navigate = useNavigate();

  // Auto-scroll
  useEffect(() => {
    chatEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Selling warning auto-dismiss
  useEffect(() => {
    if (sellingWarning) {
      const timer = setTimeout(() => setSellingWarning(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [sellingWarning]);

  // Timer
  useEffect(() => {
    if (startTime && !simulationComplete) {
      timerRef.current = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(timerRef.current);
    }
    if (simulationComplete && timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, [startTime, simulationComplete]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const getRandomResponse = (responses) => {
    if (!responses || responses.length === 0) return "...";
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const getMoodLabel = () => {
    if (moodScore >= 80) return "Very Positive";
    if (moodScore >= 60) return "Positive";
    if (moodScore >= 40) return "Neutral";
    if (moodScore >= 20) return "Negative";
    return "Very Negative";
  };

  const getMoodColor = () => {
    if (moodScore >= 80) return "#4ade80";
    if (moodScore >= 60) return "#a3e635";
    if (moodScore >= 40) return "#facc15";
    if (moodScore >= 20) return "#fb923c";
    return "#ef4444";
  };

  const adjustMood = (category) => {
    let delta = 0;
    if (category === "acknowledge") delta = 8;
    else if (category === "greeting") delta = 5;
    else if (category === "help") delta = 4;
    else if (category === "selling") delta = -15;
    else if (category === "default") delta = -3;
    else if (REQUIRED_TOPICS.includes(category)) delta = 3;
    else delta = 1;

    setMoodScore((prev) => Math.max(0, Math.min(100, prev + delta)));
  };

  const handleSelectLead = (leadInfo) => {
    setSelectedLead(leadInfo);
    setMessages([{ from: "Lead", text: "Hello? Who's this?" }]);
    setCoveredTopics(new Set());
    setSimulationComplete(false);
    setSellingWarning(false);
    setSellingViolations(0);
    setEmpathyCount(0);
    setCategoryLog([]);

    const initialMood = leadInfo.personality === "angry" ? 25 :
      leadInfo.personality === "happy" ? 75 : 50;
    setMoodScore(initialMood);
    setStartTime(Date.now());
    setElapsedTime(0);
  };

  const sendMessage = () => {
    if (!input.trim() || !selectedLead || simulationComplete || isTyping) return;

    const userText = input.trim();
    const userMessage = { from: "You", text: userText };
    const category = detectCategory(userText);

    setCategoryLog((prev) => [...prev, { text: userText, category }]);
    adjustMood(category);

    const newCovered = new Set(coveredTopics);
    if (REQUIRED_TOPICS.includes(category)) {
      newCovered.add(category);
      setCoveredTopics(newCovered);
    }

    if (category === "acknowledge") {
      setEmpathyCount((prev) => prev + 1);
    }

    // Selling
    if (category === "selling") {
      setSellingWarning(true);
      setSellingViolations((prev) => prev + 1);
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setIsTyping(true);
      setTimeout(() => {
        const reply = getRandomResponse(selectedLead.responses.selling);
        setMessages((prev) => [...prev, { from: "Lead", text: reply }]);
        setIsTyping(false);
      }, 1200);
      return;
    }

    // Transfer
    if (category === "transfer") {
      const allCovered = REQUIRED_TOPICS.every((t) => newCovered.has(t));
      if (allCovered) {
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);
        setTimeout(() => {
          const reply = getRandomResponse(selectedLead.responses.transferReady);
          setMessages((prev) => [...prev, { from: "Lead", text: reply }]);
          setIsTyping(false);
          setTimeout(() => setSimulationComplete(true), 1500);
        }, 1200);
        return;
      } else {
        const missing = REQUIRED_TOPICS.filter((t) => !newCovered.has(t));
        const topicNames = missing.join(", ");
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);
        setTimeout(() => {
          const reply = getRandomResponse(selectedLead.responses.transfer);
          const hint = `(You haven't covered: ${topicNames})`;
          setMessages((prev) => [
            ...prev,
            { from: "Lead", text: reply },
            { from: "System", text: hint },
          ]);
          setIsTyping(false);
        }, 1200);
        return;
      }
    }

    // Normal
    const responseArray = selectedLead.responses[category] || selectedLead.responses.default;
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      const reply = getRandomResponse(responseArray);
      setMessages((prev) => [...prev, { from: "Lead", text: reply }]);
      setIsTyping(false);
    }, 800 + Math.random() * 800);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const handleRestart = () => {
    setSelectedLead(null);
    setMessages([]);
    setCoveredTopics(new Set());
    setSimulationComplete(false);
    setSellingWarning(false);
    setIsTyping(false);
    setMoodScore(50);
    setSellingViolations(0);
    setEmpathyCount(0);
    setStartTime(null);
    setElapsedTime(0);
    setCategoryLog([]);
    setInput("");
    if (timerRef.current) clearInterval(timerRef.current);
  };

  // ─── MAIN RENDER ───────────────────────────────────────────
  return (
    <div className="sim-container fade-in">
      <div className="sim-left">
        <p className="select-lead-text"><b>Select a type of lead</b></p>
        {!selectedLead && (
          <div className="lead-types">
            <button className="angry-button" onClick={() => handleSelectLead(angryLeadInfo)}><b>Angry</b></button>
            <button className="happy-button" onClick={() => handleSelectLead(happyLeadInfo)}><b>Happy</b></button>
            <button className="busy-button" onClick={() => handleSelectLead(busyLeadInfo)}><b>Busy</b></button>
          </div>
        )}

        {selectedLead && (
          <>
            <div className="timer-display">
              {formatTime(elapsedTime)}
            </div>

            <div className="lead-info">
              <h2>Lead Info</h2>
              <p><strong>Name:</strong> {selectedLead.name}</p>
              <p><strong>Manuscript:</strong> {selectedLead.manuscript}</p>
              <p><strong>Experience:</strong> {selectedLead.experience}</p>
              <p><strong>Budget:</strong> {selectedLead.budget}</p>
            </div>

            <div className="mood-meter">
              <h3>Lead Mood</h3>
              <div className="mood-bar-container">
                <div
                  className="mood-bar-fill"
                  style={{
                    width: `${moodScore}%`,
                    backgroundColor: getMoodColor(),
                  }}
                />
              </div>
              <p className="mood-label" style={{ color: getMoodColor() }}>
                {getMoodLabel()}
              </p>
            </div>

            <hr />
          </>
        )}

        <h3>Objective</h3>
        <p className="objective-text">
          Qualify the lead by covering <strong>budget</strong>, <strong>manuscript</strong>, and <strong>experience</strong> — then transfer to an expert.
        </p>

        {selectedLead && (
          <button className="restart-btn" onClick={handleRestart}>Restart</button>
        )}
        <button className="home-btn" onClick={() => navigate("/")}>Go to home</button>
      </div>

      <div className="sim-right">
        <div className="chat-box">
          {!selectedLead && (
            <div className="chat-placeholder">
              <p><b>Select a lead to begin the conversation</b></p>
            </div>
          )}
          {messages.map((message, i) => (
            <div
              key={i}
              className={`bubble ${
                message.from === "You" ? "you" : message.from === "System" ? "system" : "lead"
              }`}
            >
              <span className="label">{message.from}</span>
              <p>{message.text}</p>
            </div>
          ))}
          {isTyping && (
            <div className="bubble lead typing-bubble">
              <span className="label">Lead</span>
              <div className="typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          {sellingWarning && (
            <div className="selling-warning">
              Warning: You're selling, not qualifying! Remember Rule #1.
            </div>
          )}
          <div ref={chatEnd} />
        </div>

        <div className="input-row">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              !selectedLead
                ? "Select a lead first..."
                : simulationComplete
                ? "Simulation complete!"
                : isTyping
                ? "Lead is typing..."
                : "Type your message..."
            }
            disabled={!selectedLead || simulationComplete || isTyping}
          />
          <button onClick={sendMessage} disabled={!selectedLead || simulationComplete || isTyping}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Simulation;