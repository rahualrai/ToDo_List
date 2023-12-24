# ToDo_List
Web-based To-Do List application for managing daily tasks, built with Node.js, Express, and MongoDB.

## Features
- Add, edit, and delete tasks
- Mark tasks as complete
- Filter tasks based on completion status

## Tech Stack
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- Database: MongoDB 

## Project Structure
```bash
.
└── ToDo_List/
    ├── backend/
    │   ├── .env                # Environment variables
    │   ├── models/             # Database models
    │   │   └── task.js         # Task model
    │   ├── node_modules/       # Node modules
    │   ├── routes/             # API routes
    │   │   └── taskRoutes.js   # Routes for task operations
    │   ├── package-lock.json   # NPM lock file
    │   ├── package.json        # NPM package file
    │   └── server.js           # Entry point for backend
    ├── .git/                   # Git folder
    ├── .gitignore              # Git ignore file
    ├── index.html              # Entry point for frontend
    ├── script.js               # Frontend JavaScript
    └── style.css               # Frontend CSS

```

## Setup and Installation
1. Clone the repository:

```bash
git clone [repository-link]
```

2. Navigate to the backend folder and install dependencies:

```bash
cd ToDo_List/backend
npm install
```

3. Create a .env file in the backend directory with the necessary environment variables (e.g., database connection string).

4. Start the server:

```bash
node server.js
```

5. Open index.html in a web browser to access the frontend.

