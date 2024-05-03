import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { Repository } from "typeorm";
import { userModel } from '../../../models/user/UserMode';

type UserRequest = {
   email: string;
   password: string;
};

export class SessionService {
   constructor(
      private userRepository: Repository<userModel>,
   ) { }

   async execute({ email, password }: UserRequest) {


      const user = await this.userRepository.findOne({ where: { email } });


      if (user) {
         const passwordMatch = await compare(password, user.password);

         if (!passwordMatch) {
            throw new Error('Combinação de email/senha incorreta');
         }


         const token = sign({}, process.env.SECRET_JWT as string, {
            subject: user.id
         });

         return { token };
      } else {
         throw new Error('Usuário não encontrado');
      }
   }
}
