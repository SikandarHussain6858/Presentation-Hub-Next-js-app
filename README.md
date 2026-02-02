# Presentation Hub (Next.js + Firebase)

This project has been converted to Next.js with Firebase.

## Setup

1.  **Configure Firebase**:
    *   Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com).
    *   Enable **Authentication** (Email/Password provider).
    *   Enable **Firestore Database**.
    *   Enable **Storage**.
    *   Go to Project Settings -> General -> Your apps -> Web app -> SDK Setup and Configuration.
    *   Copy the config values.

2.  **Environment Variables**:
    *   Copy `.env.example` to `.env.local`:
        ```bash
        cp .env.example .env.local
        ```
    *   Fill in the values from your Firebase config.

3.  **Install Dependencies** (if not done):
    ```bash
    npm install
    ```

4.  **Run Development Server**:
    ```bash
    npm run dev
    ```

## Features

*   **Authentication**: Login/Register with Email/Password.
*   **Presentations**: Upload PPT/PDF/etc. to Firebase Storage. Metadata in Firestore.
*   **Classroom Mode**: Enter 6-digit code to view presentation.
*   **Dashboard**: Manage your uploads.

## Migration Notes

*   The old frontend and backend code is located in `d:\Presentation Hub\prev` directory.
*   The backend (Express) is no longer needed as we use Firebase directly.
