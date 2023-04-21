import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './auth-credentials.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ){}

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}>{
        const {username, password} = authCredentialsDto;
        const user = await this.userRepository.findOne({ where: { username } });
        if(user && (await bcrypt.compare(password, (await user).password))){
            //create token
            const payload = {username};
            const accessToken = await this.jwtService.sign(payload);

            return{accessToken};
        } else{
            throw new UnauthorizedException('Login failed');
        }
        
    }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>{
        return this.userRepository.createUser(authCredentialsDto);
    }
}
