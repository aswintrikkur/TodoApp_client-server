import React, { useEffect, useState } from "react";
import "./Todo.css";
import { v4 as uuid } from "uuid";
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

	useEffect(() => {
		console.log("tempEdit==", tempEdit);
		console.log("todo==", todo);
	}, [todo, tempEdit]);

	//--------todo API data fetching----------
	const fetchTodoListAPI = async () => {
		try {
			const response = await axios(API_URL);
			setTodo(response.data);
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
			console.log(error);
			console.log(`ERROR === ${error.response.data.message}`);
		}
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
	const handleDeleteItem = async (id) => {
		try {
			const response = await postTodoListAPI("DELETE", {
				id,
			});
			setTodo(response.data);
			const updatedContent = response.data.map((data) => data.content);
			setTempEdit(updatedContent);
		} catch (error) {
			console.log(error);
			console.log(`ERROR === ${error.response.data.message}`);
		}
	};

	//Handle Todo-Item Edit
	const handleItemEdit = async (id) => {
		/*fix multiple edit-save bug*/
		// try {
		// 	const response= await postTodoListAPI('PUT',{
		// 		id,
		// 		isEditable:true
		// 	})
		// 	setTodo(response.data);
		// } catch (error) {
		// 	console.log(error);
		// }

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
	const handleSaveValue = async (id, index) => {
		try {
			const response = await postTodoListAPI("PUT", {
				id,
				content: tempEdit[index],
			});
			setTodo(response.data);
		} catch (error) {
			console.log(error);
			console.log(`ERROR === ${error.response.data.message}`)
		}
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
