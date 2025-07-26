# ⚔️ CodeArena - Full Stack Competitive Coding Platform [IN PROGRESS]

CodeArena is a **full-stack** web application designed to offer an immersive environment for competitive coding, compiling, and real-time interaction. It is being developed using **Node.js (backend)** and **Vite + React (frontend)**. The entire app is containerized using **Docker** for consistent local development and deployment.

---

## 📁 Project Structure
```bash
  CodeArena/
  ├── client/ # Frontend built with Vite + React
  │ ├── Dockerfile
  │ ├── package.json
  │ ├── ...
  │
  ├── server/ # Backend using Node.js and Express
  │ ├── Dockerfile
  │ ├── package.json
  │ ├── routes/
  │ ├── controllers/
  │ ├── index.js
  │ ├── ...
  │
  ├── .dockerignore
  ├── docker-compose.yml
  ├── README.md # This file
  └── ...
```

---

## 🚧 Features (in development)

- [x] Vite + React frontend setup
- [x] Node.js Express backend API
- [ ] MongoDB integration (optional)
- [ ] Code execution sandbox (planned)
- [ ] Authentication and user profiles
- [ ] Real-time compiler with WebSocket support
- [ ] Admin dashboard for problem management
- [ ] Docker-based microservices

---

## 🐳 Dockerized Development Setup

### 🔧 Prerequisites

- [Docker](https://www.docker.com/) installed and running.
- Optional: [Docker Compose](https://docs.docker.com/compose/)

---

## 🚀 Getting Started with Docker Compose

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/CodeArena.git
cd CodeArena
```
### 2. Build and Run Services

```bash
docker-compose up --build
```
### 3. Accessing the App
```bash
Frontend: http://xxxx
Backend API: http://xxxx
```

## 🤝 Contributing

Feel free to fork the repo, open issues, or contribute improvements! If you're interested in joining the team, contact me.

## 👨‍💻 Author
Abhay Gupta
  - 🌐 Portfolio: [Your Portfolio Link Here]
  - 📧 Email: guptaabhay@tutamail.com
  - 💼 LinkedIn: [Your LinkedIn Profile Link Here]
  - 🔗 GitHub: [Your GitHub Profile Link Here]

## 📄 License
  This project is licensed under the MIT License. Feel free to use and modify it for your own projects.
