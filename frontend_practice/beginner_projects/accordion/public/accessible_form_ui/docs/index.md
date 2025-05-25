---
layout: default
---
# Accessible Form UI

This project is part of the [Frontend Projects Roadmap](https://roadmap.sh/frontend/projects) for beginners.  
You can find the specific project details [here](https://roadmap.sh/projects/accessible-form-ui).

The goal of this project is to design and build an **accessible and responsive user profile form** using semantic HTML and CSS.  
The form includes fields for full name, email, password, and confirm password, along with a button to toggle the visibility of the password text.  
Additionally, the form features a completeness progress bar and a checklist of requirements that must be met for the form to reach 100% completeness.  
While this version of the form won’t be functional, it will be a static UI component that can be enhanced with JavaScript in the future.

---

## 📚 Table of Contents

- [Key Requirements](#key-requirements)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Project Structure](#project-structure)
- [Preview](#preview)

---

## 🔑 Key Requirements

- **Form Validation Feedback**: Display contextual error messages using ARIA attributes.
- **Accessibility Best Practices**: Ensure proper labeling, focus states, error messaging, ARIA attributes, color contrast, and interactive elements.

---

## 🛠️ Technologies Used

- HTML5
- CSS3 

---

## 🚀 Features

- **Fully Accessible Form**: Semantic labels, ARIA attributes, and keyboard navigability.
- **Error Messaging**: Contextual error messages appear when validation fails (static).
- **Password Visibility Toggle**: Implemented purely with CSS and radio buttons.
- **Responsive Design**: Optimized for desktop and mobile viewports.
- **Profile Progress Tracker**: A visual indicator showing profile completion status.

---


## 📁 Project Structure
<!-- START PROJECT STRUCTURE -->
```
accessible_form_ui
	public
		img
			icon_hidden-password.svg
			icon_calendar.jpg
			icon_visible-password.png
		index.html
		style.css
	README.md

```
<!-- END PROJECT STRUCTURE -->
---

## 🔍 Preview

<!-- START LINK TO PREVIEW --> 
[Here to see the project on GitHub Page](https://kizz4.github.io/practice/frontend_practice/beginner_projects/accordion/public/accessible_form_ui/public)
<!-- END LINK TO PREVIEW -->

### OR

use a local server:

```bash
# From the project root directory
python3 -m http.server
```

Then navigate to [http://localhost:8000](http://localhost:8000) in your browser.

---


