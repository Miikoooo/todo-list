import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

let task = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
  res.render("index", { task: task });
});

app.post('/addtask', (req, res) => {
  const newTask = req.body.newtask;
  if (newTask.trim() !== '') {
    task.push(newTask);
  }
  res.redirect("/");
});

app.post('/delete-task', (req, res) => {
  const taskIndex = Number(req.body.taskIndex);
  if (!isNaN(taskIndex) && taskIndex >= 0 && taskIndex < task.length) {
    task.splice(taskIndex, 1);
  }
  res.redirect('/');
});

app.post('/edit-task', (req, res) => {
  const taskIndex = Number(req.body.taskIndex);
  const newText = req.body.newText;
  if (!isNaN(taskIndex) && taskIndex >= 0 && taskIndex < task.length) {
      if (newText.trim() !== '') {
          task[taskIndex] = newText;
      }
  }
  res.redirect('/');
});



app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
