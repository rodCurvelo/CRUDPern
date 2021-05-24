import React, {Fragment, useEffect, useState} from "react";

// Importing from EditTodo component
import EditTodo from "./EditTodo";

const ListTodos = () => {

    // const gets default value of an empty array
    const [todos, setTodos] = useState([]);
    // todos inherit info from setTodos. Check the console.log(todos)

    // delete todo function
    const deleteTodo = async id => {
        try {
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`,{
                method: "DELETE"
            });

            // refreshing screen after deleting (spit out all todos with the exception of the "id" (from deleteTodo) deleted)
            // filter function refreshes after a condition. In this case "todo => todo.todo_id !== id"
            setTodos(todos.filter(todo => todo.todo_id !== id));
        } catch (err) {
            console.error(err.message)
        }
    }


    const getTodos = async() => {
        try {

            //another fetch request
            const response = await fetch("http://localhost:5000/todos")
            // parsing json data first
            const jsonData = await response.json()

            // empty array gets info data from backend converted into json data
            setTodos(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getTodos();
        // [] inserted, so fetch request shows up once and not a lot of times
    }, []);
    
    // console.log(todos); -> I can see the data on console
    return (
        <Fragment>
            {" "}
        <table className="table mt-5 text-center">
            <thead>
            <tr>
                <th>Description</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>
                {/* <tr>
                <td>John</td>
                <td>Doe</td>
                <td>john@example.com</td>
            </tr> */}

            {/* Mapping  */}
            {todos.map(todo => (
                // primary key from the database.sql -> backend db file
                <tr key={todo.todo_id}>
                    <td>{todo.description}</td>
                    <td>
                        {/* from component EditTodo.js */}
                        {/* Adding a prop to EditTodo component */}
                        <EditTodo todo = {todo}/>
                    </td>
                    <td>
                        <button className="btn btn-danger" 
                        // deleteToDo is a a function to specify what to delete. In this case, the id from the database file
                        onClick={() => deleteTodo(todo.todo_id)}>Delete</button>
                    </td>
                </tr>
            ))}
             </tbody>
        </table>
        </Fragment>
    );
}

export default ListTodos;