import { Routes, Route, Link } from "react-router-dom";
import Game from './components/Game';
import Counter from "./components/Counter";
import './App.css';

function App() {
  return (
      <div className="App">
        <Routes>
        <Route path="/" element={<Game />} />
        <Route path="counter" element={<Counter />} />
      </Routes>
    </div>
   
  );
}

export default App;
