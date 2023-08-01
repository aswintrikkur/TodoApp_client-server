import React, { useEffect, useState } from "react";
import "./Todo.css";
import { v4 as uuid } from "uuid";
import { TodoItem } from "./TodoItem/TodoItem";

export const Todo = () => {
	//----------State Declarations----------------
	const [todo, setTodo] = useState([]);
	const [tempContent, setTempContent] = useState("");
	const [tempEdit, setTempEdit] = useState("");
	const [editSection, setEditSection] = useState(false);
	const [error, setError] = useState({
		addTodo: false,
		editTodo: false,
	});

	useEffect(() => {
		console.log(todo);
	}, [todo]);

	//----------Functions Definitions----------------

	//addTodo-input handle
	const inputHandleOnChange = (event) => {
		setTempContent(event.target.value);
	};

	// handle 'ADD TODO' button
	const handleInputOnAdd = () => {
		if (tempContent === "") {
			setError((prev) => ({ ...prev, addTodo: "please enter some content" }));
			return;
		}
		setError((prev) => ({ ...prev, addTodo: false }));
		setTodo((prev) => {
			const newTodo = [
				{
					id: uuid().slice(0, 8),
					content: tempContent,
				},
				...prev,
			];
			return newTodo;
		});
		setTempContent("");
	};

	// 'Enter' button handle
	const handleKeyDown = (event) => {
		const { key } = event;
		if (key === "Enter") {
			handleInputOnAdd();
		}
	};

	// Handle Todo-Item Delete
	const deleteCurrentItem = () => {};

	//Handle Todo-Item Edit
	const handleItemEdit = () => {
		setEditSection(true);
	};

	//input handling of Edit
	const inputHandleOnChangeOfEdit = () => {};

	//Handle 'Save' on Todo-Items
	const handleSaveValue = () => {};

	//Handle 'Cancel' on Todo-Items
	const handleCancelButton = () => {};

	return (
		<div>
			<div className="todo-container">
				<h2>Todo List</h2>

				<div className="input-container">
					<input
						type="text"
						name="addTodo"
						value={tempContent}
						id="newTodo"
						placeholder="New Todo"
						onChange={inputHandleOnChange}
						onKeyDown={handleKeyDown}
					/>
					<button type="submit" onClick={handleInputOnAdd}>
						ADD TODO
					</button>
					{error.addTodo && <p className="error-message"> {error.addTodo} </p>}
				</div>

				<div className="todo-list">
					{todo.map((data) => {
						const { id } = data;
						// console.log(id);
						return (
							<TodoItem
								todoContent={data.content}
								deleteCurrentItem={deleteCurrentItem}
								handleItemEdit={handleItemEdit}
								editSection={editSection}
								id={data.id}
								key={data.id}
							>
								<div className="edit-todo" /* passing as children */>
									<input
										type="text"
										name=""
										id="edit-item"
										value={tempEdit[data.id]}
										onChange={(event) => {
											inputHandleOnChangeOfEdit(id, event);
										}}
										placeholder="Editing current todo item"
									/>
									<button
										type="save"
										className="save"
										onClick={() => {
											handleSaveValue(id);
										}}
									>
										save
									</button>

									<button
										type="reset"
										className="cancel"
										onClick={() => {
											handleCancelButton(data.id);
										}}
									>
										cancel
									</button>
								</div>
								{error.editTodo && <p className="error-message error-message-edit"> Please enter some content </p>}
							</TodoItem>
						);
					})}
				</div>
			</div>
		</div>
	);
};
