import { CoreOutput } from 'src/common/dtos/output.dto';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { Field, ObjectType, PickType } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
@InputType()
export class MyRestaurantInput extends PickType(Restaurant, ['id']){}

@ObjectType()
export class MyRestaurantOutput extends CoreOutput {
    @Field(type=> Restaurant, { nullable: true})
    restaurant?: Restaurant;
}