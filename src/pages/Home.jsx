import '../styles/Home.css'
import { useNavigate } from 'react-router-dom'
const Home = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>SDR SIMULATOR</h1>
            <h2>Let's see how good you are</h2>

            <h3>Rule #1</h3>
            <p>Qualify the lead. Don't sell</p>
            <button onClick={() => navigate('/simulation')}>Start simulation</button>
        </div>
    )
}

export default Home