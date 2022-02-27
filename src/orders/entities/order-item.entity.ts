import { CoreEntity } from './../../common/entities/core.entity';
import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Dish, DishOption } from 'src/restaurants/entities/dish.entity';

@InputType('OrderItemInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class OrderItem extends CoreEntity {

    @ManyToOne(type => Dish, {nullable: true, onDelete: 'CASCADE'})
    dish: Dish;
    @Field(type => [DishOption], { nullable: true })
    @Column({type: "json", nullable: true})
    options?: DishOption[]
}