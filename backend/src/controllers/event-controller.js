import mongoose from 'mongoose';
import { Event } from '../models/event-model.js';
import { todayStart } from '../utils/date.js';

const KORUNAN_ALANLAR = ['_id', 'createdAt', 'updatedAt', '__v'];

function notFound(res) {
  return res.status(404).json({
    error: {
      message: 'Event not found'
    }
  });
}

export async function getEvents(req, res, next) {
  try {
    const { category, search } = req.query;
    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (search) {
      const guvenli = String(search).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      filter.title = {
        $regex: guvenli,
        $options: 'i'
      };
    }

    const events = await Event.find(filter).sort({ date: 1 });
    return res.json(events);
  } catch (err) {
    return next(err);
  }
}

export async function getUpcomingEvents(req, res, next) {
  try {
    const events = await Event.find({
      date: { $gte: todayStart() }
    }).sort({
      date: 1,
      time: 1
    });

    return res.json(events);
  } catch (err) {
    return next(err);
  }
}

export async function getEventById(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return notFound(res);
    }

    const event = await Event.findById(id);
    if (!event) {
      return notFound(res);
    }

    return res.json(event);
  } catch (err) {
    return next(err);
  }
}

export async function createEvent(req, res, next) {
  try {
    const event = await Event.create(req.body ?? {});
    return res.status(201).json(event);
  } catch (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      return res.status(400).json({
        error: {
          message: err.message
        }
      });
    }
    return next(err);
  }
}

export async function updateEvent(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return notFound(res);
    }

    const body = req.body ?? {};

    if (Object.keys(body).length === 0) {
      return res.status(400).json({
        error: {
          message: 'Body is empty'
        }
      });
    }

    const korunan = Object.keys(body).filter((k) =>
      KORUNAN_ALANLAR.includes(k)
    );

    if (korunan.length > 0) {
      return res.status(400).json({
        error: {
          message: `${korunan.join(', ')} cannot be changed`
        }
      });
    }

    const event = await Event.findByIdAndUpdate(id, body, {
      returnDocument: 'after',
      runValidators: true
    });

    if (!event) {
      return notFound(res);
    }

    return res.json(event);
  } catch (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      return res.status(400).json({
        error: {
          message: err.message
        }
      });
    }
    return next(err);
  }
}

export async function deleteEvent(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return notFound(res);
    }

    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return notFound(res);
    }

    return res.status(204).end();
  } catch (err) {
    return next(err);
  }
}
