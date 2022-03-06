import { CoreEntity } from './../../common/entities/core.entity';
import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import { User } from 'src/users/entities/user.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';

@InputType('PaymentInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Payment extends CoreEntity {
    @Field(type => Int)
    @Column()
    transactionId: number;

    @Field(type => User)
    @ManyToOne(
        type => User,
        user => user.payments,
    )
    user: User;

    @Field(type => Restaurant)
    @ManyToOne(type => Restaurant)
    restaurant: Restaurant;

    @RelationId((payment: Payment) => payment.user)
    userId: number;

    @RelationId((payment: Payment) => payment.restaurant)
    restaurantId: number;
}