# Vite + React + TypeScript Components

This project contains two React components built using **Vite, TypeScript, and TailwindCSS**:

1. **InputField** – A flexible input component with support for labels, helper text, password toggle, clear button, and different sizes/variants.
2. **DataTable** – A dynamic table component with support for sorting, selectable rows, loading state, and empty state messages.

Both components are documented and previewed using **Storybook**.

---

## 📁 Project Structure

src/
components/
InputField.tsx
DataTable.tsx
stories/
InputField.stories.tsx
DataTable.stories.tsx

---
⚡ Setup & Run

1. Install dependencies
   ```bash
        npm install
2. Run development server
   ```bash
   npm run dev
3. Run Storybook locally
    ```bash
   npm run storybook
Open Storybook at http://localhost:6006 to view and interact with the components.

---

🛠 Features

InputField

- Label and placeholder

- Helper text and error message (partially implemented)

- Disabled state

- Clear button ✕

- Password toggle 👁️

- Size variants: sm, md, lg

- Visual variants: outlined, filled, ghost

DataTable

- Column sorting (ascending/descending)

- Selectable rows with checkboxes

- Loading and empty states

- Highlight selected rows

- Fully responsive table layout

---

📦 Storybook Deployment

Live Storybook preview: https://react-ui-assignment-five.vercel.app

---

💡 Known Limitation

- The InputField error message feature is partially implemented. All other features are fully functional.

---

📝 Notes

- Components are written in TypeScript with TailwindCSS for styling.
- Storybook demonstrates all interactive states and component variations.
- This project is submitted for internship assignment evaluation.
