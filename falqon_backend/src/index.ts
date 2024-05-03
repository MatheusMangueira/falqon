import { App } from './server/Server';
import { AppDataSource } from './server/config/db';


AppDataSource
   .initialize()
   .then(() => {
      console.log('Data Source has been initialized!');
   })
   .catch((err) => {
      console.error('Error during Data Source initialization:', err);
   });


App.listen(process.env.PORT || 8080);