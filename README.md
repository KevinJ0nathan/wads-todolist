# ToDoList APP - Wads Week 5 Homework

A simple and efficient To-Do List web app built with React + Vite, styled with Tailwind CSS, and powered by Firebase for authentication and database storage.

🚀 Features
- Google Authentication (Firebase Auth)
- Add, edit, and delete tasks
- Store tasks in Firestore Database
- Responsive design with Tailwind CSS

## 🛠️ Installation

1️⃣ Clone the repository
```sh
git clone https://github.com/KevinJ0nathan/wads-todolist.git
cd wads-todolist
```
2️⃣ Install Dependencies
```sh
npm install
```
3️⃣ Set Up Firebase
1. Go to Firebase console and create a new project.
2. Enable Authentication → Sign-in method → Enable Google Sign-In.
3. Set up Firestore Database in test mode for development.
4. Get your Firebase configuration and create a .env file in the project root:
``` env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_APP_ID=your_app_id
VITE_MEASUREMENT_ID=your_measurement_id
```
**Make sure to not commit the `.env` file to GitHub! Add it to `.gitignore`.**

4️⃣ Run the Development Server
```sh
npm run dev
```
The app should now be running on `http://localhost:5173/`

