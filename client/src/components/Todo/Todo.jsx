import React, { useEffect, useState } from "react";
import "./Todo.css";
import { v4 as uuid } from "uuid";
import { TodoItem } from "./TodoItem/TodoItem";

export const Todo = () => {
	//----------State Declarations----------------
	const [todo, setTodo] = useState([]);
	const [tempContent, setTempContent] = useState("");
	const [tempEdit, setTempEdit] = useState([]);
	const [error, setError] = useState({
		addTodo: false,
	});

	useEffect(() => {
		console.log("tempEdit==", tempEdit);
		console.log("todo==", todo);
	}, [todo, tempEdit]);

	//----------Functions Definitions----------------

	// onChange input handle of addTodo
	const inputHandleOnChange = (event) => {
		setTempContent(event.target.value);
	};

	// handle 'ADD TODO' button
	const handleInputOnAdd = () => {
		if (tempContent === "") {
			setError((prev) => ({ ...prev, addTodo: "please enter a task" }));
			return;
		}
		setError((prev) => ({ ...prev, addTodo: false }));
		setTodo((prev) => {
			const newTodo = [
				{
					id: uuid().slice(0, 8),
					content: tempContent,
					isComplete: false,
					isEditable: false,
					errorMessage: false,
				},
				...prev,
			];
			setTempEdit((prev) => [newTodo[0].content, ...prev]);
			return newTodo;
		});
		setTempContent("");
	};

	// 'Enter' button handle
	const handleKeyDown = (event, id, index) => {
		const { key } = event;
		const { name } = event.target;

		if (key === "Enter" && name === "addTodo") {
			handleInputOnAdd();
		}
		if (key === "Enter" && name === "editTodo") {
			handleSaveValue(id, index);
		}
	};

	// Handle Todo-Item Delete
	const handleDeleteItem = (id) => {
		const updatedTodo = todo.filter((data) => data.id !== id);
		setTodo(updatedTodo);
		const updatedContent = updatedTodo.map((data) => data.content);
		setTempEdit(updatedContent);
	};

	//Handle Todo-Item Edit
	const handleItemEdit = (id) => {
		const editTodo = todo.map((data) => {
			data.id === id && (data.isEditable = !data.isEditable);
			return data;
		});
		setTodo(editTodo);
	};

	// onChange input handle of editTodo
	const inputHandleOnChangeOfEdit = (event, id, index) => {
		const updatedTempEdit = [...tempEdit];
		updatedTempEdit[index] = event.target.value;
		setTempEdit(updatedTempEdit);
	};

	//Handle 'Save' on Todo-Items
	const handleSaveValue = (id, index) => {
		const updatedTodo = todo.map((data) => {
			if (data.id === id) {
				if (tempEdit[index] === "") {
					data.errorMessage = "task should not be empty";
				} else {
					data.errorMessage = false;
					data.content = tempEdit[index];
					data.isEditable = false;
				}
			}

			return data;
		});
		setTodo(updatedTodo);
	};

	//Handle 'Cancel' on Todo-Items
	const handleCancelButton = (id, index) => {
		const updatedTodo = todo.map((data) => {
			data.id === id && ((tempEdit[index] = data.content), (data.isEditable = false), (data.errorMessage = false));
			return data;
		});
		setTodo(updatedTodo);
	};

	// Handle task complete
	const handleComplete = (event, id) => {
		const todoUpdated = todo.map((data) => {
			if (data.id === id) {
				event.target.checked ? (data.isComplete = true) : (data.isComplete = false);
			}
			return data;
		});
		setTodo(todoUpdated);
	};

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
					{todo.map((data, index) => {
						const { id } = data;

						return (
							<TodoItem
								handleDeleteItem={handleDeleteItem}
								handleItemEdit={handleItemEdit}
								handleComplete={handleComplete}
								todo={data}
								key={data.id}
							>
								<div className="edit-todo" /* passing as children */>
									<input
										type="text"
										name="editTodo"
										id="edit-item"
										value={tempEdit[index]}
										onChange={(event) => {
											inputHandleOnChangeOfEdit(event, id, index);
										}}
										onKeyDown={(event) => handleKeyDown(event, id, index)}
										placeholder="Editing current todo item"
									/>
									<button
										type="save"
										className="save"
										onClick={() => {
											handleSaveValue(id, index);
										}}
									>
										save
									</button>

									<button
										type="reset"
										className="cancel"
										onClick={() => {
											handleCancelButton(id, index);
										}}
									>
										cancel
									</button>
								</div>
								{data.errorMessage && <p className="error-message error-message-edit"> {data.errorMessage} </p>}
							</TodoItem>
						);
					})}
				</div>
			</div>
		</div>
	);
};
