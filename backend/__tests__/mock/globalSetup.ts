import { MongoMemoryServer } from 'mongodb-memory-server';
import assert from 'node:assert';
import mongoose from 'mongoose';
import { parse } from 'graphql';
import config from './config';
import executor from './executor';
import { UserModel } from '../../src/database/models/user';

export default async function globalSetup() {
  if (config.Memory) {
    const instance = await MongoMemoryServer.create();
    const uri = instance.getUri();
    (global as any).__MONGOINSTANCE = instance;
    process.env.MONGO_URI = uri.slice(0, uri.lastIndexOf('/'));
  } else {
    process.env.MONGO_URI = `mongodb://${config.IP}:${config.Port}`;
  }

  // The following is to make sure the database is clean before an test starts
  await mongoose.connect(`${process.env.MONGO_URI}/${config.Database}`);
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
};
