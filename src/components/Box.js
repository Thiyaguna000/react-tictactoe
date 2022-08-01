import React from 'react'

const Box = ({boardId, item, onClick}) => {

    const handleClick = () => {
        if(item){
            return;
        }
        onClick(boardId);
    }
  return (
    <>
    <div className='box' onClick={handleClick}>
        <span className={item}>{item}</span>
    </div>
    </>
  )
}

export default Box