import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors';
import { buildApp } from './app';
import { connect } from './database'
dotenv.config()

const app = express();

connect();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const endpoint = buildApp(app);

const { PORT = 3000, HOST = "localhost" } = process.env;

app.listen(Number(PORT), HOST, () => {
  console.log(`GraphQL API located at http://${HOST}:${PORT}${endpoint}`);
});
