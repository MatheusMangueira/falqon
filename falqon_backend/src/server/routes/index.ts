import { Router } from 'express';
import { UserController } from '../controllers/userController/UserController';
import { SessionController } from '../controllers/sessionController/SessionController';
import { TaskController } from '../controllers/tasksController/TaskController';
import { authenticated } from '../shared/middleware/authenticated';


export class AllRouter {
   private router: Router;

   constructor() {
      this.router = Router();
      this.setupRoutes();
   }

   private user() {
      this.router.post('/user', UserController.create)
   }

   private session() {
      this.router.post('/login', SessionController.handle);
   }

   private task() {
      this.router.post('/task', authenticated(), TaskController.create);
      this.router.get('/task', authenticated(), TaskController.getAll);
      this.router.get('/task/:id', authenticated(), TaskController.getById);
      this.router.delete('/task/:id', authenticated(), TaskController.delete);
      this.router.put('/task/:id', authenticated(), TaskController.update);

   }

   private setupRoutes() {
      this.user();
      this.session();
      this.task();
   }

   public getRouter() {
      return this.router;
   }
}