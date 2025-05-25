# Flash Cards

This project is part of the [Frontend Projects Roadmap](https://roadmap.sh/frontend/projects) for beginners.  
You can find the specific project details [here](https://roadmap.sh/projects/flash-cards).

The objective of this project is to build an interactive flash card application that allows users to test their knowledge by flipping cards to reveal answers.

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

- **Flash Card Display**: Present a series of flash cards with questions.
- **Flip Interaction**: Allow users to flip a card and reveal the answer.
- **Navigation**: Provide functionality to navigate through different cards.
- **Progress Indicator**: Show the user's progress through the flash cards.

---

## 🛠️ Technologies Used

- HTML5
- CSS3
- TypeScript
- React
- Vite

---

## 🚀 Features

- **Interactive Flash Cards**: Users can flip cards to reveal answers.
- **Sequential Navigation**: Navigate through the flash cards using previous/next buttons.
- **Progress Tracking**: Displays current card and overall progress.
- **Bonus: Colored Progress Bar**: The progress bar changes color as progress increases.
- **Bonus: Smooth Transitions**: Transitions and animations are applied for a polished experience.
- **Bonus: Dynamic Percentage Display**: The percentage text adapts its position when it risks overlapping other UI elements.
- **Bonus: Confetti Celebration**: When reaching the final card, a confetti animation is triggered for a rewarding experience.

---

## 📁 Project Structure
<!-- START PROJECT STRUCTURE -->
```
flash_cards
	public
		vite.config.ts
		eslint.config.js
		tsconfig.app.json
		package.json
		index.html
		package-lock.json
		src
			components
				ProgressBar.css
				FlashCard.css
				ProgressBar.tsx
				FlashCard.tsx
			App.css
			vite-env.d.ts
			index.css
			main.tsx
			App.tsx
			data
				Cards.ts
		tsconfig.json
		tsconfig.node.json
	README.md

```
<!-- END PROJECT STRUCTURE -->

---

## 🔍 Preview
<!-- START LINK TO PREVIEW --> 

<!-- END LINK TO PREVIEW -->

### OR

To preview the project locally [See Prerequisites below](#prerequisites), and, run the following command from the root of the project:

```bash
npm start
```

This will launch a local development server and open the project in your browser.

---


---

## ⚙️ Prerequisites

Make sure you have the following installed:

- [Node.js and npm](https://nodejs.org/)

Install project dependencies:

```bash
npm install
```

---
