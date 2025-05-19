# Accessible Form UI

This project is part of the [Frontend Projects Roadmap](https://roadmap.sh/frontend/projects) for beginners.  
You can find the specific project details [here](https://roadmap.sh/projects/accessible-form-ui).

The goal of this project is to design and build an **accessible and responsive user profile form** using semantic HTML and CSS.  
The form includes fields for full name, email, password, and confirm password, along with a button to toggle the visibility of the password text.  
Additionally, the form features a completeness progress bar and a checklist of requirements that must be met for the form to reach 100% completeness.  
While this version of the form won’t be functional, it will be a static UI component that can be enhanced with JavaScript in the future.

---

## 📚 Key Requirements

- **Form Validation Feedback**: Display contextual error messages using ARIA attributes.
- **Accessibility Best Practices**: Ensure proper labeling, focus states, error messaging, ARIA attributes, color contrast, and interactive elements.

---

## 🛠️ Technologies Used

- HTML5
- CSS3 

---

## 📁 Project Structure

```
accessible-form-ui/
├── index.html
├── style.css
├── img/
│   ├── icon_onglet.png
│   ├── icon_visible-password.png
│   └── icon_hidden-password.svg
└── font/
    └── static/
        └── Quicksand-SemiBold.ttf
```

---

## 🔍 Preview

You can open `index.html` directly in your browser or use a local server:

```bash
# From the project root directory
python3 -m http.server
```

Then navigate to [http://localhost:8000](http://localhost:8000) in your browser.

---

## 🚀 Features

- **Fully Accessible Form**: Semantic labels, ARIA attributes, and keyboard navigability.
- **Error Messaging**: Contextual error messages appear when validation fails (static).
- **Password Visibility Toggle**: Implemented purely with CSS and radio buttons.
- **Responsive Design**: Optimized for desktop and mobile viewports.
- **Profile Progress Tracker**: A visual indicator showing profile completion status.

---

## 💡 Bonus Tips

- Modify `max-width` and `font-size` values in media queries for improved responsiveness.
- Enhance accessibility with better contrast and focus states.
- Test the form UI using a screen reader or browser extensions like Axe or Lighthouse to check for accessibility issues and make necessary adjustments.

---

By completing this project, you'll gain practical experience in building accessible and responsive forms using HTML and CSS, adhering to best practices in modern web development.