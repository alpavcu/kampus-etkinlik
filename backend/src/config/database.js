import mongoose from 'mongoose';

export async function connectDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI tanımlı değil');

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 4000 });
  } catch (err) {
    if (uri.startsWith('mongodb+srv://')) {
      console.warn(`Atlas bağlantısı sağlanamadı (${err.message.substring(0, 80)}...). Yerel MongoDB'ye bağlanılıyor...`);
      await mongoose.connect('mongodb://127.0.0.1:27017/kampus');
    } else {
      throw err;
    }
  }

  const { host, name } = mongoose.connection;
  const yer = host.includes('mongodb.net') ? 'Atlas' : 'yerel';
  console.log(`MongoDB bağlandı (${yer}): ${host}/${name}`);
}
