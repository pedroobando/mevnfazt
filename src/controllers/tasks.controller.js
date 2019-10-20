import Task from '../models/Task';

export async function getTask(req, res) {
  const tasks = await Task.find();
  res.json({ data: tasks });
  // res.status(200).send('API Tasks is goes here');
}

export async function createTask(req, res) {
  const task = new Task(req.body)
  await task.save();
  res.json(task);
  // res.status(200).send('API Tasks is goes here');
}

export async function getOneTask(req, res) {
  const { id } = req.params;
  const task = Task.findById(id)
    .then(tarea => {
      res.status(200).json({ data: tarea });
    })
    .catch(error => {
      res.status(500).json({ data: error });
    });
}

export async function updateTask(req, res) {
  const { id } = req.params;
  await Task.findByIdAndUpdate(id, req.body)
    .then(uptask => {
      res.status(202).json({data: 'Task Updated'});
    })
    .catch(error => {
      res.status(500).json({data: 'Error on Update Task'});
    });
}

export async function deleteTask(req, res) {
  const { id } = req.params;
  await Task.findByIdAndRemove(id)
    .then(oneDelete => {
      res.status(200).json({data: 'Task Deleted'});
    })
    .catch(error => {
      res.status(500).json({ data: 'Error on Update Task'});
    });
}