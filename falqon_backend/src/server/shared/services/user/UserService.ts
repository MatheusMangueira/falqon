import { Repository } from "typeorm";
import { userModel } from "../../../models/user/UserMode";
import { UserDTO } from "../../../DTOs";
import { hash } from 'bcryptjs';


export class UserService {

   constructor(private repository: Repository<userModel>) { }


   async create(data: UserDTO) {

      try {

         const passwordHash = await hash(data.password, 8);

         const user = this.repository.create({
            ...data,
            password: passwordHash
         });

         const createUser = await this.repository.save(user);

         return createUser;

      } catch (err) {
         throw new Error('Error creating user!');
      }
   }


   async getAll(page: number = 1, limit: number = 10) {
      try {
         const skip = (page - 1) * limit;

         const users = await this.repository.find({
            skip,
            take: limit
         });

         return users;
      } catch (err) {
         throw new Error('Error getting all users!');
      }

   }

   //mudar os nomes
   async delete(id: string) {
      try {
         //mudar o repository
         const user = await this.repository.findOne({
            where: { id }
         });

         if (!user) {
            throw new Error('user not found!');
         }

         await this.repository.delete(user);

         return { message: 'user deleted!' };

      } catch (err) {
         throw new Error('Error deleting user!');
      }

   }

}