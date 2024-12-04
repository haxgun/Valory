<div align="center">

# Frontend

</div>

---

## 📦 Requirements

To run the frontend, you will need the following dependencies installed:

- **Node.js 20+**: JavaScript runtime for building and running the frontend.
- **Package Manager**: [**pnpm**](https://pnpm.io/), a fast, disk space-efficient package manager for Node.js projects.

### Install dependencies  
Run the following command to set up your environment:  
```bash
pnpm install
```

This will automatically install all required dependencies listed in `package.json`.

---

## 📦 Key Dependencies

The frontend uses the following libraries and tools to provide a smooth and responsive user experience:

| Dependency                          | Version        | Purpose                                                                 |
|--------------------------------------|----------------|-------------------------------------------------------------------------|
| **@iconify/vue**                     | `^4.1.1`       | Icon library for adding a variety of icons.                            |
| **@vueuse/core**                     | `^10.6.1`      | Utility functions for Vue.js, enhancing app functionality.             |
| **vue-i18n**                         | `9`            | Internationalization plugin for Vue.js for multi-language support.    |
| **vue-router**                       | `^4.2.5`       | Routing library for Vue.js.                                            |
| **pinia**                            | `^2.1.7`       | State management for Vue.js applications (alternative to Vuex).       |
| **vite**                             | `^4.4.11`      | Next-generation, fast build tool for front-end development.            |
| **sass**                             | `^1.69.5`      | CSS preprocessor for writing cleaner, more maintainable stylesheets.   |
| **prettier**                         | `^3.0.3`       | Code formatter to enforce a consistent style.                         |
| **eslint**                           | `^9.15.0`      | Linter to ensure consistent code quality and catch errors early.      |

These dependencies are automatically installed with the `pnpm install` command.

---


## 🛠 General Workflow  

### 1. **Setup Environment**  
1. Clone the repository:  
   ```bash
   git clone https://github.com/haxgun/Valory.git
   cd frontend
   ```
2. Install dependencies:
    ```bash
    pnpm install
    ```

3. Run the Application
    ```bash
    pnpm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` to view the app.

---

## 🔩 Development Scripts

Here are the key scripts available for development in this project:

| Script             | Command                                  | Purpose                                                            |
|--------------------|------------------------------------------|--------------------------------------------------------------------|
| **dev**            | `vite`                                   | Starts the development server and watches for file changes.       |
| **build**          | `vite build`                             | Builds the project for production, optimizing assets.              |
| **preview**        | `vite preview`                           | Previews the built application locally for testing.               |
| **serve**          | `vite build && vite preview`             | Builds the project and starts a preview server.                   |
| **lint**           | `eslint . --ext .vue,.js,.jsx,.cjs,.mjs --fix --ignore-path .gitignore` | Lints the codebase and automatically fixes issues where possible. |
| **format**         | `prettier --write src/`                  | Formats all source files according to the Prettier configuration. |
