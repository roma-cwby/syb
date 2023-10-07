import { app } from 'app';
import mongoose from 'mongoose';
mongoose.set('strictQuery', true);

const { DB_HOST, PORT } = process.env;

mongoose
  .connect(String(DB_HOST))
  .then(() => {
    app.listen(PORT || 3001);
    console.log(`Connect on port: ${PORT}`);
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
