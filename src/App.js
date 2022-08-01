import { Routes, Route, Link } from "react-router-dom";
import Game from './components/Game';
import Counter from "./components/Counter";
import Speech from './components/Speech';
import './App.css';

function App() {
  return (
      <div className="App">
        <Routes>
        <Route path="/" element={<Game />} />
        <Route path="counter" element={<Counter />} />
        <Route path="speech" element={<Speech />} />
      </Routes>
    </div>
   
  );
}

export default App;
