import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';
import initDatabase from './utils/initDb.js';
import candidateRoutes from './routes/candidateRoutes.js';
import errorHandler from './middleware/errorMiddleware.js';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.json({ success: true, message: 'Server is running' });
});

app.use('/api/candidates', candidateRoutes);

app.use(errorHandler);

const startServer = async () => {
  try {
    await initDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
