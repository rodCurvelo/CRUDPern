import React, { Fragment, useState } from "react";

const InputTodo = () => {

    // hooks useState setting default value of an empty string to const 
    // description is the state
    // setDescription is when state is changed
    // ("") -> is the default value
    const [description, setDescription] = useState("");

    // Submitting data
    const onSubmitForm = async(e) => {
        // preventing to refresh
        e.preventDefault();
        try {
            const body = { description };
            // fetch request data
            // same procedures from postman
            // await for guess what? wait :)
            const response = await fetch("http://localhost:5000/todos", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            // Once onSubmit form is completed, refresh to the previous screen / -> home
            window.location = "/";
        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <Fragment>
            <h1 className="text-center mt-5">Pern Todo List</h1>
            {/* onSubmit constant on form */}
            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                {/* d-flex for elements being together & margin top 5 */}
                {/* I set the const in value. It shows the default value of state, which is "" empty string */}
                <input type="text" className="form-control" value={description} onChange={e => 
                    setDescription(e.target.value)}/>
                    {/* onChange gets the new input value and set on setDescription, changing the default value "" to the new value inserted on input field */}
                <button className="btn btn-success">Add</button>
            </form>
        </Fragment>
    )
}

export default InputTodo;