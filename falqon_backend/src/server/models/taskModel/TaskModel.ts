import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import { v4 as uuid } from 'uuid';


@Entity('tasks')
@Unique(['name'])
export class TaskModel {

   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column()
   name: string;
   
   @Column()
   description: string;


}