---
layout: default
---
# Cookie Consent UI

This project is part of the [Frontend Projects Roadmap](https://roadmap.sh/frontend/projects) for beginners.  
You can find the specific project details [here](https://roadmap.sh/projects/cookie-consent).

The objective of this project is to create a cookie consent popup that notifies users about the use of cookies and gives them the ability to accept or dismiss the notification. The consent state should persist, and the popup should not reappear once consent is given.

---

## 📚 Key Requirements

- **Consent Popup**: Display a cookie consent popup with a message and an "Accept" button.
- **Bonus : Persistent Storage**: Store the consent state in `cookie` so the popup doesn’t appear again after refreshing the page.
---

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript

---

## 📁 Project Structure
<!-- START PROJECT STRUCTURE -->
```
cookie_consent
	img
		icon-cookie.png
	index.html
	script.js
	style.css
	README.md
	index.md

```
<!-- END PROJECT STRUCTURE -->

---

## 🔍 Preview

To preview the project locally, open `index.html` directly in your browser or use a local development server:

```bash
# From the project root
python3 -m http.server
```

Then open [http://localhost:8000](http://localhost:8000) in your browser.

---

## 🚀 Features

- **Cookie Notification**: Informs the user about cookie usage.
- **Accept Button**: Once clicked, hides the popup and saves consent in a cookie.
- **No Repetition**: Remembers user choice and hides the popup on subsequent visits.
- **Reset Consent**: Includes a reset button that removes the cookie and reloads the page, allowing users to change their choice.
- **Focused Interaction**: While the popup is visible, all other page interactions are disabled and the background is dimmed to highlight the consent message.

