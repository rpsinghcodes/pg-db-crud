# Candidate Management System

A modern, full-stack web application for managing candidate information during recruitment processes. Built with React, Express, and PostgreSQL.

![Candidate Management](https://img.shields.io/badge/Candidate-Management-blue)
![React](https://img.shields.io/badge/React-19.2-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)

## ✨ Features

- **Complete CRUD Operations**
  - Create new candidate records with validation
  - View all candidates in a beautiful, responsive table
  - Update candidate information seamlessly
  - Delete candidates with confirmation dialogs

- **Advanced Search & Filtering**
  - Search by name, email, or skills
  - Filter by status (Applied, Interviewing, Hired, Rejected)
  - Filter by applied position
  - Real-time filtering without page reloads

- **Modern UI/UX**
  - Clean, intuitive interface with gradient designs
  - Responsive layout for all devices
  - Smooth animations and transitions
  - Accessible components with proper ARIA labels
  - Form validation with helpful error messages

- **Data Integrity**
  - Input validation on both frontend and backend
  - Parameterized queries to prevent SQL injection
  - Unique email constraints
  - Proper error handling and user feedback

## 🛠️ Tech Stack

### Frontend
- **React 19.2** - Modern UI library
- **Vite** - Fast build tool and dev server
- **TailwindCSS 4** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Axios** - HTTP client for API requests

### Backend
- **Node.js** - JavaScript runtime
- **Express 5** - Web application framework
- **PostgreSQL** - Relational database
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **PostgreSQL** (v12 or higher)
- **npm** or **yarn** package manager

## 🚀 Installation

### 1. Navigate to Project Directory

```bash
cd candidate-management
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

## ⚙️ Environment Setup

### Backend Configuration

Create a `.env` file in the `backend/` directory:

```env
# PostgreSQL Database Connection
# Replace the values below with your actual PostgreSQL credentials
# Format: postgresql://username:password@host:port/database_name
# Example: postgresql://postgres:mypassword@localhost:5432/candidate_db
DATABASE_URL=postgresql://username:password@host:port/database

# Server Configuration
PORT=5001
NODE_ENV=development
```

**Note:** You can copy `backend/.env.example` and update it with your actual values.

**Important:** Make sure to:
1. Replace placeholder values with your actual PostgreSQL credentials
2. Create the database first if it doesn't exist: `CREATE DATABASE candidate_db;`
3. Ensure PostgreSQL is running before starting the server

### Frontend Configuration

Create a `.env` file in the `frontend/` directory:

```env
# Backend API URL
VITE_API_URL=http://localhost:5001/api
```

**Note:** You can copy `frontend/.env.example` and update it with your actual values.

## 🏃 Running the Application

### Development Mode

1. **Start the Backend Server**

   ```bash
   cd backend
   npm run dev
   ```

   The backend will run on `http://localhost:5001` (or your configured PORT).

2. **Start the Frontend Development Server**

   Open a new terminal:

   ```bash
   cd frontend
   npm run dev
   ```

   The frontend will run on `http://localhost:5173` (Vite default port).

3. **Access the Application**

   Open your browser and navigate to `http://localhost:5173`

### Production Mode

1. **Build the Frontend**

   ```bash
   cd frontend
   npm run build
   ```

2. **Start the Backend**

   ```bash
   cd backend
   npm start
   ```

## 📁 Project Structure

```
candidate-management/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js              # Database connection configuration
│   │   ├── controllers/
│   │   │   └── candidateController.js  # CRUD route handlers
│   │   ├── middleware/
│   │   │   └── errorMiddleware.js # Global error handler
│   │   ├── routes/
│   │   │   └── candidateRoutes.js # API route definitions
│   │   ├── utils/
│   │   │   └── initDb.js          # Database schema initialization
│   │   └── server.js              # Express app entry point
│   ├── .env                        # Environment variables (create this)
│   ├── .env.example               # Environment variables template
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   └── favicon.svg            # Application favicon
│   ├── src/
│   │   ├── components/
│   │   │   ├── CandidateTable.jsx # Main table component
│   │   │   ├── CandidateForm.jsx  # Add/Edit form component
│   │   │   └── DeleteDialog.jsx   # Delete confirmation dialog
│   │   ├── services/
│   │   │   └── api.js             # API service layer
│   │   ├── App.jsx                # Main application component
│   │   ├── index.css              # Global styles
│   │   └── main.jsx               # Application entry point
│   ├── .env                        # Environment variables (create this)
│   ├── .env.example               # Environment variables template
│   ├── index.html                 # HTML template
│   └── package.json
│
└── README.md
```

## 🔌 API Endpoints

### Candidate Operations

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/candidates` | Get all candidates (supports query params: search, status, position) |
| `GET` | `/api/candidates/:id` | Get specific candidate by ID |
| `POST` | `/api/candidates` | Create a new candidate |
| `PUT` | `/api/candidates/:id` | Update existing candidate |
| `DELETE` | `/api/candidates/:id` | Delete candidate |

### Example API Requests

**Get All Candidates:**
```bash
GET /api/candidates
GET /api/candidates?search=john&status=Applied&position=Developer
```

**Create Candidate:**
```bash
POST /api/candidates
Content-Type: application/json

{
  "name": "John Doe",
  "age": 28,
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "skills": "JavaScript, React, Node.js",
  "experience": 5,
  "applied_position": "Senior Developer",
  "status": "Applied"
}
```

**Update Candidate:**
```bash
PUT /api/candidates/1
Content-Type: application/json

{
  "status": "Interviewing"
}
```

**Delete Candidate:**
```bash
DELETE /api/candidates/1
```

## 💡 Usage

### Adding a Candidate

1. Click the "Add Candidate" button
2. Fill in the required fields (Name, Age, Email)
3. Optionally add phone, skills, experience, position, and status
4. Click "Add Candidate" to save

### Editing a Candidate

1. Click the edit icon (pencil) next to any candidate
2. Modify the information in the form
3. Click "Update Candidate" to save changes

### Deleting a Candidate

1. Click the delete icon (trash) next to any candidate
2. Confirm the deletion in the dialog
3. The candidate will be permanently removed

### Searching and Filtering

- Use the search box to find candidates by name, email, or skills
- Use the status dropdown to filter by candidate status
- Use the position dropdown to filter by applied position
- Clear filters by clicking the X button

## 🗄️ Database Schema

The `candidates` table includes:

- `id` - Primary key (auto-increment)
- `name` - VARCHAR(255), Required
- `age` - INTEGER, Required, Must be > 0
- `email` - VARCHAR(255), Unique, Required
- `phone` - VARCHAR(50), Optional
- `skills` - TEXT, Optional
- `experience` - INTEGER, Optional, Must be >= 0
- `applied_position` - VARCHAR(255), Optional
- `status` - VARCHAR(50), Default: 'Applied', Values: 'Applied', 'Interviewing', 'Hired', 'Rejected'
- `created_at` - TIMESTAMP, Auto-generated
- `updated_at` - TIMESTAMP, Auto-updated

## 🔒 Security Features

- Input validation on both frontend and backend
- Parameterized SQL queries to prevent SQL injection
- Helmet.js for security headers
- CORS configuration for cross-origin requests
- Error handling with meaningful messages
- Unique email constraint to prevent duplicates

## 🐛 Troubleshooting

### Database Connection Issues

- Ensure PostgreSQL is running
- Verify your database credentials in `.env`
- Check that the database exists and is accessible
- Verify the connection string format

### API Connection Issues

- Ensure the backend server is running
- Check that `VITE_API_URL` in frontend `.env` matches backend URL
- Verify CORS settings if accessing from different origins

### Port Conflicts

- If port 5001 is in use, change `PORT` in backend `.env`
- If port 5173 is in use, Vite will automatically use the next available port

## 📝 License

ISC
