import { Restaurant } from './restaurant.entity';
import { CoreEntity } from './../../common/entities/core.entity';
import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsOptional, IsString, Length } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@InputType({ isAbstract: true})
@ObjectType()
@Entity()
export class Category extends CoreEntity {    
    @Field(type => String)
    @Column()
    @IsString()
    @Length(5)
    name: string;

    @Field(type => String)
    @Column()
    @IsString()
    coverImg: string;   

    @Field(type => [
        Restaurant
    ])
    @OneToMany(type => Restaurant, restaurant => restaurant.category)
    restaurants: Restaurant[];
}