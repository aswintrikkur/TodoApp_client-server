import React, { useEffect, useState } from "react";
import "./Todo.css";
import { TodoItem } from "./TodoItem/TodoItem";

export const Todo = () => {
	const [todoContent, setTodoContent] = useState([]);
	// const [newindex,setIndex]=useState([]);      //to solve issue with same task name
	const [tempContent, setTempContent] = useState("");
	const [tempContent2, setTempContent2] = useState("");
	const [editSection, setEditSection] = useState([]);
	const [tempEdit, setTempEdit] = useState([]);
	const [error, setError] = useState({
		addTodo: false,
		editTodo: false,
	});

	// useEffect(() => {
	//     const newArray = Array(10).fill(false);
	//     setEditSection(newArray);
	// }, [])
	// console.log(editSection);

	const inputHandleOnChange = (event) => {
		setTempContent(event.target.value);
	};

	// For todo-Item adding
	const handleInputOnAdd = () => {
		if (tempContent === "") {
			setError((prev) => ({ ...prev, addTodo: true }));
			return;
		}
		setError((prev) => ({ ...prev, addTodo: false }));
		setTodoContent((prev) => [...prev, tempContent]);
		setTempContent("");
		setEditSection([...editSection, false]);
	};

	useEffect(() => {
		setTempEdit(todoContent);
	}, [todoContent]);
	console.log("tempEdit:", tempEdit);

	// For todo-Item deleting
	const deleteCurrentItem = (index) => {
		//trail 1
		/*  todoContent.splice(index, 1);
            const filteredContent = todoContent.filter((data) => {
                return data;
            })
            setTodoContent(filteredContent);    */

		//trail 2
		const newTodoContent = [...todoContent];
		newTodoContent.splice(index, 1);
		setTodoContent(newTodoContent);

		editSection.splice(index, 1);
		setEditSection([...editSection]);
	};

	// For todo-Item editing - step1
	const inputHandleOnChange2 = (index, event) => {
		// setTempContent2(event.target.value);
		// console.log(index)

		const editedValue = [...tempEdit];
		editedValue[index] = event.target.value;
		setTempEdit(editedValue);
	};
	// For todo-Item editing - step2
	const handleItemEdit = (index) => {
		//trail ChatGPT (success)
		setEditSection((prev) => {
			const newEditSection = [...prev]; // Create a copy of the state array
			newEditSection[index] = !newEditSection[index]; // Update the value at the given index
			return newEditSection;
		});

		// //trail 1 (failed)
		/*  setEditSection(prev => {
            prev.splice(index, 1, (prev[index] =!prev[index]))
            prev.splice(index, 1, (editSection[index] === false ? true : false)) //not working
            // console.log('editSection', prev);
            return prev;
        });     
        // setEditSection(prev=>(prev.filter(data=>data)));  //not rendering without 2nd setEditSection()
        */

		//trail 2 (failed)
		/* const updatedState= editSection.splice(index, 1, (editSection[index] === false ? true : false))
        console.log('editSection: ',editSection);
        console.log('updatedState: ',updatedState);
        setEditSection(prev=>prev);
        const filterData = editSection.map((data) => {
            console.log(data);
            return data
        })
        setEditSection(filterData);     */
	};

	//for cancel handle
	const handleCancelButton = (index) => {
		if (tempEdit[index] === "") {
			setTempEdit(todoContent);
		}
		setEditSection((prev) => {
			const newEditSection = [...prev]; // Create a copy of the state array
			newEditSection[index] = !newEditSection[index]; // Update the value at the given index
			return newEditSection;
		});
		setError((prev) => ({ ...prev, editTodo: false }));
	};

	//for saving edited value
	const handleSaveValue = (index) => {
		if (tempEdit[index] === "") {
			setError((prev) => ({ ...prev, editTodo: true }));
			return;
		}

		const editedValue = [...todoContent];
		editedValue[index] = tempEdit[index];
		setTodoContent(editedValue);

		setError((prev) => ({ ...prev, editTodo: false }));

		setEditSection((prev) => {
			const newEditSection = [...prev]; // Create a copy of the state array
			newEditSection[index] = !newEditSection[index]; // Update the value at the given index
			return newEditSection;
		});
	};
	// console.log('error: ', error);
	// console.log('editSection', editSection);
	console.log("todoContent", todoContent);

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
					/>
					<button type="submit" onClick={handleInputOnAdd}>
						ADD TODO
					</button>
					{error.addTodo && <p className="error-message"> please enter some content </p>}
				</div>
				<div className="todo-list">
					{todoContent.map((data) => {
						const index = todoContent.indexOf(data);

						return (
							<TodoItem
								todoContent={data}
								deleteCurrentItem={() => {
									deleteCurrentItem(index);
								}}
								handleItemEdit={() => {
									handleItemEdit(index);
								}}
								index={index}
								editSection={editSection[index]}
								key={index}
							>
								<div className="edit-todo" /* passing as children */>
									<input
										type="text"
										name=""
										id="edit-item"
										value={tempEdit[index]}
										onChange={(event) => {
											inputHandleOnChange2(index, event);
										}}
										placeholder="Editing current todo item"
									/>
									<button
										type="save"
										className="save"
										onClick={() => {
											handleSaveValue(index);
										}}
									>
										{" "}
										save
									</button>
									<button
										type="reset"
										className="cancel"
										onClick={() => {
											handleCancelButton(index);
										}}
									>
										{" "}
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
