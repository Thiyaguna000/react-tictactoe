import React from "react";

export const checkWinner = (player, board) => {
  let winOptions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  let winRow = winOptions.find(position => {
    return position.every(item => {
      return board[item] === player;
    });
  });

  let staleMate = board.every(item => {
    return item != null;
  });

  return {
    staleMate,
    winrow: winRow,
    winner: !!winRow,
    player
  };

  return winRow ? true : false;
};

const Winner = ({ indicator }) => {
  const getText = () => {
    return indicator === "?" ? "Stalemate!" : `Player '${indicator}' wins!`;
  };
  return <div className="playerBox">{getText()}</div>;
};

export default Winner;