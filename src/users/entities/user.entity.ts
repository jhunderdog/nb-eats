import { Restaurant } from './../../restaurants/entities/restaurant.entity';
import { IsBoolean } from 'class-validator';
import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { CoreEntity } from './../../common/entities/core.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from "typeorm";
import * as bcrypt from "bcrypt";
import { InternalServerErrorException } from '@nestjs/common';
import { IsEmail, IsEnum, IsString } from 'class-validator';

// type UserRole = "client" | "owner" | "delivery"
export enum UserRole {
    Client = "Client",
    Owner = "Owner",
    Delivery = "Delivery",
}

registerEnumType(UserRole, {name: "UserRole"})

@InputType("UserInputType", { isAbstract: true})
@ObjectType()
@Entity()
export class User extends CoreEntity {

    @Column({ unique: true })
    @Field(type=>String)
    @IsEmail()
    email: string;

    
    @Column({select: false})
    @Field(type=>String)
    @IsString()
    password: string;

    @Column({
        type: 'enum', enum: UserRole
    })
    @Field(type=> UserRole)
    @IsEnum(UserRole)
    role: UserRole;

    @Column({ default: false })
    @Field(type => Boolean)
    @IsBoolean()
    verified: boolean;

    @Field(type => [Restaurant])
    @OneToMany(
        type => Restaurant,
        restaurant => restaurant.owner,
    )
    restaurants: Restaurant[];

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(): Promise<void>{
        if(this.password){
            try {
                this.password = await bcrypt.hash(this.password, 10);
            } catch(e){
                console.log(e);
                throw new InternalServerErrorException();
            }
        }
        
    }

    async checkPassword(aPassword:string): Promise<boolean> {
        try {
            const ok = await bcrypt.compare(aPassword, this.password);
            return ok;
        } catch(e){
            console.log(e);
            throw new InternalServerErrorException();
        }
    }
}