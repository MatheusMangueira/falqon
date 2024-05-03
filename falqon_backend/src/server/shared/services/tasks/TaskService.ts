import { Repository } from "typeorm";
import { TaskDTO } from "../../../DTOs";
import { TaskModel } from "../../../models";


export class TaskService {
   constructor(private repository: Repository<TaskModel>) { }

   async create(data: TaskDTO) {

      try {

         const task = this.repository.create({
            ...data
         });

         const createTask = await this.repository.save(task);

         return createTask;

      } catch (err) {
         throw new Error('Error creating task!');
      }
   }
   async getAll(page: number = 1, limit: number = 10) {
      try {
         const skip = (page - 1) * limit;

         const tasks = await this.repository.find({
            skip,
            take: limit
         });

         return tasks;
      } catch (err) {
         throw new Error('Error getting all tasks!');
      }
   }

   async delete(id: string) {
      try {
         const task = await this.repository.findOne({
            where: { id }
         });

         if (!task) {
            throw new Error('Task not found!');
         }

         await this.repository.delete(task);

         return { message: 'task deleted!' };

      } catch (err) {
         throw new Error('Error deleting task!');
      }
   }

   async update(id: string, data: TaskDTO) {
      try {
         const task = await this.repository.findOne({
            where: { id }
         });

         if (!task) {
            throw new Error('Task not found!');
         }

         await this.repository.update(task, data);

         return { message: 'task updated!' };

      } catch (err) {
         throw new Error('Error updating task!');
      }
   }

   async getById(id: string) {
      try {
         const task = await this.repository.findOne({
            where: { id }
         });

         if (!task) {
            throw new Error('Task not found!');
         }

         return task;

      } catch (err) {
         throw new Error('Error getting task!');
      }
   }


}