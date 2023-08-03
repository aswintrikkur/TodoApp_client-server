import React, { useEffect, useState } from "react";
import "./TodoItem.css";

export const TodoItem = ({ handleDeleteItem, handleItemEdit, handleComplete, todo, children }) => {
	const { id, content, isEditable, isComplete } = todo;

	// console.log( `${id} = ${editSection}`)

	return (
		<div>
			<div className="todo-item">
				{isEditable && children}
				<div className="todo-label">
					<div style={{display:'flex', textAlign:'start', wordBreak:'break-all' }}>
					<input type="checkbox" name=""  id={id} onClick={(event) => handleComplete(event, id)} />
						<label htmlFor={id} style={{ textDecoration: isComplete ? "line-through" : "none" }}>
							{content}
						</label>
					</div>
				</div>
				<div className="todo-buttons">
					<button onClick={() => handleItemEdit(id)}>
						<img src="../src/Images/image 7.png" alt="edit" />
					</button>
					<button onClick={() => handleDeleteItem(id)}>
						<img src="../src/Images/image 9.png" alt="delete" />
					</button>
				</div>
				{/* {error.editTodo && children[1]} */}
				{/* {error && <p className="error-message error-message-edit"> Please enter some content </p>} */}
			</div>
		</div>
	);
};
