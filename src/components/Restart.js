import React from "react";

const Restart = ({ onClick }) => {
  return (
    <button className="btn-restart" onClick={onClick}>
      New Game
    </button>
  );
};

export default Restart;
