import { CoreOutput } from './../../common/dtos/output.dto';
import { Field, InputType, Int, ObjectType, PickType } from "@nestjs/graphql";
import { number } from 'joi';
import { Order } from '../entities/order.entity';

@InputType()

export class CreateOrderInput extends PickType(Order, ['dishes']){
    @Field(type => Int)
    restaurantId: number;
}
    

@ObjectType()
export class CreateOrderOutput extends CoreOutput {}