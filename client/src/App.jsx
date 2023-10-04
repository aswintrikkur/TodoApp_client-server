import { useState } from "react";
import "./App.css";
import { Todo } from "./components/Todo/Todo";

function App() {
	return (
		<div className="app-container">
			<Todo />
		</div>
	);
}

export default App;
