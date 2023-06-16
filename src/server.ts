import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { Server } from 'http';

process.on('uncaughtException', error => {
  console.log(error);
  process.exit(1);
});

let server: Server;

async function main() {
  try {
    //await mongoose.connect('mongodb://127.0.0.1:27017/university-management'); // Use Locally
    await mongoose.connect(config.database_url as string);
    console.log('Connect Database🛢️ Successfully');

    server = app.listen(config.port, () => {
      console.log(`Application listening on port ${config.port}`);
    });
  } catch (err) {
    console.log('Failed To Connect Database🛢️');
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
main();

process.on('SIGTERM', () => {
  console.log('SIGTERM is received');
  if (server) {
    server.close();
  }
});
