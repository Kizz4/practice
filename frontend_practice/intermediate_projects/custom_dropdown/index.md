---
layout: default
---
# Custom Dropdown Component
This project is part of the [Frontend Projects Roadmap](https://roadmap.sh/frontend/projects) for intermediate developers. And the [link](https://roadmap.sh/projects/custom-dropdown) of the project himself 

This project implements a fully accessible, keyboard-navigable custom dropdown menu component using TypeScript and Vite. It showcases best practices in ARIA roles, focus management, and clean CSS transitions.

---

## 📚 Key Requirements

- **Toggle Behavior:** Ability to open and close the dropdown menu.
- **Dynamic Button Label:** Updates from the default “Select an Item” to the chosen option.
- **State Indicators** Pseudo-elements display the dropdown’s open/closed state and highlight the selected item.

---

## 🛠️ Technologies Used

- TypeScript
- Vite
- HTML5
- CSS3

---

## 📁 Project Structure
<!-- START PROJECT STRUCTURE -->
```
custom_dropdown
	package.json
	index.html
	package-lock.json
	README.md
	src
		icon_check.png
		custom_dropdown.ts
		main.ts
		vite-env.d.ts
		style.css
	index.md
	tsconfig.json

```
<!-- END PROJECT STRUCTURE -->

---

## ⚙️ Prerequisites

Make sure you have the following installed:

- [Node.js and npm](https://nodejs.org/)

Install dependencies:

```bash
npm install
```

---

## 🔍 Preview

To run the development server locally:

```bash
npm start
```

Then open the URL shown in the console (typically http://localhost:5173).

---

## 🚀 Features

- **Accessible Dropdown:** Screen-reader-friendly with ARIA roles and attributes.
- **Click & Keyboard Control:** Operate via mouse or keyboard (Enter, Space, Arrow keys, Escape).
- **Focus Management:** Focus moves to opened menu and returns to the toggle on close.
- **Outside Click:** Clicking outside closes the dropdown.
- **Live Announcements:** Status updates and selection changes announced through a hidden live region.
- **Smooth Transitions:** CSS-based open/close animations using `transform` and `opacity`.

---
