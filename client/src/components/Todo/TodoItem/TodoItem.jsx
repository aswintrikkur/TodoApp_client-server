import React, { useEffect, useState } from "react";
import "./TodoItem.css";

export const TodoItem = ({ handleDeleteItem, handleItemEdit, handleComplete, todo, children }) => {
	const { _id, content, isEditable, isComplete } = todo;

	// console.log( `${id} = ${editSection}`)

	return (
		<div>
			<div className="todo-item">
				{isEditable && children}
				<div className="todo-label" style={{display:'flex', textAlign:'start', wordBreak:'break-all'}}>
					<input type="checkbox" name="" id={_id}   onClick={(event) => handleComplete(event, _id)} />
					<label htmlFor={_id} style={{ textDecoration: isComplete ? "line-through" : "none" }}>
						{content}
					</label>
				</div>
				<div className="todo-buttons">
					<button onClick={() => handleItemEdit(_id)}>
						<img src='/icons/edit.png' alt="edit" />
					</button>
					<button onClick={() => handleDeleteItem(_id)}>
						<img src="/icons/delete.png" alt="delete" />
					</button>
				</div>
				{/* {error.editTodo && children[1]} */}
				{/* {error && <p className="error-message error-message-edit"> Please enter some content </p>} */}
			</div>
		</div>
	);
};
