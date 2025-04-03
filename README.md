# 🌟 Task Manager Web App

## 🚀 Live Demo
[🔗 Click here to view the deployed app](YOUR_DEPLOYED_LINK)

---

## 📌 Project Overview
This **Task Manager Web App** is designed to help users efficiently manage their tasks. Users can:
✅ Sign up and log in securely. 🔐
✅ Add, edit, and delete tasks effortlessly. ✏️🗑️
✅ View tasks in a structured and responsive UI. 📋
✅ Persist data using **PostgreSQL on Supabase**. 🗄️
✅ Ensure authentication using **JWT-based authentication**. 🛡️

---

## 🛠️ Tech Stack
### 🎨 Frontend:
- **React (TSX)** – Component-based UI development.
- **Tailwind CSS** – Modern and responsive styling.

### 🔧 Backend:
- **Node.js + Express** – RESTful API for task management.
- **JWT Authentication** – Secure user authentication.
- **PostgreSQL (Supabase)** – Cloud database to store user details and tasks.

### 🌍 Deployment:
- **Frontend:** Deployed on [Vercel/Netlify] 🚀
- **Backend:** Hosted on [Render/Railway/EC2] 🖥️
- **Database:** Supabase (PostgreSQL) 🗄️

---

## ✨ Features
- ✅ **User Authentication** (Sign up, Log in, Protected Routes) 🔐
- ✅ **Task CRUD Operations** (Add, Edit, Delete, View Tasks) 📝
- ✅ **Mobile Responsive UI** 📱
- ✅ **API Integration** (Frontend & Backend Communication) 🔗
- ✅ **Data Persistence with PostgreSQL** 💾
- ✅ **Deployment on Cloud Platforms** ☁️

---

## 🎯 Bonus Features
- ✅ Task categories (Work, Personal, Urgent) 📌
- ✅ "Mark as Completed" feature ✅
- ✅ UI animations for task updates 🎨

---

## 📂 Folder Structure
```
📦 task-manager-app
├── 📂 client  (React Frontend)
│   ├── 📂 src
│   │   ├── 📂 components
│   │   ├── 📂 pages
│   │   ├── 📜 App.tsx
│   │   ├── 📜 index.tsx
│   ├── 📜 package.json
│   ├── 📜 tailwind.config.js
│
├── 📂 server  (Node.js Backend)
│   ├── 📂 routes
│   ├── 📂 controllers
│   ├── 📂 models
│   ├── 📜 server.js
│   ├── 📜 package.json
│
├── 📜 README.md
```

---

## 🚀 Installation & Setup
### 🛠️ 1️⃣ Clone the Repository
```sh
git clone https://github.com/YOUR_GITHUB_REPO.git
cd task-manager-app
```

### 🔧 2️⃣ Setup Backend
```sh
cd server
npm install
npm start
```

### 🎨 3️⃣ Setup Frontend
```sh
cd client
npm install
npm run dev
```

### 🔑 4️⃣ Environment Variables (.env)
```sh
# Server (.env)
PORT=5000
JWT_SECRET=your_secret_key
DATABASE_URL=your_supabase_postgresql_url

# Client (.env)
VITE_API_URL=http://localhost:5000
```

---

## 🌍 Deployment
- **Frontend:** Deployed on [Vercel/Netlify] 🚀
- **Backend:** Hosted on [Render/Railway/EC2] 🖥️
- **Database:** Supabase (PostgreSQL) 🗄️

---

## 📜 License
This project is licensed under the **MIT License**.

---

## 💡 Author
- **Aditya** 🚀

