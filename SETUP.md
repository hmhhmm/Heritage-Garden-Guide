# Heritage Garden Guide - Setup Instructions

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up OpenAI API Key
Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

Edit `.env` and add your OpenAI API key:
```
OPENAI_API_KEY=sk-your-actual-api-key-here
PORT=3001
```

Get your API key from: https://platform.openai.com/api-keys

### 3. Run the Application

**Option A: Run Both Frontend and Backend Together**
```bash
npm run dev
```

**Option B: Run Separately**

Terminal 1 - Backend:
```bash
npm run server
```

Terminal 2 - Frontend:
```bash
npm start
```

## 📝 How It Works

- **Frontend (React)**: Runs on http://localhost:3000
- **Backend (Express)**: Runs on http://localhost:3001
- The frontend sends chat messages to the backend
- The backend calls OpenAI API with your API key (stored securely in .env)
- Users don't need to configure anything - it just works! ✨

## 🔒 Security

- API key is stored in `.env` file (never commit this!)
- `.gitignore` prevents `.env` from being pushed to GitHub
- Frontend never sees or handles the API key

## 🌿 Features

- 54 Malaysian heritage plants
- AI chatbot powered by ChatGPT
- Plant search and filtering
- Plant care guides
- Mobile-first design
