import { Entity, PrimaryGeneratedColumn, Unique, Column } from "typeorm";


@Entity('users')
@Unique(['email'])
export class userModel {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column()
   name: string
   @Column()
   email: string

   @Column()
   password: string

}