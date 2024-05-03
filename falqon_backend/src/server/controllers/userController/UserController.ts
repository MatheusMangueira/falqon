import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Pagination } from '../../types';
import { UserDTO } from '../../DTOs';
import { UserServiceInstance } from '../../shared/factory';



export class UserController {


   static async create(req: Request<{}, {}, UserDTO>, res: Response) {


      try {

         const createUser = await UserServiceInstance.create(req.body);


         return res
            .status(StatusCodes.CREATED)
            .json(createUser);

      } catch (err) {
         return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: 'Internal Server Error' });
      }
   }

   static async getAll(req: Request<{}, {}, {}, Pagination>, res: Response) {
      try {
         const page = parseInt(req.query.page) || 1;
         const limit = parseInt(req.query.limit) || 10;


         const user = await UserServiceInstance.getAll(page, limit);

         return res
            .status(StatusCodes.OK)
            .json(user);

      } catch (err) {
         return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: 'Internal Server Error' });
      }
   }

}