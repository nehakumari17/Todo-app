const router = require("express").Router();
const mongoose = require("mongoose")
const User = require("../models/userModel");
const Todo = require("../models/todoModel");

// router.get("/getTask/:id", async (req, res) => {
//     try {
//         const todos = await Todo.find({ user: req.params.id }).sort({ createdAt: -1});
//         if (!todos) {
//             return res.status(404).json({ message: "No todos found for the user ID" });
//         }
//         res.status(200).json({ todos });
//     } catch (error) {
//         console.error("Error fetching todos:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// });

router.get("/getTask/:id", async (req, res) => {
    try {
        // Validate ObjectId
        if (!req.params.id || !mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        // Fetch todos
        const todos = await Todo.find({ user: req.params.id }).sort({ createdAt: -1 });

        // Check if todos exist
        if (!todos || todos.length === 0) {
            return res.status(404).json({ message: "No todos found for the user ID" });
        }

        // Send todos in response
        res.status(200).json({ todos });
    } catch (error) {
        console.error("Error fetching todos:", error);
        res.status(500).json({ message: "Server error" });
    }
});



router.post("/addTask", async (req, res) => {
    try {
        const { text, id } = req.body;
        const existingUser = await User.findById(id);
        
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const todo = new Todo({ text, user: existingUser });
        await todo.save();
        
        existingUser.todos.push(todo._id);
        await existingUser.save();

        res.status(200).json({ todo });
    } catch (error) {
        console.error("Error adding task:", error);
        res.status(500).json({ message: "Server error" });
    }
});

router.put("/updateTask/:id", async (req, res) => {
    try {
        const { text } = req.body;
        const { id } = req.params;
        const updatedTodo = await Todo.findByIdAndUpdate(id, { text });
        if (!updatedTodo) {
            return res.status(404).json({ message: "Task not found" });
        }
        
        // No need to call `save()` as `findByIdAndUpdate` already updates and saves the document
        res.status(200).json({ message: "Task updated" });
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ message: "Server error" });
    }
});


router.delete("/deleteTask/:id", async (req, res) => {
    try {
        const existingUser = await Todo.findByIdAndUpdate(req.params.id);
        
        if (existingUser) {
            await Todo.findByIdAndDelete(req.params.id);
            
            res.status(200).json({ message: "Task deleted" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;