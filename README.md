# Loan Eligibility Simulator

This is web based application that allows users to simulate their loan
eligibility based on their income, expenses, and their required amount
to loan.

------------------------------------------------------------------------

## Overview

This application will allow users to:
-  Enter their personal and financial details
-  Select the purpose for loan
-  Get the estimated loan they can qualify based on the informtion
   provided
-  Responsive and easy to use UI

Backend is powered by a lightwight mock API using json-server

------------------------------------------------------------------------

## Project Structure

    root/
     ├── frontend/      # React + Vite application
     ├── backend/       # Node + json-server mock API
     ├── docker-compose.yml

------------------------------------------------------------------------

## Tech Stack

-  React + Vite
-  Typescript
-  Tailwind CSS
-  HTML
-  Node.JS
-  json-server
-  Docker
-  Nginx (production frontend)

------------------------------------------------------------------------

# Running locally

## 1. Clone the repo

``` bash
git clone https://github.com/ImageNhlayisoShandlani/Loan-Eligibility-Simulator-Frontend.git
cd Loan-Eligibility-Simulator-Frontend
```

## 2. Start backend

From root folder
```bash
cd mock_api
npm install
npm run dev
```

Backend runs on: http://localhost:3001

## 3. Start frontend

From the root folder
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: http://localhost:3000

------------------------------------------------------------------------

# Running with Docker

NB - Please make sure to have Docker installed and running on your machine

This project includes:

-   Multi-stage Docker build for the frontend
-   Nginx serving optimized static files
-   Separate backend container
-   Shared Docker network

## Build and Run

From the project root:

```bash
docker-compose up
```

## Access the application

Frontend: http://localhost:3000

Backend: http://localhost:3001

## Stop Containers

``` bash
docker-compose down
```

------------------------------------------------------------------------

# Author

Image Nhlayiso Shandlani\
Frontend Engineer
