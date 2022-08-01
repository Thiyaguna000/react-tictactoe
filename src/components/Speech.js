import React,{ useState } from 'react';
import './Counter.css';

const Speech = () => {
    const [inputText,setInputText] = useState("");
    const msg = new SpeechSynthesisUtterance();

    const inputHandler = (e) =>{
        setInputText(e.target.value);
    }

    const speechHandler = (msg) => {
        msg.text = inputText
        window.speechSynthesis.speak(msg)
      }

  return (
    <div>
        <input type="text" value={inputText} onChange={inputHandler} />
        <button onClick={() => speechHandler(msg)}>Speak!</button>
    </div>
  )
}

export default Speech