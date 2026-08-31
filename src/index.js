import "./styles.css";
import { createTodo } from "./todo.js";
import { createProject } from "./project.js";

const work = createProject("Work");

const todo1 = createTodo(
	"Study JavaScript",
	"Work on the Todo List project",
	"2026-09-05",
	"high"
);

const todo2 = createTodo(
	"Study JavaScript",
	"Review factory functions",
	"2026-09-06",
	"medium"
)

work.addTodo(todo1);
work.addTodo(todo2);

console.log("Before removal:", work.todos);

work.removeTodo(todo1.id);

console.log("After removal:", work.todos);