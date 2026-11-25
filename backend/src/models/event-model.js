import mongoose from 'mongoose';
import { formatDate, parseDate } from '../utils/date.js';

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Etkinlik başlığı zorunludur'],
      trim: true,
      minlength: [3, 'Başlık en az 3 karakter olmalıdır'],
      maxlength: [100, 'Başlık en fazla 100 karakter olabilir']
    },
    category: {
      type: String,
      required: [true, 'Kategori zorunludur'],
      enum: {
        values: ['Seminer', 'Atölye', 'Söyleşi', 'Yarışma'],
        message: '{VALUE} geçerli bir kategori değil'
      }
    },
    capacity: {
      type: Number,
      min: [0, 'Kontenjan negatif olamaz'],
      default: 0
    },
    date: {
      type: Date,
      required: [true, 'Tarih zorunludur'],
      set: parseDate,
      get: formatDate
    },
    time: {
      type: String,
      default: ''
    },
    location: {
      type: String,
      trim: true,
      default: ''
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Açıklama en fazla 500 karakter olabilir'],
      default: ''
    }
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
    id: false
  }
);

export const Event = mongoose.model('Event', eventSchema);
