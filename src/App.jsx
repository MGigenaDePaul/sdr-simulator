import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import Simulation from "./pages/Simulation";

const App = () => {
  return (      
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/simulation' element={<Simulation />} />
    </Routes>
  )
}

export default App;