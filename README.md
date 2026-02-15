# Full Stack Projects

A collection of modern, full-stack web applications built with React, Express, and PostgreSQL. These projects demonstrate best practices in web development, database management, and user interface design.

![React](https://img.shields.io/badge/React-19.2-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-blue)

## 📦 Projects Overview

This repository contains two comprehensive full-stack applications:

### 1. 🗄️ Database Management System
**Location:** `database-management/`

A powerful PostgreSQL database management interface that simplifies database operations without requiring command-line access. Perfect for developers and database administrators who need a visual way to manage PostgreSQL databases.

**Key Features:**
- Create and manage PostgreSQL databases
- Verify database existence
- Migrate data between databases
- Clean, intuitive web interface
- Real-time status updates

**Tech Stack:**
- Frontend: React 19.2, Vite, TailwindCSS 4, Lucide React
- Backend: Node.js, Express 5, PostgreSQL
- Port: Backend runs on `5000`, Frontend on `5173`

**Quick Start:**
```bash
cd database-management/backend
npm install
npm run dev

# In another terminal
cd database-management/frontend
npm install
npm run dev
```

**Documentation:** See [database-management/README.md](./database-management/README.md) for detailed documentation.

---

### 2. 👥 Candidate Management System
**Location:** `candidate-management/`

A complete recruitment management solution for organizations to efficiently manage candidate information throughout the hiring process. Features comprehensive CRUD operations, advanced search, and filtering capabilities.

**Key Features:**
- Complete CRUD operations for candidate records
- Advanced search and filtering (by name, email, skills, status, position)
- Form validation and error handling
- Responsive, modern UI with smooth animations
- Secure data management with SQL injection protection

**Tech Stack:**
- Frontend: React 19.2, Vite, TailwindCSS 4, Lucide React, Axios
- Backend: Node.js, Express 5, PostgreSQL
- Port: Backend runs on `5001`, Frontend on `5173`

**Quick Start:**
```bash
cd candidate-management/backend
npm install
# Create .env file with your DATABASE_URL
npm run dev

# In another terminal
cd candidate-management/frontend
npm install
npm run dev
```

**Documentation:** See [candidate-management/README.md](./candidate-management/README.md) for detailed documentation.

---

## 🛠️ Common Tech Stack

Both projects share a similar architecture and technology stack:

### Frontend Technologies
- **React 19.2** - Modern UI library with hooks and functional components
- **Vite** - Fast build tool and development server
- **TailwindCSS 4** - Utility-first CSS framework for rapid UI development
- **Lucide React** - Beautiful, consistent icon library
- **Axios** - Promise-based HTTP client for API communication

### Backend Technologies
- **Node.js** - JavaScript runtime environment
- **Express 5** - Fast, unopinionated web framework
- **PostgreSQL** - Powerful, open-source relational database
- **Helmet** - Security middleware for Express
- **CORS** - Cross-origin resource sharing middleware
- **dotenv** - Environment variable management

### Development Tools
- **ESLint** - Code linting and quality assurance
- **Nodemon** - Automatic server restart during development
- **Git** - Version control

---

## 📋 Prerequisites

Before running any project, ensure you have:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **PostgreSQL** (v12 or higher) - [Download](https://www.postgresql.org/download/)
- **npm** (comes with Node.js) or **yarn**
- **Git** (optional, for version control)

---

## 🚀 Getting Started

### Installation Steps

1. **Clone or navigate to the repository**
   ```bash
   cd "c:\Projects\React js\Media NV"
   ```

2. **Choose a project to run**
   - For Database Management: `cd database-management`
   - For Candidate Management: `cd candidate-management`

3. **Install dependencies**
   ```bash
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd ../frontend
   npm install
   ```

4. **Configure environment variables**
   - Copy `.env.example` to `.env` in both backend and frontend directories
   - Update with your actual database credentials and configuration

5. **Start the servers**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

6. **Access the application**
   - Open your browser and navigate to the frontend URL (typically `http://localhost:5173`)

---

## 📁 Project Structure

```
Media NV/
├── database-management/          # Database Management System
│   ├── backend/                  # Express API server
│   │   ├── src/
│   │   │   ├── config/           # Database configuration
│   │   │   ├── controllers/     # Route handlers
│   │   │   ├── middleware/      # Express middleware
│   │   │   ├── routes/          # API routes
│   │   │   └── utils/            # Utility functions
│   │   └── package.json
│   ├── frontend/                 # React application
│   │   ├── src/
│   │   │   ├── components/      # React components
│   │   │   ├── services/        # API services
│   │   │   └── App.jsx          # Main component
│   │   └── package.json
│   └── README.md
│
├── candidate-management/         # Candidate Management System
│   ├── backend/                  # Express API server
│   │   ├── src/
│   │   │   ├── config/           # Database configuration
│   │   │   ├── controllers/     # CRUD handlers
│   │   │   ├── middleware/      # Error handling
│   │   │   ├── routes/          # API routes
│   │   │   └── utils/           # Database initialization
│   │   └── package.json
│   ├── frontend/                 # React application
│   │   ├── src/
│   │   │   ├── components/      # UI components
│   │   │   ├── services/        # API client
│   │   │   └── App.jsx          # Main component
│   │   └── package.json
│   └── README.md
│
└── README.md                     # This file
```

---

## 🔌 API Endpoints Summary

### Database Management API (Port 5000)
- `GET /api/databases` - List all databases
- `POST /api/databases` - Create a new database
- `POST /api/databases/verify` - Verify database existence
- `POST /api/databases/migrate` - Migrate data between databases

### Candidate Management API (Port 5001)
- `GET /api/candidates` - Get all candidates (with search/filter support)
- `GET /api/candidates/:id` - Get specific candidate
- `POST /api/candidates` - Create new candidate
- `PUT /api/candidates/:id` - Update candidate
- `DELETE /api/candidates/:id` - Delete candidate

---

## 🎨 Design Philosophy

Both projects follow consistent design principles:

- **Modern UI/UX**: Clean, intuitive interfaces with gradient designs and smooth animations
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Accessibility**: Proper ARIA labels, keyboard navigation, and semantic HTML
- **User Feedback**: Clear error messages, loading states, and success notifications
- **Code Quality**: DRY principles, proper error handling, and maintainable code structure

---

## 🔒 Security Features

Both projects implement security best practices:

- **Input Validation**: Frontend and backend validation
- **SQL Injection Prevention**: Parameterized queries
- **Security Headers**: Helmet.js middleware
- **CORS Configuration**: Proper cross-origin resource sharing
- **Error Handling**: Meaningful error messages without exposing sensitive information
- **Environment Variables**: Secure credential management

---

## 🐛 Troubleshooting

### Common Issues

**Database Connection Errors:**
- Ensure PostgreSQL is running
- Verify credentials in `.env` file
- Check that the database exists (for candidate-management)
- Verify connection string format: `postgresql://user:password@host:port/database`

**Port Conflicts:**
- Database Management backend uses port `5000`
- Candidate Management backend uses port `5001`
- Frontends use port `5173` (Vite will auto-increment if busy)
- Change ports in `.env` files if needed

**Module Not Found Errors:**
- Run `npm install` in both backend and frontend directories
- Delete `node_modules` and `package-lock.json`, then reinstall if issues persist

**Environment Variable Issues:**
- Ensure `.env` files exist (copy from `.env.example`)
- Check that placeholder values are replaced with actual credentials
- Verify file is in the correct directory (backend or frontend)

---

## 📚 Learning Resources

These projects demonstrate:

- **Full-Stack Development**: Complete frontend and backend integration
- **RESTful API Design**: Proper HTTP methods and status codes
- **Database Management**: PostgreSQL schema design and migrations
- **React Patterns**: Component composition, hooks, and state management
- **Modern JavaScript**: ES6+ features, async/await, modules
- **UI/UX Design**: Responsive layouts, accessibility, user feedback
- **Error Handling**: Comprehensive error management strategies
- **Security Best Practices**: Input validation, SQL injection prevention

---

## 🤝 Contributing

When working with these projects:

1. Follow the existing code style and patterns
2. Use meaningful commit messages
3. Test your changes thoroughly
4. Update documentation if needed
5. Ensure environment variables are properly configured

---

## 📝 License

ISC License - Feel free to use these projects for learning and development purposes.

---

## 📞 Support

For issues or questions:

1. Check the individual project README files for specific documentation
2. Review the troubleshooting section above
3. Verify your environment setup matches the prerequisites
4. Check that all dependencies are installed correctly

---

## 🎯 Project Goals

These projects serve as:

- **Learning Resources**: Examples of modern full-stack development
- **Template Projects**: Starting points for similar applications
- **Portfolio Pieces**: Demonstrations of technical skills
- **Best Practices**: Examples of clean, maintainable code

---

**Happy Coding! 🚀**
