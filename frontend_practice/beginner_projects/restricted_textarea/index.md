<!-- START JEKYLL LAYOUT -->
---
layout: default
---
<!-- END JEKYLL LAYOUT -->
# Restricted Textarea

This project is part of the [Frontend Projects Roadmap](https://roadmap.sh/frontend/projects) for beginners.  
You can find the specific project details [here](https://roadmap.sh/projects/restricted-textarea).

The purpose of this project is to build a restricted textarea component that limits the number of characters a user can enter. This is useful for forms where users must keep their input concise, such as feedback forms, social media posts, or short descriptions.

---

## 📚 Key Requirements

- **Textarea with Character Limit**: Implement a `<textarea>` field that restricts input to a specific number of characters (e.g., 250).
- **Live Character Counter**: Display a real-time counter showing how many characters have been entered.
- **Styling When Over Limit**: Visually indicate (e.g., with red color or border) when the user exceeds the limit.

---

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript (vanilla)

---

## 📁 Project Structure
<!-- START PROJECT STRUCTURE -->
```
restricted_textarea
	index.html
	script.js
	style.css
	README.md
	index.md

```
<!-- END PROJECT STRUCTURE -->

---

## 🔍 Preview

To run the project locally, open `index.html` in your browser or use a local web server:

```bash
# From the project root
python3 -m http.server
```

Then go to [http://localhost:8000](http://localhost:8000)

---

## 🚀 Features

- **Character-Limited Textarea**: Prevents user input beyond a defined limit.
- **Live Counter**: Displays current character count as the user types.
- **Error Styling**: Applies a visual alert when the limit is exceeded (e.g., red border or message).
- **Accessibility Compliance**: Uses proper `<label>` elements.
- **Responsive Layout**: The interface adjusts properly on various screen sizes.
