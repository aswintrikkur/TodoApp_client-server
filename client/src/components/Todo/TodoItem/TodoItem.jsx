import React, { Children, useEffect, useState } from 'react'
import './TodoItem.css'

export const TodoItem = ({ todoContent, deleteCurrentItem, handleItemEdit, editSection, index, children }) => {
    const [completed, setCompleted] = useState({})

    //     task Complete checkbox handle
    const handleComplete = (event) => {
        if (event.target.checked) {
            setCompleted({ textDecoration: 'line-through' });
        } else {
            setCompleted({ textDecoration: 'none' });
        }
    }
    // console.log( `${index} = ${editSection}`)


    return (
        <div>
            <div className="todo-item" >
                {editSection&&children}
                <div className="todo-label" >
                    <input type="checkbox" name="" id={index} onClick={handleComplete} />
                    <label htmlFor={index} style={completed} > {todoContent} </label>
                </div>
                <div className="todo-buttons">
                    <button onClick={handleItemEdit}><img src='../src/Images/image 7.png' alt="edit" /></button>
                    <button onClick={deleteCurrentItem}><img src='../src/Images/image 9.png' alt="delete" /></button>
                </div>
                {/* {error&&children[1]} */}
                {/* {error&& <p className="error-message error-message-edit">  Please enter some content </p> } */}
            </div>
        </div>
    )
}

