import { events } from '../data/events.js';

export const getEvents = (req, res) => {
  const { category } = req.query;
  if (category) {
    const filtered = events.filter((e) => e.category === category);
    return res.status(200).json(filtered);
  }
  return res.status(200).json(events);
};

export const getEventById = (req, res) => {
  const { id } = req.params;
  const event = events.find((e) => e.id === id);
  if (!event) {
    return res.status(404).json({
      error: {
        message: 'Event not found'
      }
    });
  }
  return res.status(200).json(event);
};
