import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <p>Please choose a link from the list below.</p>
      <ul>
        <li>
          <Link to="/tictactoe">TicTacToe</Link>
        </li>
        <li>
          <Link to="/counter">Counter</Link>
        </li>
        <li>
          <Link to="/speech">Speech</Link>
        </li>
        <li>
          <Link to="/recorder">Recorder</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
