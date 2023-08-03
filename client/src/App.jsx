import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ErrorPage } from "./components/ErrorPage";
import { LogIn } from "./components/logIn/LogIn";
import { Todo } from "./components/Todo/Todo";
import { ProtectedRoute } from "./ProtectedRoute";

function App() {
	return (
		<div>
			<Routes>
				<Route path="/" element={<LogIn/>} />
					<Route element={<ProtectedRoute />} >
						<Route path="/loggedIn" element={<Todo />} />
					</Route>	
				<Route path="*" element={<ErrorPage />} />
			</Routes>
			{/* <Todo /> */}
		</div>
	);
}

export default App;
