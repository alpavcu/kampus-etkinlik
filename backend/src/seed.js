import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDatabase } from './config/database.js';
import { Event } from './models/event-model.js';
import { seedEvents } from './data/seed-events.js';

async function runSeed() {
  try {
    await connectDatabase();
    await Event.deleteMany({});
    const created = await Event.insertMany(seedEvents);
    console.log(`Seed tamamlandı: ${created.length} etkinlik eklendi`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Seed hatası:', err.message);
    process.exit(1);
  }
}

runSeed();
