import { AppDataSource } from "../../config/db";
import { TaskModel } from "../../models";
import { userModel } from "../../models/user/UserMode";
import { SessionService } from "../services/Session/SessionService";
import { TaskService } from "../services/tasks/TaskService";
import { UserService } from "../services/user/UserService";



export const UserServiceInstance = new UserService(
   AppDataSource.getRepository(userModel)
);

export const SessionServiceInstance = new SessionService(
   AppDataSource.getRepository(userModel)
)

export const TaskServiceInstance = new TaskService(
   AppDataSource.getRepository(TaskModel)
)