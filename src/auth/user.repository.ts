import { ConflictException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredientailsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt'
@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async signUp(AuthCredientailsDto: AuthCredientailsDto): Promise<void> {
        const { username, password } = AuthCredientailsDto
        const user = new User()
        const salt = await bcrypt.genSalt()
        user.username = username
        user.salt = salt
        user.password = await bcrypt.hash(password, salt)
        try {
            await user.save()
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Username already exists')
            }
        }
    }

    async validateUser(AuthCredientailsDto: AuthCredientailsDto): Promise<string> {
        const { username, password } = AuthCredientailsDto
        const user = await this.findOne({ username })
        if (user && await user.validatePassword(password)) {
            return user.username
        } else {
            return null
        }
    }
    
}