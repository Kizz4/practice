---
layout: default
---
# Task Tracker
This project is part of the [Frontend Projects Roadmap](https://roadmap.sh/frontend/projects) for intermediate developers. 
You can find the specific project details [here](https://roadmap.sh/projects/task-tracker-js).

The goal of this project is to create a task tracker that allows users to add new tasks, mark them as complete, or delete them. Completed tasks are moved to the end of the list and displayed with a strikethrough. Users can also unmark tasks to return them to the pending list.

---

## 📚 Table of Contents

- [Key Requirements](#key-requirements)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Project Structure](#project-structure)
- [Preview](#preview)
- [Prerequisites](#prerequisites)

---

## 🔑 Key Requirements

- **Add Tasks:** Users can add new tasks to the list.
- **Mark as Complete:** Tasks can be marked as complete, moving them to the end of the list with a strikethrough.
- **Unmark Tasks:** Completed tasks can be unmarked, returning them to the pending list.
- **Delete Tasks:** Users can delete tasks from the list.
- **Dynamic Rendering:** The task list updates dynamically based on user interactions.

---

## 🛠️ Technologies Used

- TypeScript
- Vite
- HTML5
- CSS3

---

## 🚀 Features

- **Task Management:** Add, complete, unmark, and delete tasks with ease.
- **Transition:** Use of some transition for smoother UX
- **Dynamic UI:** The interface updates in real-time as users interact with the task list.
- **Keyboard Navigation:** The application support Keyboard Navigation.
- **Responsive Design:** The application is responsive and works well on various screen sizes.

---

## 📁 Project Structure
<!-- START PROJECT STRUCTURE -->
```
task_tracker
	public
		vite.config.ts
		package.json
		index.html
		package-lock.json
		src
			img
				delete.png
				delete_red.png
			taskActions.ts
			main.ts
			vite-env.d.ts
			factories
				TaskFactory.ts
				TaskListFactory.ts
			style.css
			models
				TaskList.ts
				Task.ts
		tsconfig.json
	README.md

```
<!-- END PROJECT STRUCTURE -->

---

## 🔍 Preview
<!-- START LINK TO PREVIEW -->
[Here to see the project on GitHub Page](https://kizz4.github.io/practice/frontend_practice/intermediate_projects/task_tracker/public/dist)
<!-- END LINK TO PREVIEW -->

### OR 

To preview the project locally [see Prerequisites below](#prerequisites), and run the following command from the root of the project:

```bash
npm start
```

---

## ⚙️ Prerequisites

- [Node.js and npm](https://nodejs.org/)
- Install dependencies:
  ```bash
  npm install
  ```