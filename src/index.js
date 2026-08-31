import "./styles.css";
import { createTodo } from "./todo.js";
import { createProject } from "./project.js";

const work = createProject("Work");

const todo = createTodo(
	"Study JavaScript",
	"Work on the Todo List project",
	"2026-09-05",
	"high"
);

work.addTodo(todo);
 console.log(work);