const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


// ...  connect to mongodb
mongoose.connect("mongodb://127.0.0.1:27017/todo-app",
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const todoSchema = new mongoose.Schema({
  text: String,
  completed: Boolean,
});

const Todo = mongoose.model('Todo', todoSchema);

app.get('/api/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// ... (newTodo)

app.post('/api/todos', async (req, res) => {
  const { text } = req.body;
  const newTodo = new Todo({ text, completed: false });
  await newTodo.save();
  res.json(newTodo);
});

// ... (updatedTodo)

app.put('/api/todos/:id', async (req, res) => {
  const { id } = req.params;
  const updatedTodo = await Todo.findByIdAndUpdate(id, { completed: true }, { new: true });
  res.json(updatedTodo);
});

// ... (delete)

app.delete('/api/todos/:id', async (req, res) => {
  const { id } = req.params;
  await Todo.findByIdAndDelete(id);
  res.json({ message: 'Todo deleted successfully' });
});




app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
