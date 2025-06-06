---
layout: default
---
# GitHub Random Repository Finder

This project is part of the [Frontend Projects Roadmap](https://roadmap.sh/frontend/projects) for intermediate developers.  
Project details can be found [here](https://roadmap.sh/projects/github-random-repo).

The objective of this project is to build a GitHub random repository finder using the GitHub API.  
Users can select a programming language from a dropdown menu, and the app will fetch and display a random repository matching the selected language.  
The displayed information includes the repository name, description, number of stars, forks, and open issues.  
Users can fetch another random repository with a button click.

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

- **Language Selection:** Allow users to select a programming language from a dropdown menu.
- **Random Repository Fetching:** Use the GitHub Repository Search API to fetch and display a random repository matching the selected language.
- **Repository Details Display:** Show repository name, description, stars, forks, and open issues.
- **Refresh Functionality:** Provide a button to fetch and display another random repository.
- **UI State Management:** Handle loading, empty, and error states effectively.

---

## 🛠️ Technologies Used

- TypeScript
- Vite
- HTML5
- CSS3

---

## 🚀 Features

- **Asynchronous API Integration:** Fetch data from the GitHub API using asynchronous requests.
- **Dynamic UI Updates:** Update the UI dynamically based on user interactions and API responses.
- **Responsive Design:** Ensure the application is responsive and works well on various screen sizes.
- **Status Handling:** Display appropriate messages for waiting state, loading state, and error state.

---

## 📁 Project Structure
<!-- START PROJECT STRUCTURE -->
```
github_random_repository
	public
		package.json
		index.html
		package-lock.json
		vite.config.js
		src
			github_api_functions.ts
			components
				GitHubRepoInfo.ts
				PromiseFeedback.css
				PromiseFeedback.ts
				GitHubRepoInfo.css
			img
				language_icon.png
				star_icon.png
				fork_icon.png
				issue_icon.png
				GitHub_icon.png
			main.ts
			vite-env.d.ts
			types
				images.d.ts
			style.css
		tsconfig.json
	README.md

```
<!-- END PROJECT STRUCTURE -->

---

## 🔍 Preview
<!-- START LINK TO PREVIEW -->
[View on GitHub Pages](https://yourusername.github.io/github_random_repository/public)
<!-- END LINK TO PREVIEW -->

---

## ⚙️ Prerequisites

- [Node.js and npm](https://nodejs.org/)
- Install dependencies:
  ```bash
  npm install
  ```
- Start the project:
  ```bash
  npm start
  ```