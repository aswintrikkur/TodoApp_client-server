import React, { useEffect, useState } from "react";
import "./Todo.css";
import { TodoItem } from "./TodoItem/TodoItem";
import axios from "axios";
import { API_URL, postTodoListAPI } from "../../api";

export const Todo = () => {
	//----------State Declarations----------------
	const [todo, setTodo] = useState([]);
	const [tempContent, setTempContent] = useState("");
	const [tempEdit, setTempEdit] = useState([]);
	const [error, setError] = useState({
		addTodo: false,
	});

	// for debugging 
	useEffect(() => {
		// console.log("tempEdit==", tempEdit);
		// console.log("todo==", todo);
	}, [todo, tempEdit]);

	//--------todo API data fetching----------
	const fetchTodoListAPI = async () => {
		try {
			const response = await axios(API_URL);
			setTodo(response.data);
			console.log("data fetched===", response.data);
			setTempEdit(response.data.map((data) => data.content));
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchTodoListAPI();
	}, []);

	//----------Functions Definitions----------------

	// onChange input handle of addTodo
	const inputHandleOnChange = (event) => {
		setTempContent(event.target.value);
	};

	// handle 'ADD TODO' button
	const handleInputOnAdd = async (index) => {
		if (tempContent === "") {
			setError((prev) => ({ ...prev, addTodo: "please enter a task" }));
			return;
		}
		try {
			setError((prev) => ({ ...prev, addTodo: false }));
			const response = await postTodoListAPI("POST", {
				content: tempContent,
				isComplete: false,
				isEditable: false,
				errorMessage: false,
			});
			setTodo(response.data);
			setTempEdit(response.data.map((data) => data.content));
		} catch (error) {
			// error is handled in postTodoAPI function itself
		}
		setTempContent("");
	};

	// 'Enter' button handle
	const handleKeyDown = (event, _id, index) => {
		const { key } = event;
		const { name } = event.target;

		if (key === "Enter" && name === "addTodo") {
			handleInputOnAdd();
		}
		if (key === "Enter" && name === "editTodo") {
			handleSaveValue(_id, index);
		}
	};

	// Handle Todo-Item Delete
	const handleDeleteItem = async (_id) => {
		try {
			const response = await postTodoListAPI("DELETE", {
				_id,
			});
			setTodo(response.data);
			const updatedContent = response.data.map((data) => data.content);
			setTempEdit(updatedContent);
		} catch (error) {}
	};

	//Handle Todo-Item Edit
	const handleItemEdit = async (_id) => {	//TODO:  fix multiple edit-save bug
		const editTodo = todo.map((data) => {
			data._id === _id && (data.isEditable = !data.isEditable);
			return data;
		});
		setTodo(editTodo);
	};

	// onChange input handle of editTodo
	const inputHandleOnChangeOfEdit = (event, _id, index) => {
		const updatedTempEdit = [...tempEdit];
		updatedTempEdit[index] = event.target.value;
		setTempEdit(updatedTempEdit);
	};

	//Handle 'Save' on Todo-Items
	const handleSaveValue = async (_id, index) => {
		try {
			const response = await postTodoListAPI("PUT", {
				_id,
				content: tempEdit[index],
				isComplete: todo.find((data) => data._id === _id).isComplete,
			});
			setTodo(response.data);
		} catch (error) {}
	};

	//Handle 'Cancel' on Todo-Items
	const handleCancelButton = (_id, index) => {
		const updatedTodo = todo.map((data) => {
			data._id === _id && ((tempEdit[index] = data.content), (data.isEditable = false), (data.errorMessage = false));
			return data;
		});
		setTodo(updatedTodo);
	};

	// Handle task complete
	const handleComplete = (event, _id) => { //! line-through on completed task changes when reloading. 
		const todoUpdated = todo.map((data) => {
			if (data._id === _id) {
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
						autoComplete="off"
						onChange={inputHandleOnChange}
						onKeyDown={handleKeyDown}
					/>
					<button type="submit" id="submit" onClick={handleInputOnAdd}></button>
					{error.addTodo && <p className="error-message"> {error.addTodo} </p>}
				</div>

				<div className="todo-list">
					{todo.map((data, index) => {
						const { _id } = data;

						return (
							<TodoItem
								handleDeleteItem={handleDeleteItem}
								handleItemEdit={handleItemEdit}
								handleComplete={handleComplete}
								todo={data}
								key={data._id}
							>
								<div className="edit-todo" /* passing as children */>
									<input
										type="text"
										name="editTodo"
										id="edit-item"
										autoComplete="off"
										value={tempEdit[index]}
										onChange={(event) => {
											inputHandleOnChangeOfEdit(event, _id, index);
										}}
										onKeyDown={(event) => handleKeyDown(event, _id, index)}
										placeholder="Editing current todo item"
									/>
									<button
										type="save"
										className="save"
										onClick={() => {
											handleSaveValue(_id, index);
										}}
									>
										save
									</button>

									<button
										type="reset"
										className="cancel"
										onClick={() => {
											handleCancelButton(_id, index);
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
