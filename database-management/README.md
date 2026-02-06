# PostgreSQL Manager

A modern, web-based database management interface for PostgreSQL that simplifies database creation, verification, and migration tasks without requiring direct command-line access.

![PostgreSQL Manager](https://img.shields.io/badge/PostgreSQL-Manager-blue)
![React](https://img.shields.io/badge/React-19.2-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![License](https://img.shields.io/badge/License-ISC-yellow)

## ✨ Features

- 🗄️ **Database Management**
  - Create new PostgreSQL databases with a simple form
  - View all databases in a clean, organized inventory
  - Verify database existence before operations

- 🔄 **Data Migration**
  - Migrate data between databases using `pg_dump` and `psql`
  - Visual migration hub with source and target selection
  - Real-time migration status updates

- 🎨 **Modern UI/UX**
  - Beautiful gradient-based design
  - Responsive layout for all devices
  - Smooth animations and transitions
  - Intuitive user interface

- 🔒 **Security**
  - Server-side credential handling
  - Activity logging for audit trails
  - Secure error handling

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
- **PostgreSQL (pg)** - Database driver
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **PostgreSQL** (v12 or higher)
- **PostgreSQL Client Tools** (`pg_dump` and `psql` in your PATH)
- **npm** or **yarn** package manager

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd database-management
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
# Option 1: Use connection string (recommended)
DATABASE_URL=postgresql://username:password@host:port/database

# Option 2: Use individual parameters (alternative)
# DB_HOST=localhost
# DB_USER=your_postgres_user
# DB_PASSWORD=your_postgres_password
# DB_PORT=5432

# Server Configuration
PORT=5000
NODE_ENV=development
```

**Note:** You can copy `backend/.env.example` and update it with your actual values.

### Frontend Configuration

Create a `.env` file in the `frontend/` directory:

```env
# Backend API URL
# For local development
VITE_API_URL=http://localhost:5000/api

# For production, use your deployed backend URL
# VITE_API_URL=https://your-backend-url.com/api
```

**Note:** You can copy `frontend/.env.example` and update it with your actual values.

## 🏃 Running the Application

### Development Mode

1. **Start the Backend Server**

   ```bash
   cd backend
   npm run dev
   ```

   The backend will run on `http://localhost:5000` (or your configured PORT).

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
database-management/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js              # Database connection configuration
│   │   ├── controllers/
│   │   │   └── dbController.js    # Route handlers for database operations
│   │   ├── middleware/
│   │   │   ├── auth.js            # Authentication middleware (optional)
│   │   │   ├── errorMiddleware.js # Global error handler
│   │   │   └── logger.js          # Activity logging middleware
│   │   ├── routes/
│   │   │   └── dbRoutes.js        # API route definitions
│   │   ├── utils/
│   │   │   └── migrationHelper.js # Database migration utilities
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
│   │   │   ├── CreateDatabase.jsx # Database creation component
│   │   │   ├── DatabaseList.jsx   # Database inventory component
│   │   │   ├── MigrationHub.jsx   # Migration interface component
│   │   │   └── VerifyDatabase.jsx # Database verification component
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

### Database Operations

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/databases` | Get all databases |
| `POST` | `/api/databases` | Create a new database |
| `POST` | `/api/databases/verify` | Verify database existence |
| `POST` | `/api/databases/migrate` | Migrate data between databases |

### Example API Requests

**Create Database:**
```bash
POST /api/databases
Content-Type: application/json

{
  "dbName": "my_database"
}
```

**Verify Database:**
```bash
POST /api/databases/verify
Content-Type: application/json

{
  "dbName": "my_database"
}
```

**Migrate Database:**
```bash
POST /api/databases/migrate
Content-Type: application/json

{
  "sourceDbName": "source_db",
  "targetDbName": "target_db"
}
```

## 💡 Usage

### Creating a Database

1. Navigate to the "Create Database" section
2. Enter a database name (must start with a letter/underscore)
3. Click "Create Database"
4. The database will appear in the inventory list

### Verifying a Database

1. Navigate to the "Verify Database" section
2. Enter the database name you want to verify
3. Click "Verify Database"
4. View the verification result

### Migrating Data

1. Navigate to the "Migration Hub" section
2. Select a source database from the dropdown
3. Select a target database from the dropdown
4. Click the execute button (arrow icon)
5. Monitor the migration progress

## 🔒 Security Notes

- All database credentials are handled server-side only
- Never expose database credentials in frontend code
- Activity logs are stored in `backend/src/logs/activity.log`
- Sensitive information is redacted from logs

## 🐛 Troubleshooting

### Database Connection Issues

- Ensure PostgreSQL is running
- Verify your database credentials in `.env`
- Check that the PostgreSQL user has `CREATEDB` privilege

### Migration Failures

- Ensure both source and target databases exist
- Verify the target database is empty or has matching schema
- Check PostgreSQL client tools (`pg_dump`, `psql`) are in PATH

### Port Conflicts

- Change `PORT` in `backend/.env` if port 5000 is in use
- Update `VITE_API_URL` in `frontend/.env` to match backend port

## 📝 License

ISC License

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions, please open an issue on the repository.

---

**Built with ❤️ using React, Express, and PostgreSQL**
