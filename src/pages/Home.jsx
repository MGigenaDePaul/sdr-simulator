import '../styles/Home.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
const Home = () => {
    const navigate = useNavigate();
    const [isLeaving, setIsLeaving] = useState(false);

    const handleStart = () => {
        setIsLeaving(true);
        setTimeout(() => {
            navigate('/simulation');
        }, 600);
    };

    return (
        <div className={`home ${isLeaving ? 'fade-out' : ''}`}>
            <h1 className='title'>SDR SIMULATOR</h1>
            <h2 className='subtitle'>Let's see how well you qualify authors</h2>
            
            <div className='rule-card'>
                <h3 className='rule-text'>Rule #1</h3>
                <p>Qualify the lead. Don't sell</p>
            </div>
            
            <button className='start-btn' onClick={handleStart}>Start simulation</button>
        </div>
    )
}

export default Home