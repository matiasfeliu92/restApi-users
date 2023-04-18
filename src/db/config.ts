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
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DB_USER,
      password: '',
      database: process.env.DB_NAME,
      entities: [User],
      logging: true,
      synchronize: true,
    });
  }
  return AppConnection;
};
