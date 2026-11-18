import mongoose from 'mongoose';
import { Event } from '../models/event-model.js';

export const getEvents = async (req, res, next) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const events = await Event.find(filter).sort({ date: 1 });
    return res.status(200).json(events);
  } catch (err) {
    next(err);
  }
};

export const getEventById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(404).json({
        error: {
          message: 'Event not found'
        }
      });
    }
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({
        error: {
          message: 'Event not found'
        }
      });
    }
    return res.status(200).json(event);
  } catch (err) {
    next(err);
  }
};

export const createEvent = async (req, res, next) => {
  try {
    const event = await Event.create(req.body ?? {});
    return res.status(201).json(event);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        error: {
          message: err.message
        }
      });
    }
    next(err);
  }
};
