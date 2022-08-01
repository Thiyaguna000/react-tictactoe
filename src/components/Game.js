import React, { useState } from "react";
import Box from "./Box";
import "./Game.css";
import TurnIndicator from "./TurnIndicator";
import Winner, { checkWinner } from "./Winner";
import Restart from "./Restart";
import axios from 'axios';

const Game = () => {
  const [board, setBoard] = useState(new Array(9).fill(null));
  const [isCross, setCross] = useState(false);
  const [winState, setWinner] = useState(null);
  const [canPlay, setCanPlay] = useState(true);
  const [location,setLocation] = useState();

  const getIndicator = (isCross) => (isCross ? "X" : "O");

  const restart = () => {
    setBoard(new Array(9).fill(null));
    setCross(false);
    setWinner(null);
    setCanPlay(true);
  };

  const onClick = (id) => {
    if (!canPlay) {
      return;
    }
    let newBoard = board.slice();
    let currrentPlayer = getIndicator(isCross);
    newBoard[id] = currrentPlayer;
    setBoard(newBoard);
    let winStatus = checkWinner(currrentPlayer, newBoard);
    setCanPlay(!winStatus.staleMate && !winStatus.winner);

    if (winStatus.staleMate) {
      setWinner("?");
      return;
    }

    if (winStatus.winner) {
      setWinner(winStatus.player);
    }

    if (!winStatus.winner) {
      setCross(!isCross);
    }
  };

  const handleLocation = () => {
      if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition(pos => {
              setLocation(pos);
              const URL = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+pos.coords.latitude
              + ',' + pos.coords.longitude + '&sensor=false';
              axios.get(URL)
                .then(res => {
                    console.log(res);
                }).catch(err => {
                    console.error(err);
                })
            setLocation("https://maps.googleapis.com/maps/api/staticmap?=center="+pos.coords.latitude
            + "," + pos.coords.longitude + "&zoom=13&size=800*400&sensor=false");
          })

      }
  }

  return (
    <div className="board">
      <TurnIndicator indicator={getIndicator(isCross)} />
      <div className="boardContainer">
        <div className="row">
          <Box boardId={0} item={board[0]} onClick={onClick} />
          <Box boardId={1} item={board[1]} onClick={onClick} />
          <Box boardId={2} item={board[2]} onClick={onClick} />
        </div>
        <div className="row">
          <Box boardId={3} item={board[3]} onClick={onClick} />
          <Box boardId={4} item={board[4]} onClick={onClick} />
          <Box boardId={5} item={board[5]} onClick={onClick} />
        </div>
        <div className="row">
          <Box boardId={6} item={board[6]} onClick={onClick} />
          <Box boardId={7} item={board[7]} onClick={onClick} />
          <Box boardId={8} item={board[8]} onClick={onClick} />
        </div>
      </div>
        {winState && <Winner indicator={winState} />}
        {winState && <Restart onClick={restart} />}
        <div>
            Location: <button onClick={handleLocation}>Locate me!</button>
            <img src = {location} alt = "Location"/>
        </div>
    </div>
    
  );
};

export default Game;
