import { Request, Response } from 'express';
import { TaskDTO } from '../../DTOs';
import { TaskServiceInstance } from '../../shared/factory';
import { StatusCodes } from 'http-status-codes';
import { Pagination } from '../../types';


export class TaskController {

   static async create(req: Request<{}, {}, TaskDTO>, res: Response) {
      try {
         const createTask = await TaskServiceInstance.create(req.body);

         return res
            .status(StatusCodes.CREATED)
            .json(createTask);
      } catch (error) {
         return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: 'Internal Server Error' });
      }
   }

   static async getAll(req: Request<{}, {}, {}, Pagination>, res: Response) {
      try {
         const page = parseInt(req.query.page) || 1;
         const limit = parseInt(req.query.limit) || 10;

         const task = await TaskServiceInstance.getAll(page, limit);

         return res
            .status(StatusCodes.OK)
            .json(task);


      } catch (err) {
         return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: 'Internal Server Error' });
      }
   }

   static async delete(req: Request, res: Response) {
      try {
         const { id } = req.params;

         const task = await TaskServiceInstance.delete(id);

         return res
            .status(StatusCodes.OK)
            .json(task);

      } catch (err) {
         return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: 'Internal Server Error' });
      }
   }

   static async getById(req: Request, res: Response) {
      try {
         const { id } = req.params;

         const task = await TaskServiceInstance.getById(id);

         return res
            .status(StatusCodes.OK)
            .json(task);

      } catch (err) {
         return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: 'Internal Server Error' });
      }
   }

   static async update(req: Request, res: Response) {
      try {
         const { id } = req.params;

         const updateTask = await TaskServiceInstance.update(id, req.body);

         return res
            .status(StatusCodes.OK)
            .json(updateTask);

      } catch (err) {
         return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: 'Internal Server Error' });
      }
   }

}