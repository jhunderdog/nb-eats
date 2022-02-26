import { PaginationInput, PaginationOutput } from './../../common/dtos/pagination.dto';
import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Restaurant } from '../entities/restaurant.entity';

@InputType()
export class RestaurantsInput extends PaginationInput {}

@ObjectType()
export class RestaurantsOutput extends PaginationOutput {
    @Field(type => [Restaurant], {nullable: true})
    results?: Restaurant[];
}