# Age Calculator

This project is part of the [Frontend Projects Roadmap](https://roadmap.sh/frontend/projects) for beginners.  
You can find the specific project details [here](https://roadmap.sh/projects/age-calculator).

The goal of this project is to create an accessible and responsive application that calculates a user's exact age in years and months based on their date of birth. The calculator should use a datepicker and a date library to handle the logic.

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

- **Datepicker Input**: Let the user select their date of birth.
- **Exact Age Calculation**: Compute age in years and months.
- **Accessible Display**: Results must be readable by assistive technologies.
- **Responsive UI**: The layout should adapt to different screen sizes.
- **Use a Date Library**: use a library like Luxon.

---

## 🛠️ Technologies Used

- HTML5
- CSS3
- TypeScript
- [Luxon](https://moment.github.io/luxon/) (for date calculations)
- [Flatpickr](https://flatpickr.js.org/) (for the datepicker)
- npm
- Webpack

---

## 🚀 Features

- **Age Calculation**: Calculates and displays age in years and months.
- **Live Update**: Uses `aria-live` to announce results via screen readers.
- **Flatpickr Integration**: Accessible and styled date input.
- **Responsive Design**: Works on desktop and mobile.

---


## 📁 Project Structure
<!-- START PROJECT STRUCTURE -->
```
age_calculator
	public
		package.json
		webpack.config.js
		index.html
		package-lock.json
		src
			img
				icon_calendar.jpg
			style.css
			script.ts
		tsconfig.json
	README.md

```
<!-- END PROJECT STRUCTURE -->


---

## 🔍 Preview
<!-- START LINK TO PREVIEW --> 
[Here to see the project on GitHub Page](https://kizz4.github.io/practice/frontend_practice/beginner_projects/age_calculator/public/dist)
<!-- END LINK TO PREVIEW -->

### OR

To preview the project locally [See Prerequisites below](#prerequisites), and, run the following command from the root of the project:

```bash
npm start
```

This will launch a local development server and open the project in your browser.

---

## ⚙️ Prerequisites

Make sure you have the following installed:

- [Node.js and npm](https://nodejs.org/)
- A modern browser

Install project dependencies:

```bash
npm install
```

