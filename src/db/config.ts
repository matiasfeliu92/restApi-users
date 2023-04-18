import { Connection, createConnection, getConnectionManager } from "typeorm";
import dotenv from 'dotenv'
import { User } from "../models/users.models";
dotenv.config()

let AppConnection: Connection;

export const connectToDatabase = async (): Promise<Connection> => {
  const connectionManager = getConnectionManager();
  if (connectionManager.has('default')) {
    AppConnection = connectionManager.get('default');
  } else {
    AppConnection = await createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [User],
      logging: true,
      synchronize: true,
    });
  }
  return AppConnection;
};
