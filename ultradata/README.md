# React + Vite Project

## Requirements

- **Node.js**: v20+
- **npm**: v10+
- **React**: v18
- **Build tool**: Vite

## 1) Environment variables

Create a `.env` file in the project root and add your backend API URL:

```dotenv
VITE_API_URL=<YOUR_BACKEND_API_URL>
```

---

## 2) Run locally (port 3222)

Install dependencies:

```bash
npm install
```

Start dev server on port **3222**:

```bash
npm run dev -- --port=3222
```

---

## 3) Build the app

```bash
npm run build
```

The production build will be located in the `dist/` folder.

---

## 4) Run with Docker

Build and run the app in detached mode:

```bash
docker-compose up --build -d
```

App will be available at:  
👉 http://localhost:3222
