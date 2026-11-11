import express from 'express';
import cors from 'cors';
import eventRoutes from './routes/event-routes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    time: new Date().toISOString(),
    student: '21210327744'
  });
});

// Event routes
app.use('/events', eventRoutes);

// Catch-all 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: {
      message: 'Route not found'
    }
  });
});

export default app;
