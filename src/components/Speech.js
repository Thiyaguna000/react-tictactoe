import React, { useEffect, useState } from "react";
import "./Counter.css";

const Speech = () => {
  const [inputText, setInputText] = useState("");
  const msg = new SpeechSynthesisUtterance();

  const inputHandler = (e) => {
    setInputText(e.target.value);
  };

  const speechHandler = (msg) => {
    msg.text = inputText;
    window.speechSynthesis.speak(msg);
  };

  const groups = [
    {
      title: "Group A",
      products: [
        { sku: 123, price: 1.29 },
        { sku: 234, price: 1.69 },
      ],
    },
    {
      title: "Group B",
      products: [
        { sku: 345, price: 1.49 },
        { sku: 456, price: 4.58 },
      ],
    },
  ];

  const products = () => {
    // let productList = [];
   const productList = groups.map(element => {
      return element.products
    });
    //let flattened = productList.flat(1);
    let flattened = productList.reduce((a,b)=> a.concat(b));
    flattened.sort((a,b) => b.price-a.price);
    console.log(flattened);
  } 

  useEffect(()=>{
    products();
  },[])

  return (
    <div>
      <input type="text" value={inputText} onChange={inputHandler} />
      <button onClick={() => speechHandler(msg)}>Speak!</button>
      <div>

      </div>
    </div>
  );
};

export default Speech;
