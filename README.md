
# Notification System Client

A Vue 3 application built with TypeScript and Vite that allows users to send notifications and view a history of notification logs. This client interacts with a backend service (typically a Spring Boot application).

## 📋 Prerequisites

- **Node.js**: Version `20.19.0` or higher (or `22.12.0+`).
- **Backend Service**: Ensure the Notification System backend is running on `http://localhost:8080`.

## 🚀 Setup & Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd notifications-client
   ```
2. **Install dependencies**

   ```bash
   npm install
   ```

## 💻 Running the Application

### Development Mode

Start the development server with hot-reload:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (default Vite port).

### Production Build

Type-check, compile, and minify for production:

```bash
npm run build
```

The output files will be in the `dist/` directory.

### Type Checking

Run TypeScript type checking:

```bash
npm run type-check
```

## 🧪 Testing 

This project uses Vitest for unit testing. Test files are located in __tests__ directories alongside the source code they are testing. 

### Running Unit Tests + +To execute the test suite, run the following command: 

npm run test:unit

## 🛠️ Tech Stack

- **Framework**: Vue 3 (Composition API)
- **Build Tool**: Vite
- **Language**: TypeScript
- **HTTP Client**: Axios
- **Routing**: Vue Router
