import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Simulation.css";
 
const angryLeadInfo = {
  mood: `Angry`,
  name: `Mariano`,
  manuscript: {
    title: `The Weight of Silence`,
    genre: `Literary Fiction`,
    wordCount: 78000,
    status: `Stuck in formatting review for 3 weeks`
  },
  responses: {
    greeting: [
      `Hello, who is this? I've been waiting THREE weeks for an update.`,
      `Finally someone picks up. Do you people even work there?`,
      `Yeah, hi. I'm about to lose my patience here.`
    ],
    empathy: [
      `Well, at least someone is listening for once.`,
      `Sorry doesn't fix my timeline, but go on.`,
      `I appreciate you saying that, but I've heard it before.`,
      `Okay... I just need to know someone actually cares about my book.`
    ],
    solution: [
      `Okay, so what exactly can you do for me?`,
      `I've heard that before. What's different this time?`,
      `Fine. Walk me through it. What happens next?`,
      `That sounds promising, but I need a specific date.`
    ],
    priceRelated: [
      `I'm very cautious when spending money`,
      `Don't try to upsell me right now, seriously.`,
      `You're talking about money when my book has been stuck for weeks?`,
    ],
    frustrated: [
      `This is exactly the runaround I've been getting.`,
      `Can I speak to someone who actually knows what's going on?`,
      `You're not answering my question.`,
      `I'm about to leave a one-star review everywhere I can.`
    ],
    closing: [
      `Fine, but if I don't hear back by tomorrow I'm escalating this.`,
      `Alright. You have 24 hours. I mean it.`,
      `Okay, send me a confirmation email. I'm keeping a record of everything.`,
      `I'll give you one more chance. Don't let me down.`
    ],
    default: [
      `That doesn't help me at all.`,
      `I don't think you understand my situation.`,
      `Can we focus on my actual problem here?`,
      `I really don't have time for this.`
    ]
  },
  keywords: {
    empathy: [`sorry`, `understand`, `apologize`, `hear you`, `feel`, `frustrating`, `right`, `I get it`],
    solution: [`help`, `fix`, `resolve`, `let me check`, `I can`, `look into`, `take care`, `work on`],
    priceRelated: [`price`, `cost`, `pay`, `refund`, `money`, `charge`, `fee`, `invoice`],
    frustrated: [`wait`, `hold on`, `not sure`, `maybe`, `I think`, `probably`, `no idea`, `can't`],
    closing: [`schedule`, `follow up`, `email`, `call you`, `next steps`, `wrap up`, `touch base`, `get back to you`]
  }
};

const happyLeadInfo = {
  mood: `Happy`,
  name: `Caroline`,
  manuscript: {
    title: `Baking With Nana`,
    genre: `Cookbook / Memoir`,
    wordCount: 42000,
    status: `Proof approved, ready to publish`
  },
  responses: {
    greeting: [
      `Hi there! Oh my gosh, I just got my proof copy and it looks AMAZING!`,
      `Hey! Thanks for picking up, I'm so excited about my book!`,
      `Hello! I hope you're having a great day, I sure am!`
    ],
    empathy: [
      `Aww you're so sweet, thank you!`,
      `That means a lot, really!`,
      `You guys are the best, I love working with you!`,
      `Haha no worries at all, I appreciate you!`
    ],
    solution: [
      `Oh that sounds perfect, let's do it!`,
      `Great idea! I trust you guys completely.`,
      `Ooh yes, that's exactly what I needed!`,
      `Wonderful! You make this so easy.`
    ],
    priceRelated: [
      `Oh sure, what are the options?`,
      `That sounds reasonable! Tell me more.`,
      `I'm happy to invest in my book, what do you recommend?`,
      `No problem! Just send me the details.`
    ],
    frustrated: [
      `Oh no worries, take your time!`,
      `Haha it's okay, I know you guys are busy!`,
      `No rush at all, I'm just happy to be here!`,
      `That's okay! I'm sure you'll figure it out.`
    ],
    closing: [
      `Sounds like a plan! Thank you so much!`,
      `Can't wait! This is going to be amazing!`,
      `Perfect, I'll keep an eye on my email. You're awesome!`,
      `Yay! Thanks for everything, talk soon!`
    ],
    default: [
      `Oh cool! Tell me more!`,
      `Hmm I'm not sure I follow, but I trust you!`,
      `Interesting! What does that mean for my book?`,
      `Ha! You guys always know what you're doing.`
    ]
  },
  keywords: {
    empathy: [`sorry`, `understand`, `apologize`, `hear you`, `feel`, `congrats`, `excited`, `amazing`],
    solution: [`help`, `fix`, `resolve`, `let me check`, `I can`, `look into`, `set up`, `recommend`],
    priceRelated: [`price`, `cost`, `pay`, `package`, `money`, `charge`, `fee`, `investment`],
    frustrated: [`wait`, `hold on`, `not sure`, `maybe`, `I think`, `delay`, `problem`, `issue`],
    closing: [`schedule`, `follow up`, `email`, `call you`, `next steps`, `launch`, `publish`, `go live`]
  }
};

const busyLeadInfo = {
  mood: `Busy`,
  name: `Daniel`,
  manuscript: {
    title: `Operational Excellence in Healthcare Systems`,
    genre: `Business / Non-fiction`,
    wordCount: 115000,
    status: `Waiting on ISBN assignment`
  },
  responses: {
    greeting: [
      `Hey — sorry, in between meetings. What's the status on my ISBN?`,
      `Hi, I've got about five minutes. What do you need?`,
      `Yeah, make it quick. I'm slammed today.`
    ],
    empathy: [
      `I appreciate that, but I just need the status.`,
      `Okay, thanks. Can we move this along?`,
      `Sure. So what's the actual update?`,
      `I hear you. Just give me the bottom line.`
    ],
    solution: [
      `Good. How long will that take?`,
      `Fine. Send me the details by email.`,
      `That works. What's the timeline?`,
      `Okay, do it. Just keep me posted.`
    ],
    priceRelated: [
      `Just send me the invoice.`,
      `What's the bottom line? I don't need a breakdown right now.`,
      `Fine, charge the card on file.`,
      `Is this included or extra? Quick answer.`
    ],
    frustrated: [
      `I don't have time for this.`,
      `Can you just email me the answer?`,
      `Look, I've got a meeting in two minutes.`,
      `This should have been handled already.`
    ],
    closing: [
      `Great, gotta go. Email me the confirmation.`,
      `Perfect. Send it over, I'll review tonight.`,
      `Alright, done. Talk later.`,
      `Good. Follow up by end of day please.`
    ],
    default: [
      `Okay, and?`,
      `Get to the point please.`,
      `I'm not following. Make it simple.`,
      `Is there something you need from me or not?`
    ]
  },
  keywords: {
    empathy: [`sorry`, `understand`, `apologize`, `hear you`, `feel`, `busy`, `time`, `respect`],
    solution: [`help`, `fix`, `resolve`, `let me check`, `I can`, `look into`, `handle`, `take care`],
    priceRelated: [`price`, `cost`, `pay`, `invoice`, `money`, `charge`, `fee`, `bill`],
    frustrated: [`wait`, `hold on`, `not sure`, `maybe`, `I think`, `probably`, `let me see`, `one moment`],
    closing: [`schedule`, `follow up`, `email`, `call you`, `next steps`, `confirm`, `send`, `get back to you`]
  }
};

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
      const leadReply = getLeadResponse(messages[lastMessagePosition].content, selectedLead);
      setTimeout(() => {
        setMessages((messages) => [...messages, {role: 'lead', content: leadReply }])
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
                <button onClick={() => setSelectedLead(happyLeadInfo)}>happy</button>
                <button onClick={() => setSelectedLead(busyLeadInfo)}>busy</button>
              </div>
            </div>
          )}

          {selectedLead && (
            <div className='sim-container-lead-info-and-chat-box'>
              <div className='sim-lead-info'>
                  <h3>{selectedLead.mood} lead info</h3>
                  <p><b>Name:</b> {selectedLead.name}</p>
                  <p><b>Title:</b> {selectedLead.manuscript.title}</p>
                  <p><b>Genre:</b> {selectedLead.manuscript.genre}</p>
                  <p><b>Word Count:</b> {selectedLead.manuscript.wordCount.toLocaleString()}</p>
                  <p><b>Status:</b> {selectedLead.manuscript.status}</p>
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

function getLeadResponse(userMessage, selectedLead) {
  const lowerMessage = userMessage.toLowerCase();

  for (const [category, keywords] of Object.entries(selectedLead.keywords)) {
    for (const keyword of keywords) {
      if (lowerMessage.includes(keyword)) {
        const responses = selectedLead.responses[category];
        return responses[Math.floor(Math.random() * responses.length)];
      }
    } 
  }

  const defaults = selectedLead.responses.default;
  return defaults[Math.floor(Math.random() * defaults.length)];
}


 


export default Simulation;