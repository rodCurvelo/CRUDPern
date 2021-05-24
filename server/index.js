const express = require("express");
//variable app to run express
const app = express();
//importing cors | specify server location
const cors = require("cors");
// importing db info conexion from db.js file
const pool = require("./db");

//middleware function (HTTP request and respond | routes)
app.use(cors());
// request data in json format
app.use(express.json()); //req.body (request from the client side | form)


//ROUTES - Restful API//

//CREATE a todo | post because adds data | path | req from client 
// & answer to the client side (res) | asyng has await to avoid req and response delays 
app.post("/todos", async(req,res) => {
    // try catch statement for checking errors and showing up error messages
    try {
        // getting data from the client side to determine what to do 
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *", 
            [description]
        ); // description will be the value of this value $1

      res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});


//GET ALL todos
app.get("/todos", async(req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch(err) {
        console.error(err.message);
    }
})

//GET A todo
app.get("/todos/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id])

        res.json(todo.rows[0]);
    } catch(err) {
        console.error(err.message);
    }
})

//UPDATE a todo (EDIT)
app.put("/todos/:id", async(req,res) => {

    try {
        const {id} = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2",
            // $1 and $2 are variables for holding values from the variables I had created (description and id)
            [description, id]
        );

      res.json("Todo was updated!")  
    } catch {
        console.error(err.message)
    }
})

//DELETE a todo
app.delete("/todos/:id", async(req,res) => {
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json("Todo was deleted!")
    } catch (err) {
        console.log(err.message);
    }
})


//creating the server using callback
app.listen(5000, () =>{
    console.log("server has started on port 5000");
});
