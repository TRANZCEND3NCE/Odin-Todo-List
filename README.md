# Odin Todo List

A responsive Todo List application built with JavaScript as part of [The Odin Project](https://www.theodinproject.com/).

The app allows users to organize todos into separate projects, manage task details and priorities, mark tasks as complete, and persist their data between browser sessions using `localStorage`.

## Features

* Create multiple projects
* Default Inbox project
* Prevent duplicate project names
* Delete projects
* Create todos with:

  * Title
  * Description
  * Due date
  * Priority
* Edit existing todos
* Delete todos
* Mark todos as complete or incomplete
* Expand and collapse todo descriptions
* Low, Medium, and High priority indicators
* Formatted due dates using `date-fns`
* Persistent data using `localStorage`
* Restores Todo and Project methods after loading saved JSON data
* Responsive desktop and mobile layouts

## Built With

* HTML
* CSS
* JavaScript
* Webpack
* npm
* date-fns
* localStorage
* Git
* GitHub

## Project Structure

```text
src/
├── dom.js
├── index.js
├── project.js
├── projectManager.js
├── storage.js
├── styles.css
├── template.html
└── todo.js
```

### `todo.js`

Contains the Todo factory function used to create Todo objects.

Each Todo includes:

* Unique ID
* Title
* Description
* Due date
* Priority
* Completion state
* Methods for toggling completion and updating Todo details

### `project.js`

Contains the Project factory.

Each Project stores its own Todo array and provides methods for:

* Adding todos
* Finding todos by ID
* Removing todos

### `projectManager.js`

Manages the collection of projects and keeps track of the currently selected project.

It handles:

* Creating projects
* Project name validation
* Project selection
* Project lookup
* Project deletion
* Protecting the default Inbox project

### `dom.js`

Handles rendering and browser interaction, including:

* Project rendering
* Todo rendering
* Project selection
* Form handling
* Todo editing
* Todo deletion
* Todo completion
* Expandable Todo details
* Responsive UI interactions

### `storage.js`

Handles saving and restoring application data with `localStorage`.

Because JSON cannot store functions, saved Projects and Todos are reconstructed through their factory functions when the page loads. This restores methods such as:

```js
todo.toggleComplete();
todo.updateDetails();
project.addTodo();
project.removeTodo();
```

## Local Storage

Project and Todo data is stored in the browser using:

```js
localStorage
```

When the application loads:

```text
localStorage
    ↓
JSON.parse()
    ↓
Saved project data
    ↓
createProject()
createTodo()
    ↓
Working Project and Todo objects
```

This allows todos and projects to remain available after refreshing or closing the browser.

## Responsive Design

The application uses CSS Grid, Flexbox, and media queries to support both desktop and smaller screens.

On desktop, the project navigation appears in a sidebar.

On smaller screens, the sidebar moves above the Todo content and Todo cards reorganize into a more compact layout.

## Running the Project Locally

Clone the repository:

```bash
git clone https://github.com/TRANZCEND3NCE/Odin-Todo-List.git
```

Enter the project directory:

```bash
cd Odin-Todo-List
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Webpack will start the development server and open the application in your browser.

## Production Build

To create a production build:

```bash
npm run build
```

Webpack will generate the production files inside the `dist` directory.

The `dist` directory and `node_modules` are intentionally excluded from Git through `.gitignore`.

## What I Learned

This project brought together many JavaScript concepts into a larger application, including:

* Factory functions
* ES modules
* Object methods
* Unique IDs
* Array methods such as `find()`, `findIndex()`, `some()`, and `splice()`
* DOM manipulation
* Event delegation
* `dataset`
* Callbacks
* Application state
* Form handling
* Editing existing data
* JSON serialization
* `localStorage`
* Rehydrating objects after JSON parsing
* npm packages
* Webpack
* CSS Grid
* Flexbox
* Responsive design
* Git workflow

One of the most important parts of the project was learning to separate the application's responsibilities between the data model, project management, storage, DOM rendering, and application startup logic.

## Live Demo

A live demo will be added after deployment.

## Acknowledgments

This project was completed as part of [The Odin Project](https://www.theodinproject.com/) JavaScript curriculum.