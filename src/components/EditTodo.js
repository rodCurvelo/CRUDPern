import React, { Fragment, useState } from "react";


// prop todo "(todo)"
const EditTodo = ( {todo} ) => {

    const [description, setDescription] = useState(todo.description);

    // console.log(todo);

    // edit description function
    // "e" so function doesn't refresh yet until code process is complete
    const updateDescription = async (e) => {
        e.preventDefault();
        try {
            const body = {description};
            // response to the rest api
            const response = await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
                // making a put request
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
        // console.log(response);
        // Window location shows up the message edited
        window.location = "/";

        } catch (err) {
            console.error(err.message);
        }
    } 

    return (
        <Fragment>
        <div className="container">
            <button type="button" className="btn btn-warning" data-toggle="modal" data-target={`#id${todo.todo_id}`}>
                Edit
            </button>

            {/* id={`id${todo.todo_id}`} modal shows up the id selected */}
            <div className="modal" id={`id${todo.todo_id}`} onClick={() => setDescription(todo.description)}>
                <div className="modal-dialog">
                    <div className="modal-content">
                    
                        <div className="modal-header">
                            <h4 className="modal-title">Edit Todo</h4>
                            {/* onClick={() => setDescription(todo.description)} message goes to the original form */}
                            <button type="button" className="close" data-dismiss="modal" onClick={() => setDescription(todo.description)}>&times;</button>
                        </div>
                        
                        <div className="modal-body">
                            {/* form-control for handling data */}
                            {/* value for updating description  */}
                            <input type="text" className="form-control" value={description} onChange={e => setDescription(e.target.value)} />
                        </div>
                        
                        <div className="modal-footer">
                            <button type="button" className="btn btn-warning" data-dismiss="modal" onClick = {e => updateDescription(e)}>Edit</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => setDescription(todo.description)}>Close</button>
                        </div>
                        
                    </div>
                </div>
            </div>   
        </div>
    </Fragment>
    );
}

export default EditTodo;