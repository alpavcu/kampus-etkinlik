import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

// Catch-all 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: {
      message: 'Route not found'
    }
  });
});

export default app;
