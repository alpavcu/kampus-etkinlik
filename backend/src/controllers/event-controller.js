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

export const createEvent = (req, res) => {
  const { title, category, date, capacity, time, location, description } = req.body ?? {};

  if (!title || !category || !date) {
    return res.status(400).json({
      error: {
        message: 'title, category and date are required'
      }
    });
  }

  let newId = `event-${Date.now()}`;
  while (events.some((e) => e.id === newId)) {
    newId = `event-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }

  const newEvent = {
    id: newId,
    title,
    category,
    capacity: Number(capacity) || 0,
    date,
    time: time ?? '',
    location: location ?? '',
    description: description ?? ''
  };

  events.push(newEvent);
  return res.status(201).json(newEvent);
};
