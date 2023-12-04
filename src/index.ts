import { createServer } from 'http';
import { app } from './app.js';
import { dbConnect } from './services/db.connect.js';
import createDebug from 'debug';

const debug = createDebug('AB:index');

const PORT = process.env.PORT ?? 3030;

dbConnect()
  .then((mongoose) => {
    server.listen(PORT);
    debug('Connected to DB', mongoose.connection.db.databaseName);
  })
  .catch((error) => {
    server.emit(error);
  });

const server = createServer(app);
debug('Starting server');

server.on('listening', () => {
  console.log('Listening from port ' + PORT);
});
