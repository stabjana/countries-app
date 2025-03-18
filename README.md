# 🌍 Countries Fullstack React Project

This is my first real full-stack app. We partly built it together in our React lessons and partly I was building it at home. I tried to make it an adventure with a little game and eventually you get some learning expierience from it. You can explore countries, see real-time weather data for their capitals, play the game, and keep track of your favorites! Plus, secure login with Supabase authentication gives you access to protected content. 🐠🐝

## 📂 Project Structure

```shell
project-root/
├── backend/   # NestJS application
└── frontend/  # React application
```

## ✅ Prerequisites

- Node.js (v18 or higher recommended)
- npm (comes with Node.js)

## 🔧 Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/countries-fullstack-react.git
cd countries-fullstack-react
```

2. Install all dependencies (both frontend and backend):

```bash
npm run install:all
```

## 🚀 Usage

Start both frontend and backend development servers:

```bash
npm run dev
```

The applications will be available at:

- **Frontend:** http://localhost:5180
- **Backend:** http://localhost:3000

## 🎮 Features

✨ **Explore Countries** – Browse through a vast collection of countries with detailed info.  
🌦 **Live Weather Data** – Check real-time weather for each capital city.  
🎏 **Flag Game** – Test your knowledge with a fun flag quiz!  
❤️ **Favourites** – Save your favorite countries and keep track of them.  
🔐 **Secure Authentication** – Supabase login for exclusive content.

## 📌 Available Commands

- `npm run dev` – Start both frontend and backend in development mode
- `npm run dev:frontend` – Start only the frontend
- `npm run dev:backend` – Start only the backend
- `npm run install:all` – Install dependencies for both projects
- `npm run install:frontend` – Install frontend dependencies
- `npm run install:backend` – Install backend dependencies
- `npm run build` – Build both projects
- `npm run build:frontend` – Build frontend only
- `npm run build:backend` – Build backend only

## 🌱 Environment Setup

1. **Backend Configuration**  
   Create a `.env` file in the `backend/` directory:

```env
SUPABASE_URL=https://your-supabase-instance.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

2. **Frontend Configuration**  
   Create an `.env` file in the `frontend/` directory and define the API key for weather data:

```env
API_KEY=your-api-key
```

_(Get a free API key from a weather data provider like OpenWeatherMap)_

## 🛠 Tech Stack

### **Frontend**

- React + TypeScript
- Vite
- Material UI

### **Backend**

- NestJS + TypeScript
- Supabase (Authentication & Database)

## 📝 Development Notes

- Backend includes CORS configuration for the frontend port (5180)
- TypeScript is set up for both frontend and backend
- ESLint + Prettier for consistent code formatting
- Hot-reload enabled for a smooth development experience
