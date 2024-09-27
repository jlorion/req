
import { getTodo, updateTodo, removeTodo, newTodo } from "../controller/TodosController.mjs";
import express from 'express'

const router = express.Router();

router.get('/todos', getTodo);
router.post('/todos', newTodo);
router.post('/todos/update', updateTodo);
router.delete('/todos', removeTodo);

export default router;
