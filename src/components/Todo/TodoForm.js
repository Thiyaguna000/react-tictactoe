import React, { useState } from "react";

const TodoForm = () => {
  const [userInput, setUserInput] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [strike,setStrike] = useState(false);

  const userInputhandler = (e) => {
    setUserInput(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setMessageList([...messageList, userInput]);
    setUserInput("");
  };

  const deleteHandler = (val) => {
    let delIndex = messageList.indexOf(val);
    // setMessageList([
    //   ...messageList.slice(0, delIndex),
    //   ...messageList.slice(delIndex + 1),
    // ]);
    if(delIndex){
        setStrike(!strike);
    }

  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <div>
          <label>
            Todo:
            <input type="text" value={userInput} onChange={userInputhandler} />
          </label>
          <button type="submit">Add</button>
        </div>
      </form>

      {messageList &&
        messageList.map((val, index) => (
          <li className={strike ? 'strike' : ""} key={index} onClick={()=>deleteHandler(val)}>
            {val}
          </li>
        ))}
        <style>{`
                    .strike {
                        text-decoration: line-through;
                    }
                `}</style>
    </>
  );
};

export default TodoForm;
