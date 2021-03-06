import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Entity('Usuario')
export class UserEntity{
    @PrimaryGeneratedColumn() id: number;

    @Column('text') username: string;

    @Column('text') password: string;

    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password, 10);
    }

    async toResponseObject(showToken: boolean = true){
        const {id, username, token} = await this;
        const responseObject = await {id, username, token}
        if(showToken){
            responseObject.token = token;
        }
        return await responseObject;
    }

    async comparePassword(attempt: string){
        return await bcrypt.compare(attempt, this.password);
    }

    public get token(){
        const {id, username} = this;
        return jwt.sign({
            id, username
        }, process.env.SECRET, {expiresIn: '7d'})
    }
}