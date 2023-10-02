import { App } from './infra/App';
import mongoose from "mongoose";
mongoose.set('strictQuery', true);

const { DB_HOST } = process.env;

mongoose
  .connect(String(DB_HOST))
  .then(() => {
    new App().init();
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });