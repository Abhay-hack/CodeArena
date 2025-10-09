# ⚔️ CodeArena

CodeArena is a web-based competitive programming assistant where users can fetch coding problems from **Codeforces** and practice them in an interactive way.  
The platform provides a simple interface, problem statement fetching, and an environment to extend into a complete practice hub.

---

## 🚀 Features
- 🔍 Fetch coding problems directly from **Codeforces API**
- 📑 View problem statements in a clean, responsive UI
- ⚡ Built with **Node.js + Express** backend and **React.js frontend**
- 🌐 Easy to deploy locally or on cloud platforms
- 🔒 Secure environment variables management using `.env`

---

## 🛠️ Tech Stack
- **Frontend:** React.js, TailwindCSS
- **Backend:** Node.js, Express.js
- **API:** Codeforces Problem API
- **Deployment:** Vercel / Render / Railway (suggested)

---

## 📂 Project Structure
```bash
CodeArena/
├── client/ # Frontend (React.js)
├── server/ # Backend (Node.js + Express)
│ ├── index.js
│ ├── routes/
│ └── utils/
├── .env # Environment variables (not pushed to GitHub)
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/Abhay-hack/CodeArena.git
cd CodeArena
```
### 2. Install dependencies 
  #### Backend
  ```bash
  cd server
  npm install
  ```
  #### Frontend
  ```bash
  cd client
  npm install
  ```
### 3. Setup environment variables
  #### Create a .env file inside server/ with the following:
  ```bash
  PORT=5000
  FRONTEND_URL=http://localhost:3000
  ```
---
## 🔮 Future Enhancements
- ✅ Add support for LeetCode & HackerRank APIs
- ✅ Code editor integration for solving problems inside the app
- ✅ User authentication and progress tracking
- ✅ Leaderboard for competitive practice

---
## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit pull requests.  

---

## 📄 License

This project is **MIT licensed**.  

---

## 👨‍💻 Author

**Abhay Gupta**  

- [GitHub](https://github.com/Abhay-hack)  
- [Portfolio](https://brief-navy.vercel.app/)  
- [LinkedIn](https://www.linkedin.com/in/abhay-gupta)
