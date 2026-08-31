import "./styles.css";
import { createTodo } from "./todo.js";

const todo = createTodo(
	"Study JavaScript",
	"Work on the Todo List project",
	"2026-09-05",
	"high"
);

console.log(todo.completed);

todo.toggleComplete();

console.log(todo.completed);

todo.toggleComplete();

console.log(todo.completed);