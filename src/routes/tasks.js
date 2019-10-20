import { Router } from 'express';

const router = Router();

import { getTask, createTask, getOneTask, updateTask, deleteTask } from '../controllers/tasks.controller';


router.get('/', getTask);

router.get('/:id', getOneTask);

router.post('/',createTask);

router.put('/:id', updateTask);

router.delete('/:id', deleteTask);

// router.get('/:id', getOneTask);

// router.get('/project/:id', getTaskByProject);

// router.delete('/:id', deleteTask);

// router.put('/:id', updateTask);

export default router;