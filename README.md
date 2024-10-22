

# Frontend Project

This is a frontend project built using **ReactJS** with **Vite** for fast development and **MUI** (Material-UI) for styling and component design. The project aims to provide a responsive and user-friendly interface.

## Tech Stack

- **ReactJS**: JavaScript library for building user interfaces.
- **Vite**: A fast development build tool and bundler for modern web projects.
- **MUI**: A popular React UI framework for designing consistent and elegant user interfaces.

## Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

- **Node.js**: Make sure Node.js is installed on your machine. You can download it from [Node.js official website](<https://nodejs.org/>).

### Installation

1. **Clone the repository**:
   ```bash
   git clone <https://git.clp.kr/anbschool/2nd/tech-a/team-projects/verifyme-frontend.git>
   cd verifyme-frontend

## Installed Libraries

This project uses several libraries to enhance functionality and provide features. Below is a list of the main libraries included:

- **@date-io/date-fns**: `2.17.0` - Date utility library.
- **@date-io/dayjs**: `3.0.0` - Date adapter for Day.js.
- **@emotion/react**: `11.13.3` - Library for writing CSS styles with JavaScript.
- **@emotion/styled**: `11.13.0` - Library for creating styled components.
- **@eslint/js**: `9.12.0` - ESLint core for linting JavaScript.
- **@hookform/resolvers**: `3.9.0` - Resolvers for React Hook Form.
- **@mui/icons-material**: `6.1.2` - Material Icons for MUI.
- **@mui/joy**: `5.0.0-beta.48` - Joy UI components from MUI.
- **@mui/material**: `6.1.4` - Core Material-UI library.
- **@mui/styled-engine-sc**: `6.1.2` - Styled engine for MUI.
- **@mui/system**: `6.1.4` - System for building MUI components.
- **@mui/x-data-grid**: `7.19.0` - Data grid component for MUI.
- **@mui/x-date-pickers**: `7.20.0` - Date pickers for MUI.
- **@reduxjs/toolkit**: `2.2.8` - Toolkit for Redux.
- **@stripe/stripe-js**: `4.7.0` - Stripe.js library for payment processing.
- **@types/react-datepicker**: `7.0.0` - Type definitions for React Datepicker.
- **@types/react-dom**: `18.3.0` - Type definitions for ReactDOM.
- **@types/react**: `18.3.11` - Type definitions for React.
- **@vitejs/plugin-react**: `4.3.2` - Vite plugin for React.
- **axios**: `1.7.7` - Promise-based HTTP client for the browser and Node.js.
- **date-fns**: `2.30.0` - Modern JavaScript date utility library.
- **dayjs**: `1.11.13` - A minimalist JavaScript date library.
- **eslint-plugin-react-hooks**: `5.1.0-rc-fb9a90fa48-20240614` - ESLint plugin for React Hooks.
- **eslint-plugin-react-refresh**: `0.4.12` - ESLint plugin for React Refresh.
- **eslint-plugin-react**: `7.37.1` - ESLint plugin for React.
- **eslint**: `9.12.0` - A tool for identifying and reporting on patterns in JavaScript.
- **globals**: `15.10.0` - Global variables for different environments.
- **google-libphonenumber**: `3.2.38` - Google's library for parsing, formatting, and validating international phone numbers.
- **html-to-image**: `1.11.11` - Convert HTML to images using canvas.
- **install**: `0.13.0` - Library for installing npm packages programmatically.
- **npm**: `10.9.0` - Package manager for JavaScript.
- **react-chartjs-2**: `5.2.0` - React wrapper for Chart.js.
- **react-confetti-explosion**: `2.1.2` - A confetti explosion effect for React.
- **react-data-table-component**: `7.6.2` - Data table component for React.
- **react-dom**: `18.3.1` - React's DOM rendering library.
- **react-hook-form**: `7.53.0` - Hook for managing forms in React.
- **react-multi-carousel**: `2.8.5` - Multi-item carousel component for React.
- **react-phone-input-2**: `2.15.1` - Phone number input component for React.
- **react-redux**: `9.1.2` - Official React bindings for Redux.
- **react-responsive-carousel**: `3.2.23` - Responsive carousel component for React.
- **react-router-dom**: `6.26.2` - DOM bindings for React Router.
- **react-router**: `6.26.2` - Declarative routing for React.js.
- **react-select-country-list**: `2.2.3` - React select component for country list.
- **react-select**: `5.8.1` - Flexible and beautiful Select Input for React.
- **react-verification-input**: `4.1.2` - Input for verification codes.
- **react**: `18.3.1` - JavaScript library for building user interfaces.
- **styled-components**: `6.1.13` - Library for writing CSS-in-JS.
- **vite**: `5.4.8` - A fast build tool and development server.
- **yup**: `1.4.0` - Schema builder for runtime value parsing and validation.

### Installation of Libraries

If you need to install additional libraries, you can do so using npm. For example:

```
npm install <library-name>
Replace <library-name> with the actual name of the library you want to install.

```

1. **Install dependencies**:
    
    ```
    npm install
    
    ```
    
2. **Start the development server**:
    
    ```
    npm run dev
    
    ```
    
    This command will start the Vite development server, and you can view your project in the browser at [`http://localhost:5173`](http://localhost:5173/) .
    

### Build for Production

To build the project for production:

```bash
npm run build

```

This will create an optimized production build in the `dist` directory.

### Deployment

You can deploy your `dist` folder to any hosting service that supports static files, such as Vercel, Netlify, or GitHub Pages.

## Project Structure

```
verifyme-frontend/
├── node_modules/
├── src/
│   ├── assets/          # Static assets (images, fonts, etc.)
│   ├── components/      # Reusable React components
│   ├── data/           # Static data and constants
│   ├── hooks/          # Custom React hooks
│   ├── layouts/        # Layout components and templates
│   ├── pages/          # Page components and routes
│   ├── routers/        # Routing configuration
│   ├── store/          # State management (Redux/Context)
│   ├── utils/          # Utility functions and helpers
│   ├── App.css         # Application-wide styles
│   ├── App.jsx         # Root React component
│   ├── index.css       # Global CSS
│   └── main.jsx        # Application entry point
├── .editorconfig       # Editor configuration
├── .env               # Environment variables
├── .gitignore         # Git ignore rules
├── .gitlab-ci.yml     # GitLab CI/CD configuration
├── .prettierrc        # Prettier configuration
├── eslint.config.js   # ESLint configuration
├── index.html         # HTML entry point
├── package-lock.json  # Dependency lock file
├── package.json       # Project dependencies and scripts
├── README.md          # Project documentation
├── sitemap.xml        # Site map for SEO
└── vite.config.js     # Vite configuration
```

## Features

- **ReactJS**: For building dynamic UI components.
- **Vite**: Fast build times and hot module replacement.
- **MUI**: Consistent and customizable design system.
- **Responsive Design**: Optimized for different screen sizes.

## License

This project is licensed under the MIT License - see the [LICENSE](https://www.notion.so/technology-team/LICENSE) file for details.

## Contact

For any questions or feedback, feel free to reach out:

- **Name**: RatifyMe by Tech_A Team
- **Website**: [https://www.ratifyme.digital]