# 🏠 Roomates - Full-Stack Property Finder

A complete full-stack web application built from scratch. "Roomates" allows users to find, list, and manage property rentals (flats and PGs). It features a secure REST API backend built with **Spring Boot** and a modern, responsive frontend built with **React** and **Material-UI**. The entire application is fully containerized with **Docker**.

This project was built to demonstrate a complete full-stack workflow, including secure authentication, cloud image storage, and professional containerized deployment.

## ✨ Features

* **Secure Authentication:** Full user registration and login system using **JWT (JSON Web Tokens)** and Spring Security.
* **Full CRUD Functionality:** Users can Create, Read, Update, and Delete property listings.
* **Image Uploads:** Users can upload property photos, which are hosted on the **Cloudinary** CDN.
* **Protected Routes:**
    * Backend: Endpoints are protected. Users can only edit or delete their *own* listings.
    * Frontend: Pages like "Add Property" or "My Properties" are only accessible to logged-in users.
* **Search Functionality:** A public homepage to search/filter all available properties by city and price.
* **Fully Responsive:** Modern UI built with Material-UI (MUI) that works on all device sizes.
* **Containerized:** The entire application (frontend, backend, database) is containerized with **Docker** and managed with **Docker Compose** for easy, one-command setup.

## 🛠️ Tech Stack

| Category | Technology |
| --- | --- |
| **Backend** | Java, Spring Boot, Spring Security, Spring Data JPA |
| **Frontend** | React (Vite), React Router, Material-UI (MUI), Axios |
| **Database** | PostgreSQL |
| **Authentication** | JSON Web Tokens (JWT) |
| **Image Storage** | Cloudinary (Cloud CDN) |
| **Deployment** | Docker & Docker Compose |

---

## 🚀 Getting Started

There are two ways to run this project: locally for development or with Docker for production.

### 1. Running with Docker (Recommended)

This is the fastest and easiest way to run the entire application.

1.  **Install Docker Desktop**
    Make sure you have [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running on your machine.

2.  **Build the Java App**
    Before building the Docker image, you need to package the Java application into a `.jar` file:
    ```bash
    # Navigate to the backend folder
    cd roomates-app
    
    # Run the Maven package command
    mvn clean package
    ```

3.  **Update Environment Variables**
    Go back to the root folder. Your `docker-compose.yml` file contains placeholders for your secret keys. Open it and add your real keys:
    * `POSTGRES_PASSWORD` (Choose any password)
    * `CLOUDINARY_CLOUD_NAME`
    * `CLOUDINARY_API_KEY`
    * `CLOUDINARY_API_SECRET`

4.  **Run Docker Compose**
    From the **root** project folder (the one containing `docker-compose.yml`), run:
    ```bash
    # This command builds the images and starts all 3 containers
    docker-compose up --build
    ```

5.  **Access the App**
    Your app is now running!
    * **Frontend:** `http://localhost:5173`
    * **Backend:** `http://localhost:8080`

### 2. Running Locally (for Development)

#### Backend (Spring Boot)
1.  **Navigate to the backend folder:** `cd roomates-app`
2.  **Install dependencies:** `mvn install`
3.  **Configure:** Open `src/main/resources/application.properties` and update it with your local PostgreSQL database credentials and your Cloudinary API keys.
4.  **Run:** `mvn spring-boot:run`
    * The backend server will run on `http://localhost:8080`.

#### Frontend (React)
1.  **Navigate to the frontend folder:** `cd roomates-frontend`
2.  **Install dependencies:** `npm install`
3.  **Run:** `npm run dev`
    * The frontend development server will run on `http://localhost:5173`.
